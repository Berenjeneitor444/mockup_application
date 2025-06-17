import { Component, OnInit } from '@angular/core';
import { Model } from 'survey-core';
import { majesticTheme, majesticCss } from 'src/theme/survey_theme';
import 'survey-core/i18n/spanish';
import surveyJson from './guestForm.json';
import { ActivatedRoute, Router } from '@angular/router';
import { Guest } from '@models/guest.model';
import { Booking } from '@models/booking.model';
import { BookingService } from '@services/booking/booking.service';
import { MatDialog } from '@angular/material/dialog';
import { TermsModalComponent } from './terms-modal/terms-modal.component';
import { ConfService } from '@services/conf/conf.service';
import { TranslateService } from '@ngx-translate/core';
import { BasePageComponent } from '@pages/base.page';
import * as Sentry from '@sentry/angular';
import { countries, postalCodeRegexes } from './data';
import {
  Observable,
  catchError,
  forkJoin,
  lastValueFrom,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import {
  arrayBufferToBase64,
  downloadPdf,
  extractBase64,
  getSignedPdf,
  mergePdfs,
} from '@helpers/pdf';
import { HttpClient } from '@angular/common/http';
import { EmailService } from '@services/email/email.service';
import { SimpleDialogComponent } from 'src/app/shared-components/simple-dialog/simple-dialog.component';
import { dateToContract } from '@helpers/date';
import { ConfirmDialogComponent } from 'src/app/shared-components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-booking-guest-form',
  templateUrl: './booking-guest-form.component.html',
  styleUrl: './booking-guest-form.component.scss',
})
export class BookingGuestFormComponent
  extends BasePageComponent
  implements OnInit
{
  booking: Booking | undefined = undefined;
  guest: Guest | undefined = undefined;
  survey: Model = new Model();
  language = 'es';
  loading = true;
  saving = false;
  completed = false;
  contractUrl = '';
  privacyUrl = '';
  texts: any = {
    contract: '',
    privacy: '',
    drugs: '',
  };
  today = new Date();
  dirty = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    public confService: ConfService,
    private translate: TranslateService,
    public dialog: MatDialog,
    private http: HttpClient,
    private emailService: EmailService
  ) {
    super();
    this.activatedRoute.data.subscribe((response: any) => {
      // subscribe to get booking updates
      this.subscriptions.push(
        this.bookingService.list$.subscribe(async () => {
          this.booking = await this.bookingService.getBookingById(response.bid);
          if (!this.booking) {
            this.back();
          }
          //Sentry.setContext('Booking', { booking: this.booking });
          this.guest = this.booking?.guests?.find(
            (guest: Guest) => guest.NumeroCliente === response.gid
          );
          if (!this.guest) {
            this.back();
          }
          //Sentry.setContext('Guest', { guest: this.guest });
          this.initForm();
          this.loadTexts();
        })
      );

      this.subscriptions.push(
        this.confService.language$.subscribe((language: string) => {
          this.survey.locale = language;
          this.translate.setDefaultLang(this.confService.language);
          this.fillCountryDropdown();
          this.fillRegionDropdown(this.survey.getValue('country'));
          this.loadTexts();
        })
      );
    });
  }

  /****************************************************************************
   * Initializaction
   ***************************************************************************/

  async ngOnInit() {
    this.translate.setDefaultLang(this.confService.language);
    Sentry.logger.debug(
      Sentry.logger
        .fmt`[${this.confService.hotel?.id}-${this.booking?.NumReserva}-${this.guest?.NumeroCliente}] Entró en el formulario en modo ${this.survey.mode}...`,
      {
        hotel: this.confService.hotel?.name,
        NumReserva: this.booking?.NumReserva,
        NumeroCliente: this.guest?.NumeroCliente,
        IDHuesped: this.guest?.IDHuesped,
        Nombre: this.guest?.displayName,
      }
    );
  }

  /**
   * Initialize survey JS form
   */
  async initForm(): Promise<void> {
    this.survey = new Model(surveyJson);
    this.survey.applyTheme(majesticTheme);
    this.survey.locale = this.confService.language;
    this.survey.css = {
      majesticCss,
      footer: 'flex flex-row justify-end gap-4 pt-8',
    };

    // read-only mode if guest has already completed the form
    if (this.guest?.completed) {
      this.survey.mode = 'display';
    }

    // fill country dropdown
    this.fillCountryDropdown();

    // fill form with guest data
    this.fillForm();

    this.survey.onAfterRenderPanel.add((_survey: any, options: any) => {
      // hide purposeOfStay question for non-holders
      if (options.panel.name === 'marketing') {
        if (!this.guest?.isHolder) {
          options.panel.visible = false;
        }
      }
      // hide legal panel in display mode
      if (options.panel.name === 'legal') {
        options.panel.visible = this.survey.mode !== 'display';
      }
    });

    this.survey.onPropertyChanged.add((sender, options) => {
      if (options.name !== 'mode') return;
      // get legal panel
      const legalPanel = this.survey.getPanelByName('legal');
      // hide legal panel in display mode
      legalPanel.visible = this.survey.mode !== 'display';
    });

    this.survey.onValidateQuestion.add((sender, options) => {
      // add postal code validation
      if (options.name === 'postalCode') {
        const code = options.value;
        const country = sender.getQuestionByName('country').value;

        const regex = postalCodeRegexes[country];
        // validate using regex
        if (!new RegExp(regex).test(code)) {
          // raise error but without modifying the error message
          const errorMessages: Record<string, string> = {
            es: 'Por favor, introduzca un código postal válido.',
            en: 'Please enter a valid postal code.',
          };
          options.error = errorMessages[this.confService.language];
        }
      }
    });

    this.survey.onValueChanged.add((sender, options) => {
      this.dirty = true;
      // open modal when contract or privacy policy checkboxes are clicked
      if (options.name === 'privacy') {
        this.openPrivacyDialog();
      } else if (options.name === 'contract') {
        this.openContractDialog();
      } else if (options.name === 'drugs') {
        this.openDrugsDialog();
      }
      // revalidate postal code when country is updated
      if (options.name === 'country') {
        const codigoPostalQuestion =
          this.survey.getQuestionByName('postalCode');
        codigoPostalQuestion.hasErrors(true);
      }
      // enable region dropdown only if country is CA or US
      if (options.name === 'country') {
        const regionQuestion = this.survey.getQuestionByName('region');
        if (regionQuestion && ['CA', 'US'].includes(options.value)) {
          regionQuestion.visible = true;
          this.fillRegionDropdown(options.value);
        } else {
          regionQuestion.visible = false;
        }
      }
    });

    // add action on complete
    this.survey.onComplete.add(async () => {
      await this.onSubmit();
    });

    this.loading = false;
  }

  /**
   * Populate country dropdown
   */
  fillCountryDropdown() {
    const countryQuestion = this.survey.getQuestionByName('country');
    if (countryQuestion) {
      countryQuestion['choices'] = countries[this.confService.language];
    }
  }

  /**
   * Populate region dropdown
   */
  fillRegionDropdown(country: string) {
    if (!country) return;
    const regionQuestion = this.survey.getQuestionByName('region');
    if (regionQuestion) {
      regionQuestion['choices'] = countries[this.confService.language].find(
        c => c.value === country
      )?.regions;
    }
  }

  /**
   * Fill form with guest data
   */
  fillForm() {
    this.survey.data = {
      email: this.guest?.DatosComunicacion.EMail,
      phone: this.guest?.DatosComunicacion.Telefono,
      postalCode: this.guest?.DatosComunicacion.CodigoPostal,
      region: this.guest?.DatosComunicacion.Provincia,
      country: this.guest?.DatosComunicacion.Pais,
      purposeOfStay: this.booking?.MotivoViaje,
      signature: this.guest?.Firma,
      hotelCountry: this.confService.hotel?.country.toUpperCase(),
    };
    const country = this.guest?.DatosComunicacion.Pais;
    const regionQuestion = this.survey.getQuestionByName('region');
    if (country && regionQuestion && ['CA', 'US'].includes(country)) {
      regionQuestion.visible = true;
      this.fillRegionDropdown(country);
    }
  }

  /**
   * Load contract and privacy policy texts from assets
   */
  loadTexts() {
    const texts = [
      {
        name: 'contract',
        url: `/assets/texts/contrato_${this.confService.hotel?.country}_${this.confService.language}.html`,
      },
      {
        name: 'privacy',
        url: `/assets/texts/privacidad_${this.confService.language}.html`,
      },
      {
        name: 'turismo',
        url: `/assets/texts/turismo_mx_${this.confService.language}.html`,
      },
    ];
    // load texts in parallel
    texts.map(text => {
      this.http.get(text.url, { responseType: 'text' }).subscribe(data => {
        this.texts[text.name] = data;
      });
    });
  }

  /****************************************************************************
   * SUBMIT FORM
   ***************************************************************************/
  public editGuestForm() {
    this.survey.mode = 'edit';
    this.survey.render();
    Sentry.logger.debug(
      Sentry.logger
        .fmt`[${this.confService.hotel?.id}-${this.booking?.NumReserva}-${this.guest?.NumeroCliente}] Cambió formulario a modo edición...`,
      {
        hotel: this.confService.hotel?.name,
        NumReserva: this.booking?.NumReserva,
        NumeroCliente: this.guest?.NumeroCliente,
        IDHuesped: this.guest?.IDHuesped,
        Nombre: this.guest?.displayName,
      }
    );
  }

  /**
   * Submit form. Actions in parallel:
   * - Update guest data
   * - Update booking with purpose of stay (holder only)
   * - Upload cardex
   * - Upload privacy policy
   * - Upload tourism form (Mexico only)
   * - Send email to guest with attachments
   * and then navigate to WIFI page.
   */
  async onSubmit() {
    if (!this.booking || !this.guest) return;
    this.saving = true;

    const parallelRequests = [];
    const attachments = [];

    // update guest data
    parallelRequests.push(this.updateGuest());

    // update booking with 'purpose of stay' (holder only)
    if (this.guest.isHolder) {
      parallelRequests.push(this.updateBooking());
    }

    // contract
    const contractPdf = await this.getSignedContract();
    if (contractPdf) {
      const contractUploadFilename = this.getFilename('cardex', 'upload');
      const contractBase64 = arrayBufferToBase64(contractPdf);
      parallelRequests.push(
        this.bookingService.uploadDocument(
          contractBase64,
          contractUploadFilename,
          'cardex',
          this.booking,
          this.guest
        )
      );
      const contractEmailFilename = this.getFilename('cardex', 'email');
      attachments.push({
        base64: contractBase64,
        filename: contractEmailFilename,
      });
    }

    // privacy policy
    const privacyPdf = await this.getSignedPrivacyPolicy();
    if (privacyPdf) {
      const privacyUploadFilename = this.getFilename('privacy', 'upload');
      const privacyBase64 = arrayBufferToBase64(privacyPdf);
      parallelRequests.push(
        this.bookingService.uploadDocument(
          privacyBase64,
          privacyUploadFilename,
          'privacy',
          this.booking,
          this.guest
        )
      );
      const privacyEmailFilename = this.getFilename('privacy', 'email');
      attachments.push({
        base64: privacyBase64,
        filename: privacyEmailFilename,
      });
    }

    // turismo (Mexico only)
    if (this.confService.hotel?.country === 'mx') {
      const turismoPdf = await this.getSignedTourism();
      if (turismoPdf) {
        const turismoUploadFilename = this.getFilename('turismo', 'upload');
        const turismoBase64 = arrayBufferToBase64(turismoPdf);
        parallelRequests.push(
          this.bookingService.uploadDocument(
            turismoBase64,
            turismoUploadFilename,
            'turismo',
            this.booking,
            this.guest
          )
        );
        const turismoEmailFilename = this.getFilename('turismo', 'email');
        attachments.push({
          base64: turismoBase64,
          filename: turismoEmailFilename,
        });
      }
    }

    // send email to guest
    parallelRequests.push(this.sendEmail(attachments));

    // resolve all tasks in parallel (saving, uploading and emailing)
    // add a timer to register the duration of the parallel requests
    const startTime = new Date().getTime();
    const response = await lastValueFrom(forkJoin(parallelRequests));
    const endTime = new Date().getTime();
    const duration = endTime - startTime;
    if (response.every((result: any) => result)) {
      console.log(
        '[guest-form] Guest and booking updated. Contract uploaded and sent!',
        response
      );
      try {
        Sentry.logger.info(
          Sentry.logger
            .fmt`[${this.confService.hotel?.id}-${this.booking.NumReserva}-${this.guest.NumeroCliente}] Huésped ${this.guest.displayName} completó el registro correctamente.`,
          {
            hotel: this.confService.hotel?.name,
            NumReserva: this.booking.NumReserva,
            NumeroCliente: this.guest.NumeroCliente,
            IDHuesped: this.guest.IDHuesped,
            Nombre: this.guest.displayName,
            Email: this.guest.DatosComunicacion.EMail,
            saveTime: Math.floor(duration / 1000),
          }
        );
      } catch (error) {
        console.error('Error sending Sentry or Datadog message', error);
      }
      // wait for 10 seconds to sent success message to Sentry and navigate back to guest list
      Sentry.flush(10000).finally(() => {
        this.router.navigate(['bookings', this.booking?.NumReserva]);
      });
    } else {
      Sentry.logger.error(
        Sentry.logger
          .fmt`[${this.confService.hotel?.id}-${this.booking.NumReserva}-${this.guest.NumeroCliente}] Ocurrió un error al guardar el huésped ${this.guest.displayName}.`,
        {
          hotel: this.confService.hotel?.name,
          NumReserva: this.booking.NumReserva,
          NumeroCliente: this.guest.NumeroCliente,
          IDHuesped: this.guest.IDHuesped,
          Nombre: this.guest.displayName,
          Email: this.guest.DatosComunicacion.EMail,
          saveTime: Math.floor(duration / 1000),
          resultado: response,
        }
      );
      //console.error('[guest-form] There were some errors.', response);
      // send error to sentry
      Sentry.captureMessage('Error al guardar el huésped', {
        level: 'error',
        tags: {
          module: 'guest-form',
          action: 'Submit guest form',
        },
        extra: {
          booking: this.booking,
          guest: this.guest,
          response,
          parallelRequests,
        },
      });
      // reset survey form but keep data
      this.survey.clear(false);
      // display error message to user
      this.dialog.open(SimpleDialogComponent, {
        data: {
          title: this.translate.instant('guestForm.error.title'),
          message: this.translate.instant('guestForm.error.message'),
        },
      });
    }
    this.saving = false;
  }

  /**
   * Update guest data in backend
   */
  private updateGuest(): Observable<boolean> {
    if (!this.booking || !this.guest) {
      throw new Error('Booking or guest not found');
    }
    this.guest.DatosComunicacion.EMail = this.survey.getValue('email');
    this.guest.DatosComunicacion.Telefono = this.survey.getValue('phone');
    this.guest.DatosComunicacion.Pais = this.survey.getValue('country');
    this.guest.DatosComunicacion.Provincia = this.survey.getValue('region');
    this.guest.DatosComunicacion.CodigoPostal =
      this.survey.getValue('postalCode');
    this.guest.Comentarios = this.survey.getValue('comments');
    this.guest.Firma = this.survey.getValue('signature');
    //Sentry.setContext('Guest', { guest: this.guest });

    return this.bookingService.updateGuest(this.booking, this.guest).pipe(
      // return true if guest was updated
      map(() => true),
      // return false if guest was not updated
      catchError(() => {
        return of(false);
      })
    );
  }

  /**
   * Update booking in backend with purpose of stay (holder only)
   */
  private updateBooking(): Observable<boolean> {
    if (!this.booking || !this.guest) {
      throw new Error('Booking or guest not found');
    }
    // update booking with purpose of stay (holder only)
    this.booking.MotivoViaje = this.survey.getValue('purposeOfStay');
    //Sentry.setContext('Booking', { booking: this.booking });
    return this.bookingService.updateBooking(this.booking).pipe(
      // return true if booking was updated
      map(() => true),
      // return false if booking was not updated
      catchError(() => {
        return of(false);
      })
    );
  }

  /**
   * Send email to guest with pdf attachments
   */
  private sendEmail(
    attachments?: { base64: string; filename: string }[]
  ): Observable<boolean> {
    if (!this.booking || !this.guest) {
      throw new Error('Booking or guest not found');
    }
    const subjectTemplateUrl = `/assets/email/${this.confService.language}/template_subject.txt`;
    const bodyTemplateUrl = `/assets/email/${this.confService.language}/template_body.html`;
    const context = {
      //reserva: this.booking,
      //huesped: this.guest,
      hotel: this.confService.hotel,
      //booking: this.booking,
      guest: this.guest,
    };

    return forkJoin([
      this.emailService.getTemplate(subjectTemplateUrl, context),
      this.emailService.getTemplate(bodyTemplateUrl, context),
    ]).pipe(
      catchError(() => {
        // silence errors and continue
        return of(['', '']);
      }),
      switchMap(([subject, body]) => {
        console.log('[guest-form] Sending contract email...');
        return this.emailService
          .sendEmail(
            this.guest!.DatosComunicacion!.EMail,
            subject,
            body,
            attachments
          )
          .pipe(
            map(() => true),
            tap(() => {
              Sentry.logger.info(
                Sentry.logger
                  .fmt`[${this.confService.hotel?.id}-${this.booking?.NumReserva}-${this.guest?.NumeroCliente}] Email enviado a ${this.guest?.displayName} (${this.guest?.DatosComunicacion?.EMail}).`,
                {
                  hotel: this.confService.hotel?.name,
                  NumReserva: this.booking?.NumReserva,
                  NumeroCliente: this.guest?.NumeroCliente,
                  IDHuesped: this.guest?.IDHuesped,
                  Nombre: this.guest?.displayName,
                  email: this.guest?.DatosComunicacion?.EMail,
                  numAdjuntos: attachments?.length,
                }
              );
            }),
            catchError(() => {
              Sentry.logger.error(
                Sentry.logger
                  .fmt`[${this.confService.hotel?.id}-${this.booking?.NumReserva}-${this.guest?.NumeroCliente}] Ocurrió un error al enviar el email a ${this.guest?.displayName} (${this.guest?.DatosComunicacion?.EMail}).`,
                {
                  hotel: this.confService.hotel?.name,
                  NumReserva: this.booking?.NumReserva,
                  NumeroCliente: this.guest?.NumeroCliente,
                  IDHuesped: this.guest?.IDHuesped,
                  Nombre: this.guest?.displayName,
                  email: this.guest?.DatosComunicacion?.EMail,
                  numAdjuntos: attachments?.length,
                }
              );
              return of(false);
            })
          );
      })
    );
  }

  /****************************************************************************
   * HELPER METHODS
   ***************************************************************************/

  /**
   * Return a filename for a PDF
   * @param type Type of document
   * @param context Whether the file is for upload or email
   * @returns
   */
  private getFilename(
    type: 'contract' | 'cardex' | 'privacy' | 'turismo' = 'contract',
    context: 'upload' | 'email'
  ): string {
    if (!this.booking || !this.guest) {
      return '';
    }
    const hotelCode = this.confService.hotel?.id;
    const date = dateToContract(this.booking.FechaEntrada);

    if (context === 'upload') {
      switch (type) {
        case 'contract':
          return `contract_${date}_${hotelCode}_${this.booking.NumReserva}_${this.guest.IDDocumento}.pdf`;
        case 'cardex':
          return `${date}_${hotelCode}_${this.booking.NumReserva}_${this.guest.IDDocumento}.pdf`;
        case 'privacy':
          return `${date}_${hotelCode}_${this.booking.NumReserva}_${this.guest.IDDocumento}_privacy.pdf`;
        case 'turismo':
          return `${date}_${hotelCode}_${this.booking.NumReserva}_${this.guest.IDDocumento}_turismo.pdf`;
        default:
          return `${date}_${hotelCode}_${this.booking.NumReserva}.pdf`;
      }
    } else {
      const translatedFilename = this.translate.instant(
        `email.attachments.${type}`
      );
      return `${this.booking.NumReserva}_${translatedFilename}.pdf`;
    }
  }

  /**
   * Return a base64 string of the cardex PDF
   * @param elementId   ID of the element to convert to PDF
   * @param filename    Filename of the PDF
   * @returns
   */
  async elementToPdf(
    elementId: string,
    filename: string
  ): Promise<string | null> {
    const element = document.getElementById(elementId);
    const html2pdf = (await import('html2pdf.js')).default;
    if (!element) {
      return null;
    }
    const opciones = {
      margin: 15,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      //html2canvas:  {dpi: 192, letterRendering: true},
      jsPDF: { unit: 'mm', format: 'A4', orientation: 'portrait' },
    };
    // create pdf
    const pdfWorker = html2pdf().from(element).set(opciones);
    const cardexPdf = await pdfWorker.toPdf().output('datauristring');
    return cardexPdf;
  }

  private async getSignedContract(): Promise<Uint8Array | null> {
    const signature = this.guest?.Firma;
    if (!signature) {
      console.error('No signature found');
      return null;
    }

    const contractPdfUrl = `assets/pdf/contract_${this.confService.hotel?.country}.pdf`;

    try {
      // get PDF contract and sign it
      const signedContractPdf = await getSignedPdf(
        contractPdfUrl,
        signature,
        this.http,
        0, // first page
        20, // left offset
        10 // bottom offset
      );
      if (!(signedContractPdf instanceof Uint8Array)) {
        console.error('Signed contract is not in Uint8Array format');
        return null;
      }

      // get cardex PDF
      const cardexFilename = this.getFilename('cardex', 'upload');
      const cardexPdfBase64 = await this.elementToPdf('cardex', cardexFilename);
      if (!cardexPdfBase64) {
        console.error('Failed to generate cardex PDF');
        return null;
      }
      const cardexPdf = new Uint8Array(
        atob(extractBase64(cardexPdfBase64)!)
          .split('')
          .map(c => c.charCodeAt(0))
      );

      if (!(cardexPdf instanceof Uint8Array)) {
        console.error('Cardex PDF is not in Uint8Array format');
        return null;
      }

      // combine cardex and contract PDFs
      const finalPdf = await mergePdfs([cardexPdf, signedContractPdf]);
      // download pdf (dev only)
      if (this.confService.isDebug()) {
        downloadPdf(finalPdf, cardexFilename);
      }
      return finalPdf;
    } catch (error) {
      console.error('Error while generating signed contract:', error);
      return null;
    }
  }

  private async getSignedPrivacyPolicy(): Promise<Uint8Array | null> {
    const signature = this.guest?.Firma;
    if (!signature) {
      console.error('No signature found');
      return null;
    }
    const privacyPdfUrl = `assets/pdf/privacy_policy_${this.confService.language}.pdf`;
    try {
      // get privacy policy PDF template and sign it
      const privacyPdf = await getSignedPdf(
        privacyPdfUrl,
        signature,
        this.http,
        3, // 4th page,
        20, // left offset
        500 // bottom offset
      );
      if (!(privacyPdf instanceof Uint8Array)) {
        console.error('Privacy policy is not in Uint8Array format');
        return null;
      }
      // download pdf (dev only)
      if (this.confService.isDebug()) {
        const privacyFilename = this.getFilename('privacy', 'upload');
        downloadPdf(privacyPdf, privacyFilename);
      }
      return privacyPdf;
    } catch (error) {
      console.error('Error while generating privacy policy:', error);
      return null;
    }
  }

  private async getSignedTourism(): Promise<Uint8Array | null> {
    const signature = this.guest?.Firma;
    if (!signature) {
      console.error('No signature found');
      return null;
    }
    const turismoPdfUrl = `assets/pdf/turismo_mx.pdf`;
    try {
      // get tourism PDF template and sign it
      const bottomOffset = this.confService.language === 'en' ? 350 : 50;
      const turismoPdf = await getSignedPdf(
        turismoPdfUrl,
        signature,
        this.http,
        0, // first page,
        320, // left offset
        bottomOffset // margin from the bottom of the page
      );
      if (!(turismoPdf instanceof Uint8Array)) {
        console.error('Tourism PDF is not in Uint8Array format');
        return null;
      }
      // download pdf (dev only)
      if (this.confService.isDebug()) {
        const turismoFilename = this.getFilename('turismo', 'upload');
        downloadPdf(turismoPdf, turismoFilename);
      }
      return turismoPdf;
    } catch (error) {
      console.error('Error while generating tourism PDF:', error);
      return null;
    }
  }

  /**
   * Return translated country name from country code
   */
  getTranslatedCountryName(country: string | undefined): string {
    return (
      countries[this.confService.language].find(c => c.value === country)
        ?.text ?? ''
    );
  }

  /**
   * Return translated purpose of stay
   */
  translatePurposeOfStay(purpose: string | undefined): string {
    if (!purpose) return '';
    return this.translate.instant(
      `guestForm.guest.purposeOfStay.values.${purpose}`
    );
  }

  /**
   * Open terms dialog
   */
  openPrivacyDialog() {
    const termsDialog = this.dialog.open(TermsModalComponent, {
      data: {
        title: this.translate.instant('guestForm.privacy.modal.title'),
        content: this.texts['privacy'],
        cancelText: this.translate.instant('guestForm.buttons.cancel'),
        acceptText: this.translate.instant('guestForm.buttons.accept'),
      },
      height: '700px',
      width: '95%',
      maxWidth: '800px',
    });
    termsDialog.afterClosed().subscribe(result => {
      this.survey.setValue('privacy', result, false, false);
    });
  }

  /**
   * Open contract dialog
   */
  openContractDialog() {
    const termsDialog = this.dialog.open(TermsModalComponent, {
      data: {
        title: this.translate.instant('guestForm.contract.modal.title'),
        content: this.texts['contract'],
        cancelText: this.translate.instant('guestForm.buttons.cancel'),
        acceptText: this.translate.instant('guestForm.buttons.accept'),
      },
      height: '700px',
      width: '95%',
      maxWidth: '800px',
    });
    termsDialog.afterClosed().subscribe(result => {
      this.survey.setValue('contract', result, false, false);
    });
  }

  /**
   * Open drugs dialog
   */
  openDrugsDialog() {
    const drugsDialog = this.dialog.open(TermsModalComponent, {
      data: {
        title: this.translate.instant('guestForm.drugs.modal.title'),
        content: this.texts['turismo'],
        cancelText: this.translate.instant('guestForm.buttons.cancel'),
        acceptText: this.translate.instant('guestForm.buttons.accept'),
      },
      height: '700px',
      width: '95%',
      maxWidth: '800px',
    });
    drugsDialog.afterClosed().subscribe(result => {
      this.survey.setValue('drugs', result, false, false);
    });
  }

  /**
   * Navigate back to list of guests.
   * Prompt for confirmation if edit mode.
   */
  back(): void {
    if (this.survey.mode === 'edit' && this.dirty) {
      this.dialog
        .open(ConfirmDialogComponent, {
          data: {
            message: this.translate.instant('guestForm.dialogs.cancel.message'),
            buttonCancel: this.translate.instant(
              'guestForm.dialogs.cancel.buttons.no'
            ),
            buttonConfirm: this.translate.instant(
              'guestForm.dialogs.cancel.buttons.yes'
            ),
            buttonsAlign: 'center',
          },
        })
        .afterClosed()
        .subscribe(result => {
          if (result) {
            this.router.navigate(['bookings', this.booking?.NumReserva]);
          }
        });
    } else {
      this.router.navigate(['bookings', this.booking?.NumReserva]);
    }
  }

  /**
   * Navigate to wifi page
   */
  continueToWifi(): void {
    this.router.navigate(['bookings', this.booking?.NumReserva, 'wifi']);
  }
}
