import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-frontdesk',
  templateUrl: './dialog-frontdesk.component.html',
  styleUrl: './dialog-frontdesk.component.scss',
})
export class DialogFrontdeskComponent {
  constructor(public dialogRef: MatDialogRef<DialogFrontdeskComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
