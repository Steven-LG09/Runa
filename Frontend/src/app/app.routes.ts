import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ReservMaComponent } from './pages/reserv-ma/reserv-ma.component';
import { FormComponent } from './pages/form/form.component';
import { CodeComponent } from './pages/code/code.component';
import { NewReservComponent } from './pages/new-reserv/new-reserv.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'reservMa', component: ReservMaComponent },
  { path: 'form', component: FormComponent},
  { path: 'code', component: CodeComponent},
  { path: 'newReserv', component: NewReservComponent}
];
