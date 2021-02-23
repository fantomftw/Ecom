import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantComponent } from './restaurant.component';
import { RestaurantCreateComponent } from './restaurant-create/restaurant-create.component';
import { ButtonsModule, CardsModule, FileInputModule, IconsModule, MDBBootstrapModulesPro, MdbSelectModule, ModalModule, PopoverModule, TableModule, TooltipModule, WavesModule } from 'ng-uikit-pro-standard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantEnquiryComponent } from './restaurant-enquiry/restaurant-enquiry.component';
import { RestaurantProfileComponent } from './restaurant-profile/restaurant-profile.component';
import { RestaurantOrdersComponent } from './restaurant-orders/restaurant-orders.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import { RestaurantUserComponent } from './restaurant-user/restaurant-user.component';
import { RestaurantRevenueComponent } from './restaurant-revenue/restaurant-revenue.component';
import { ModalRestaurantMenuComponent } from './modal-restaurant-menu/modal-restaurant-menu.component';
import { RestaurantMenuItemComponent } from './restaurant-menu-item/restaurant-menu-item.component';
import { AddRestaurantItemComponent } from './add-restaurant-item/add-restaurant-item.component';
import { RestaurantMenuListComponent } from './restaurant-menu-list/restaurant-menu-list.component';


@NgModule({
  declarations: [RestaurantComponent, RestaurantCreateComponent, RestaurantListComponent, RestaurantEnquiryComponent, RestaurantProfileComponent, RestaurantOrdersComponent, RestaurantMenuComponent, RestaurantUserComponent, RestaurantRevenueComponent, ModalRestaurantMenuComponent, RestaurantMenuItemComponent, AddRestaurantItemComponent, RestaurantMenuListComponent],
  imports: [
    CommonModule,
    ButtonsModule, WavesModule, CardsModule, MdbSelectModule,
    FormsModule, HttpClientModule, ReactiveFormsModule, FileInputModule,
    IconsModule, TableModule, ModalModule, TooltipModule, PopoverModule,    
    MDBBootstrapModulesPro.forRoot(),
    RestaurantRoutingModule
  ]
})
export class RestaurantModule { }
