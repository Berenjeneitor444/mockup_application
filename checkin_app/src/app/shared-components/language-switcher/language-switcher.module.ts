import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSwitcherComponent } from './language-switcher.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [LanguageSwitcherComponent],
  imports: [CommonModule, MatSelectModule],
  exports: [LanguageSwitcherComponent],
})
export class LanguageSwitcherModule {}
