import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortalComponent } from './portal.component';
 
const routes: Routes = [
  { 
    path: '', component: PortalComponent, children:[
      { path:'', redirectTo:'dashboard'},
      // { path: 'editProfile'}
      { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'customers', loadChildren: () => import('./pages/customers/customers.module').then(m => m.CustomersModule) },
      { path: 'sales', loadChildren: () => import('./pages/sales/sales.module').then(m => m.SalesModule) },
      { path: 'catalog', loadChildren: () => import('./pages/catalog/catalog.module').then(m => m.CatalogModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
