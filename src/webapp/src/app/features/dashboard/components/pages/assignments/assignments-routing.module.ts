import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssignmentsComponent } from './assignments.component';
import { MissingComponent } from './missing/missing.component';
import { DoneComponent } from './done/done.component';
import { AssignedComponent } from './assigned/assigned.component';
import { DashboardComponent } from '../../../dashboard.component';

const routes: Routes = [
  { path: 'assignments', component: AssignmentsComponent, children: [
    { path: 'assigned', component: AssignedComponent },
    { path: 'missing', component: MissingComponent },
    { path: 'done', component: DoneComponent },
    { path: '', redirectTo: 'assignments/assigned', pathMatch: 'full' }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentsRoutingModule { }
