import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component'; // Import your component

const routes: Routes = [
  { path: '', redirectTo: '/flight-search', pathMatch: 'full' }, // Redirect to flight search on load
  { path: 'flight-search', component: FlightSearchComponent }, // Route for flight search
  // Add more routes here as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
