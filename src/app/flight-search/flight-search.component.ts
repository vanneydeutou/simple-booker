// aes-assessment/simple-booker/src/app/flight-search/flight-search.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitiesService } from '../services/cities.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SubmissionDialogComponent } from '../submission-dialog/submission-dialog.component';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  flightForm: FormGroup;
  cities$: Observable<{ name: string; value: string; }[]> | undefined;
  minDepartDate: Date | undefined;

  constructor(private fb: FormBuilder, private citiesService: CitiesService, private dialog: MatDialog) {
    this.flightForm = this.fb.group({
      departureCity: ['', Validators.required],
      destinationCity: ['', Validators.required],
      departDate: ['', Validators.required],
      returnDate: ['', Validators.required]
    }, { validators: this.citiesNotSame });
  }

  ngOnInit() {
    this.minDepartDate = new Date();
    this.cities$ = this.citiesService.getCities();
  }

  citiesNotSame(formGroup: FormGroup) {
    const departureCity = formGroup.get('departureCity')?.value;
    const destinationCity = formGroup.get('destinationCity')?.value;

    return departureCity && destinationCity && departureCity === destinationCity
      ? { citiesAreSame: true }
      : null;
  }

  onSubmit() {
    if (this.flightForm.valid) {
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SubmissionDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed if needed
    });
  }

  canSwapCities(): boolean {
    const departureCity = this.flightForm.get('departureCity')?.value;
    const destinationCity = this.flightForm.get('destinationCity')?.value;
    return !!departureCity && !!destinationCity;
  }

  swapCities(): void {
    const departureCity = this.flightForm.get('departureCity')?.value;
    const destinationCity = this.flightForm.get('destinationCity')?.value;

    this.flightForm.patchValue({
      departureCity: destinationCity,
      destinationCity: departureCity
    });
  }
}
