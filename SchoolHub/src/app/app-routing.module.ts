import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // TODO: the redirect should be made to the main view of app (e.g: OrganizationDashboardComponent)
  // To avoid redirect to dashboard when the user is not logged in, you can use Angular Guards
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
