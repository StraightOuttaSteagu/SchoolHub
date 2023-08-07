import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { DashboardPagesRoutingModule } from './features/dashboard/components/pages/dashboard-pages-routing.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DashboardPagesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
