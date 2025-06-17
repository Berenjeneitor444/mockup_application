import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrl: './simple-dialog.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class SimpleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SimpleDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; message: string; button: string }
  ) {}
  close(): void {
    this.dialogRef.close();
  }
}
