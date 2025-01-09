// src/app/services/cities.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { CitiesService } from './cities.service';
import { CITIES } from './cities-data.const'; // Ensure this import is correct

describe('CitiesService', () => {
  let service: CitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CitiesService] // Provide the CitiesService here
    });
    service = TestBed.inject(CitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of cities', (done) => {
    service.getCities().subscribe(cities => {
      expect(cities).toEqual(CITIES); // Check if the returned cities match the expected data
      done();
    });
  });
});
