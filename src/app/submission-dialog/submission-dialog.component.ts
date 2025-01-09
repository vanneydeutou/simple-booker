import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-submission-dialog',
  template: `
    <h1 mat-dialog-title>Submission Successful</h1>
    <div mat-dialog-content>
      <p>Your flight search has been submitted successfully!</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="close()">Close</button>
    </div>
  `,
})
export class SubmissionDialogComponent {
  constructor(private dialogRef: MatDialogRef<SubmissionDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
