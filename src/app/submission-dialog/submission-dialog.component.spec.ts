// src/app/submission-dialog/submission-dialog.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { SubmissionDialogComponent } from './submission-dialog.component';

describe('SubmissionDialogComponent', () => {
  let component: SubmissionDialogComponent;
  let fixture: ComponentFixture<SubmissionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmissionDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } } // Mock MatDialogRef
      ]
    });
    fixture = TestBed.createComponent(SubmissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when close is called', () => {
    component.close();
    const dialogRef = TestBed.inject(MatDialogRef);
    expect(dialogRef.close).toHaveBeenCalled(); // Verify that close was called on the dialog reference
  });
});
