import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  { 
    path: '', component: AuthComponent, children:[
      {
        path:'', redirectTo:'signin'
      },
      {
        path:'signin', component:SigninComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
