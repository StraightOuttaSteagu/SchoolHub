import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardTeacherComponent } from './dashboard-teacher.component';

import { AnnouncementsComponent } from './announcements/announcements.component';
import { AssignmentsComponent } from './assignments/assignments.component';

const routes: Routes = [
  { path: '', component: DashboardTeacherComponent, children: [
    { path: 'assignments/:mode', component: AssignmentsComponent },
    { path: 'assignments', redirectTo: 'assignments/to-review' },
    { path: 'announcements', component: AnnouncementsComponent },
    { path: '', redirectTo: 'assignments/to-review', pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardTeacherRoutingModule { }
