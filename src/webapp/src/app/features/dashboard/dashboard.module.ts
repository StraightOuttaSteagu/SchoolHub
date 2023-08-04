import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardPagesRoutingModule } from './components/pages/dashboard-pages-routing.module';
import { DashboardPagesModule } from './components/pages/dashboard-pages.module';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    DashboardPagesRoutingModule,
    DashboardPagesModule
  ]
})
export class DashboardModule { }
