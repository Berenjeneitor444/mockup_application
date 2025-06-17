import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { LanguageSwitcherModule } from '../language-switcher/language-switcher.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, LanguageSwitcherModule, MatIconModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
