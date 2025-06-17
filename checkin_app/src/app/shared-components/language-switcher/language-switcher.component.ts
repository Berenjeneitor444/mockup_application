import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BasePageComponent } from '@pages/base.page';
import { ConfService } from '@services/conf/conf.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent extends BasePageComponent {
  language = 'es';
  constructor(
    private translate: TranslateService,
    public confService: ConfService
  ) {
    super();
    this.subscriptions.push(
      this.confService.language$.subscribe((language: string) => {
        this.language = language;
      })
    );
  }

  switchLanguage(language: string) {
    this.confService.setLanguage(language);
    this.translate.use(language);
  }
}
