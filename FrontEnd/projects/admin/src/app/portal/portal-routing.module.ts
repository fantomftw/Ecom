import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortalComponent } from './portal.component';

const routes: Routes = [
  { 
    path: '', component: PortalComponent, children:[
      { path:'', redirectTo:'dashboard'},
      { path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) },
      { path: 'restaurant', loadChildren: () => import('./pages/restaurant/restaurant.module').then(m => m.RestaurantModule) },
      { path: 'cms', loadChildren: () => import('./pages/cms/cms.module').then(m => m.CmsModule) },
      { path: 'enquiry', loadChildren: () => import('./pages/enquiry/enquiry.module').then(m => m.EnquiryModule) },
      { path: 'menu', loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule) },
      { path: 'eater', loadChildren: () => import('./pages/eater/eater.module').then(m => m.EaterModule) },
      { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'menu', loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule) },  
      { path: 'vouchers', loadChildren: () => import('./pages/vouchers/vouchers.module').then(m => m.VouchersModule) },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
