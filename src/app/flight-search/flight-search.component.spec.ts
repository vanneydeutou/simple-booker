// src/app/flight-search/flight-search.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FlightSearchComponent } from './flight-search.component';
import { CitiesService } from '../services/cities.service';
import { Observable, of } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Updated import
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FlightSearchComponent', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;
  let citiesServiceMock: any;
  let dialogMock: any;

  beforeEach(async () => {
    citiesServiceMock = {
      getCities: jasmine.createSpy('getCities').and.returnValue(of([{ name: 'City A', value: 'cityA' }, { name: 'City B', value: 'cityB' }])),
    };

    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(null),
      }),
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule, // Ensure this is imported from @angular/material/core
        NoopAnimationsModule
      ],
      declarations: [FlightSearchComponent],
      providers: [
        { provide: CitiesService, useValue: citiesServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: MatDialogRef, useValue: {} }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.flightForm).toBeDefined();
    expect(component.flightForm.get('departureCity')?.value).toBe('');
    expect(component.flightForm.get('destinationCity')?.value).toBe('');
    expect(component.flightForm.get('departDate')?.value).toBe('');
    expect(component.flightForm.get('returnDate')?.value).toBe('');
  });

  it('should set minDepartDate to today on init', () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight
    component.ngOnInit();
    expect(component.minDepartDate).toBeDefined();

    // Set minDepartDate to midnight for comparison
    const minDepartDateMidnight = new Date(component.minDepartDate!);
    minDepartDateMidnight.setHours(0, 0, 0, 0);

    expect(minDepartDateMidnight.getTime()).toBe(today.getTime()); // Compare the time values
  });

  it('should validate that departure and destination cities are not the same', () => {
    component.flightForm.patchValue({
      departureCity: 'cityA',
      destinationCity: 'cityA',
    });
    expect(component.citiesNotSame(component.flightForm)).toEqual({ citiesAreSame: true });

    component.flightForm.patchValue({
      destinationCity: 'cityB',
    });
    expect(component.citiesNotSame(component.flightForm)).toBeNull();
  });

  it('should swap cities correctly', () => {
    component.flightForm.patchValue({
      departureCity: 'cityA',
      destinationCity: 'cityB',
    });
    component.swapCities();
    expect(component.flightForm.get('departureCity')?.value).toBe('cityB');
    expect(component.flightForm.get('destinationCity')?.value).toBe('cityA');
  });

  it('should open the dialog on valid form submission', () => {
    component.flightForm.patchValue({
      departureCity: 'cityA',
      destinationCity: 'cityB',
      departDate: new Date(),
      returnDate: new Date(),
    });
    component.onSubmit();
    expect(dialogMock.open).toHaveBeenCalled();
  });

  it('should not open the dialog on invalid form submission', () => {
    component.flightForm.patchValue({
      departureCity: '',
      destinationCity: 'cityB',
      departDate: new Date(),
      returnDate: new Date(),
    });
    component.onSubmit();
    expect(dialogMock.open).not.toHaveBeenCalled();
  });
});
