import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ReservMaComponent } from './pages/visitant/reserv-ma/reserv-ma.component';
import { FormComponent } from './pages/visitant/form/form.component';
import { CodeComponent } from './pages/visitant/code/code.component';
import { NewReservComponent } from './pages/visitant/new-reserv/new-reserv.component';
import { ThanksComponent } from './pages/visitant/thanks/thanks.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { MainPriComponent } from './pages/admin/main-pri/main-pri.component';
import { HistoryComponent } from './pages/admin/history/history.component';
import { InfoComponent } from './pages/admin/info/info.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'reservMa', component: ReservMaComponent },
  { path: 'form', component: FormComponent},
  { path: 'code', component: CodeComponent},
  { path: 'newReserv', component: NewReservComponent},
  { path: 'thanks', component: ThanksComponent},
  { path: 'login', component: LoginComponent},
  { path: 'mainPri', component: MainPriComponent},
  { path: 'history', component: HistoryComponent},
  { path: 'info', component: InfoComponent}
  
];
