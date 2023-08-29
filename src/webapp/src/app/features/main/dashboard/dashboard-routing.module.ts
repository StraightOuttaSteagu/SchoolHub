import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AnnouncementsComponent } from './announcements/announcements.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { GradesComponent } from './grades/grades.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'assignments/:mode', component: AssignmentsComponent },
    { path: 'assignments', redirectTo: 'assignments/assigned' },
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
