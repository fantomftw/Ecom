import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRestaurantItemComponent } from './add-restaurant-item/add-restaurant-item.component';
import { RestaurantCreateComponent } from './restaurant-create/restaurant-create.component';
import { RestaurantEnquiryComponent } from './restaurant-enquiry/restaurant-enquiry.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantMenuItemComponent } from './restaurant-menu-item/restaurant-menu-item.component';
import { RestaurantMenuListComponent } from './restaurant-menu-list/restaurant-menu-list.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import { RestaurantOrdersComponent } from './restaurant-orders/restaurant-orders.component';
import { RestaurantProfileComponent } from './restaurant-profile/restaurant-profile.component';
import { RestaurantRevenueComponent } from './restaurant-revenue/restaurant-revenue.component';
import { RestaurantUserComponent } from './restaurant-user/restaurant-user.component';

import { RestaurantComponent } from './restaurant.component';

const routes: Routes = [
  { 
    path: '', component: RestaurantComponent, children:[
      {
        path:'', redirectTo:'list'
      },
      {
        path:'list', component:RestaurantListComponent
      },
      {
        path:'register', component:RestaurantCreateComponent
      },
      {
        path:'enquiry', component:RestaurantEnquiryComponent
      },
      {
        path:':restaurantId', children:[
          {
            //Restaurant Profile
            path:'', component:RestaurantProfileComponent
          },
          {
            //To get the list of restaurant Menu
            path:'menu', component:RestaurantMenuComponent
          },
          {
            //To get inside the restaurant Menu
            path:'menu/:menuId', children:[
              {
                //Get the list of item inside the menu id
                path:'', component:RestaurantMenuListComponent
              },
              {
                //
                path:'add',component: RestaurantMenuItemComponent
              },
              {
                path:'item', component:AddRestaurantItemComponent
              },
              {
                path:'item/:itemId', component:AddRestaurantItemComponent
              },
              {
                path:'menuItem/:menuItemId', component:AddRestaurantItemComponent
              }
            ]
          },
          
          {
            path:'order', component:RestaurantOrdersComponent
          },
          {
            path:'revenue', component:RestaurantRevenueComponent
          },
          {
            path:'user', component:RestaurantUserComponent
          }
        ]
      }
    ],
    
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
