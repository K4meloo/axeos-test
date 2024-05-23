import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SwitchesComponent } from './switches/switches.component';

export const routes: Routes = [
  { path: '', title: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'dashboard',
    title: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
  },
  {
    path: 'switches',
    title: 'switches',
    component: SwitchesComponent,
    pathMatch: 'full',
  },
];
