import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { OrderListComponent } from './pg/order/order-list/order-list.component';
import { OrderListFilterComponent } from './pg/order/order-list-filter/order-list-filter.component';
import { PaymentComponent } from './pg/payment/payment.component';
import { ButtonsModule, CardsModule, FileInputModule, IconsModule, InputsModule, MDBBootstrapModulesPro, MdbSelectModule, ModalModule, PopoverModule, TableModule, TooltipModule, WavesModule } from 'ng-uikit-pro-standard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { OrderDetailsComponent } from './pg/order/order-details/order-details.component';


@NgModule({
  declarations: [SalesComponent, OrderListComponent, OrderListFilterComponent, PaymentComponent, OrderDetailsComponent],
  imports: [
    CommonModule,
    ButtonsModule, WavesModule, CardsModule, MdbSelectModule,
    FormsModule, HttpClientModule, ReactiveFormsModule, FileInputModule,
    IconsModule, TableModule, ModalModule, TooltipModule, PopoverModule, InputsModule, NgxDropzoneModule,
    MDBBootstrapModulesPro.forRoot(),
    SalesRoutingModule
  ]
})
export class SalesModule { }
