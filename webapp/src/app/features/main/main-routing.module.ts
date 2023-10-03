import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';


const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: 'student', children: [
        { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
        { path: 'classes', loadChildren: () => import('./class-student/class-student.module').then(m => m.ClassStudentModule) }
      ]},
      { path: 'teacher', children: [
        { path: '', loadChildren: () => import('./dashboard-teacher/dashboard-teacher.module').then(m => m.DashboardTeacherModule) },
        { path: 'classes', loadChildren: () => import('./class-teacher/class-teacher.module').then(m => m.ClassTeacherModule) }
      ]},
      { path: 'admin', children: [
        { path: '', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
        { path: 'classes', loadChildren: () => import('./class-teacher/class-teacher.module').then(m => m.ClassTeacherModule) }
      ]},
      { path: 'settings', loadChildren: () => import('../../shared/settings/settings.module').then(m => m.SettingsModule) },
      { path: 'post', loadChildren: () => import('./post/post.module').then(m => m.PostModule) },
      { path: 'chat', loadChildren: () => import('../../shared/chat/chat.module').then(m => m.ChatModule) },
      { path: '', redirectTo: 'student/grades', pathMatch: 'full' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
