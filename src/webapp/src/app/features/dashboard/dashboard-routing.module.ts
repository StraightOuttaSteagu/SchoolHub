import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DashboardComponent } from './dashboard.component';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { AssignedComponent } from './pages/assignments/assigned/assigned.component';
import { AssignmentsComponent } from './pages/assignments/assignments.component';
import { DoneComponent } from './pages/assignments/done/done.component';
import { MissingComponent } from './pages/assignments/missing/missing.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { GradesComponent } from './pages/grades/grades.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'assignments', component: AssignmentsComponent, children: [
      { path: 'assigned', component: AssignedComponent },
      { path: 'missing', component: MissingComponent },
      { path: 'done', component: DoneComponent },
      { path: '', redirectTo: 'assignments/assigned', pathMatch: 'full' }
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