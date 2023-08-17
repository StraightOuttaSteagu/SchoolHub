import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AnnouncementsComponent } from './announcements/announcements.component';
import { AssignedComponent } from './assignments/assigned/assigned.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { DoneComponent } from './assignments/done/done.component';
import { MissingComponent } from './assignments/missing/missing.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { GradesComponent } from './grades/grades.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'assignments', component: AssignmentsComponent, children: [
      { path: 'assigned', component: AssignedComponent },
      { path: 'missing', component: MissingComponent },
      { path: 'done', component: DoneComponent },
      { path: '', redirectTo: '/assignments/assigned', pathMatch: 'full' }
    ]},
    { path: 'announcements', component: AnnouncementsComponent },
    { path: 'attendance', component: AttendanceComponent },
    { path: 'grades', component: GradesComponent },
    { path: '', redirectTo: '/grades', pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
