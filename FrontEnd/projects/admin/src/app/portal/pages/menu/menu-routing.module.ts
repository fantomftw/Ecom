import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CuisineListComponent } from './cuisine-list/cuisine-list.component';
import { MenuCreateComponent } from './menu-create/menu-create.component';
import { MenuListComponent } from './menu-list/menu-list.component';

import { MenuComponent } from './menu.component';

const routes: Routes = [
  { 
    path: '', component: MenuComponent, children:[
      {
        path:'', redirectTo:'item'
      },
      {
        path:'item', children:[
          {
            path:'', redirectTo:'list', pathMatch:'full'
          },
          {
            path:'list', component:MenuListComponent
          },
          {
            path:'list/:status', component:MenuListComponent
          },
          {
            path:'create', component:MenuCreateComponent
          }
        ]
      },
      {
        path:'cuisine', component:CuisineListComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
