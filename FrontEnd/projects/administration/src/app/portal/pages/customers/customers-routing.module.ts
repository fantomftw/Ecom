import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './customers.component';
import { CustomerListComponent } from './pg/customer-list/customer-list.component';

const routes: Routes = [
  { 
    path: '', component: CustomersComponent, children:[
      {
        path:'list', component:CustomerListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
