import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CustomerListComponent } from './pg/customer-list/customer-list.component';
import { ButtonsModule, CardsModule, FileInputModule, IconsModule, InputsModule, MDBBootstrapModulesPro, MdbSelectModule, ModalModule, PopoverModule, TableModule, TooltipModule, WavesModule } from 'ng-uikit-pro-standard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [CustomersComponent, CustomerListComponent],
  imports: [
    CommonModule,
    ButtonsModule, WavesModule, CardsModule, MdbSelectModule,
    FormsModule, HttpClientModule, ReactiveFormsModule, FileInputModule,
    IconsModule, TableModule, ModalModule, TooltipModule, PopoverModule, InputsModule, NgxDropzoneModule,
    MDBBootstrapModulesPro.forRoot(),
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
