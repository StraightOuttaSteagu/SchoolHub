import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentComponent } from './parent.component';
import { GradesComponent } from './grades/grades.component';
import { ChatComponent } from '../../shared/chat/chat.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { SettingsComponent } from '../../shared/settings/settings.component';

const routes: Routes = [
  {
    path: '', component: ParentComponent, children: [
      {path: 'grades', component: GradesComponent},
      {path: 'attendance', component: AttendanceComponent},
      {path: 'chat', component: ChatComponent},
      {path: 'settings', component: SettingsComponent},
      {path: '', redirectTo: '/parent/grades', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule {
}
