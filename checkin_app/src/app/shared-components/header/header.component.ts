import { Component, EventEmitter, Output } from '@angular/core';
import { ConfService } from '@services/conf/conf.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() back: EventEmitter<void> = new EventEmitter<void>();

  constructor(public confService: ConfService) {}

  goBack(): void {
    this.back.emit(); // Emitimos el evento
  }
}
