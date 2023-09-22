import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';


const routes: Routes = [
  {
    path: '', component: MainComponent, children: [      
      { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'admin', loadChildren: () => import('./dashboard-teacher/dashboard-teacher.module').then(m => m.DashboardTeacherModule) },
      { path: 'teacher', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
      { path: 'settings', loadChildren: () => import('../../shared/settings/settings.module').then(m => m.SettingsModule) },
      { path: 'class-student', loadChildren: () => import('./class-student/class-student.module').then(m => m.ClassStudentModule) },
      { path: 'class-teacher', loadChildren: () => import('./class-teacher/class-teacher.module').then(m => m.ClassTeacherModule) },
      { path: 'post', loadChildren: () => import('./post/post.module').then(m => m.PostModule) },
      { path: 'chat', loadChildren: () => import('../../shared/chat/chat.module').then(m => m.ChatModule) }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
