import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VouchersCreateComponent } from './vouchers-create/vouchers-create.component';
import { VouchersListComponent } from './vouchers-list/vouchers-list.component';

import { VouchersComponent } from './vouchers.component';

const routes: Routes = [
  { 
    path: '', component: VouchersComponent, children:[
      {
        path:'', redirectTo:"list"
      },
      {
        path:'list', component:VouchersListComponent
      },
      {
        path:'create', component:VouchersCreateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VouchersRoutingModule { }
