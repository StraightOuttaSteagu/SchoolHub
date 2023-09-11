import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';

import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ZygoteBodyComponent } from "./features/tools/zygothe-body/zygote-body.component";

const routes: Routes = [
  { path: 'body', component: ZygoteBodyComponent, canActivate: mapToCanActivate([AuthGuard]) },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'whiteboard', loadChildren: () => import('./features/tools/whiteboard/whiteboard.module').then(m => m.WhiteboardModule), canActivate: mapToCanActivate([AuthGuard]) },
  { path: 'chemistry', loadChildren: () => import('./features/tools/chemistry/chemistry.module').then(m => m.ChemistryModule), canActivate: mapToCanActivate([AuthGuard]) },
  { path: '', loadChildren: () => import('./features/main/main.module').then(m => m.MainModule), canActivate: mapToCanActivate([AuthGuard]) },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
