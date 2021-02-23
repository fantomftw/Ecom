import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'projects/shared/src/lib/auth/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },

  { 
    path: '', canActivate:[AuthGuard], data:{roles:['Su', 'Admin', 'SubAdmin']}, loadChildren: () => import('./portal/portal.module').then(m => m.PortalModule) 
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
