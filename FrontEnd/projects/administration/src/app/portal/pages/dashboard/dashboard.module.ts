import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AccordionModule, ButtonsModule, CardsModule, IconsModule, MDBBootstrapModulesPro, NavbarModule, SidenavModule, WavesModule } from 'ng-uikit-pro-standard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SidenavModule, NavbarModule, WavesModule, AccordionModule,
    ButtonsModule, CardsModule, 
    IconsModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    MDBBootstrapModulesPro.forRoot(),
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
