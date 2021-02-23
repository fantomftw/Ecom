import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';

import { UserComponent } from './user.component';

const routes: Routes = [
  { 
    path: '', component: UserComponent, children:[
      {
        path:'', redirectTo:'list'
      },
      {
        path:'list', component:UserListComponent
      },
      {
        path:'create', component:UserCreateComponent
      },
      {
        path:'profile/:id', component:ProfileComponent
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
