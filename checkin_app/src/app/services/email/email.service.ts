import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfService } from '@services/conf/conf.service';
import { Observable, catchError, firstValueFrom, map, tap } from 'rxjs';
import * as Sentry from '@sentry/angular';
import * as Handlebars from 'handlebars';

interface EmailPayload {
  body: {
    to: string;
    subject: string;
    message: string;
    attachments?: { base64: string; filename: string }[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(
    private http: HttpClient,
    private confService: ConfService
  ) {}
  private provider = 'aws';
  private emailConf =
    this.confService.getDefaultConf().email?.providers?.[this.provider];

  sendEmail(
    to: string,
    subject: string,
    body: string,
    attachments?: { base64: string; filename: string }[]
  ): Observable<any> {
    // check configuration
    if (!this.emailConf || !this.emailConf?.url) {
      Sentry.captureMessage(
        'Email configuration not found for provider: ' + this.provider,
        {
          tags: {
            module: 'email-service',
            action: 'Send contract',
          },
          level: 'error',
        }
      );
      throw new Error(
        'Email configuration not found for provider: ' + this.provider
      );
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const payload: EmailPayload = {
      body: {
        to,
        subject,
        message: body,
      },
    };
    if (attachments) {
      payload.body.attachments = attachments;
    }

    return this.http.post(this.emailConf?.url, payload, { headers }).pipe(
      tap(() => {
        Sentry.addBreadcrumb({
          category: 'email',
          message: 'Email successfully sent!',
          data: {
            payload,
          },
          level: 'info',
        });
      }),
      catchError(error => {
        Sentry.captureMessage('Error sending email', {
          tags: {
            module: 'email-service',
            action: 'Send email',
          },
          extra: {
            error,
            to,
            subject,
            payload,
          },
        });
        console.error('[email-service] Error sending email.', payload, error);
        throw error;
      })
    );
  }

  /**
   * Return a compiled template with the given context
   * @param templatePath
   * @param context
   * @returns
   */
  getTemplate(templatePath: string, context: any): Promise<string> {
    return firstValueFrom(
      this.http.get(templatePath, { responseType: 'text' }).pipe(
        map((template: string) => {
          const compiledTemplate = Handlebars.compile(template);
          return compiledTemplate(context);
        }),
        catchError(error => {
          Sentry.captureMessage('Error getting email template', {
            tags: {
              module: 'email-service',
              action: 'Get email template',
            },
            extra: {
              error,
              templatePath,
            },
          });
          console.error(
            '[email-service] Error getting email template.',
            templatePath,
            error
          );
          throw error;
        })
      )
    );
  }
}
