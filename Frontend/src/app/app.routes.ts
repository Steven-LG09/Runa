import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ReservMaComponent } from './pages/reserv-ma/reserv-ma.component';
import { FormComponent } from './pages/form/form.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'reservMa', component: ReservMaComponent },
  { path: 'form', component: FormComponent}
];
