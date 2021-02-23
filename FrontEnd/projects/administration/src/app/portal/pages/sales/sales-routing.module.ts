import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderDetailsComponent } from './pg/order/order-details/order-details.component';
import { OrderListFilterComponent } from './pg/order/order-list-filter/order-list-filter.component';
import { OrderListComponent } from './pg/order/order-list/order-list.component';
import { PaymentComponent } from './pg/payment/payment.component';

import { SalesComponent } from './sales.component';

const routes: Routes = [
  { 
    path: '', component: SalesComponent, children:[
      {
        path:'orders', children:[
          
          {
            path:'list', component:OrderListComponent
          },
          {
            path:'list/:status', component:OrderListComponent
          },
          // {
          //   path:':orderId', component:OrderDetailsComponent
          // },
          {
            path:'', redirectTo:'list'
          },
        ]
      },
      {
        path:'payments', children:[
          {
            path:'', redirectTo:'list'
          },
          {
            path:'list', component:PaymentComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
