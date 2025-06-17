import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ElementRef,
  Inject,
  ChangeDetectorRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-terms-modal',
  templateUrl: './terms-modal.component.html',
  styleUrl: './terms-modal.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsModalComponent {
  canAccept = false;
  scrollTop = 0;
  scrollHeight = 0;
  clientHeight = 0;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  ngAfterViewInit() {
    this.onScroll();
  }

  onScroll() {
    const element = this.scrollContainer.nativeElement;
    const MARGIN_BEFORE_BOTTOM = 10; // offset in pixels before reaching the bottom
    if (
      element.scrollHeight - element.scrollTop - MARGIN_BEFORE_BOTTOM <=
      element.clientHeight
    ) {
      this.canAccept = true;
      this.cdr.detectChanges();
    }
  }
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
      cancelText: string;
      acceptText: string;
    },
    private cdr: ChangeDetectorRef
  ) {}
}
