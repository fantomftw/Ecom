import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VouchersRoutingModule } from './vouchers-routing.module';
import { VouchersComponent } from './vouchers.component';
import { VouchersListComponent } from './vouchers-list/vouchers-list.component';
import { VouchersCreateComponent } from './vouchers-create/vouchers-create.component';
import { ButtonsModule, CardsModule, DatepickerModule, FileInputModule, IconsModule, MDBBootstrapModulesPro, MdbSelectModule, ModalModule, PopoverModule, TableModule, TooltipModule, WavesModule } from 'ng-uikit-pro-standard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [VouchersComponent, VouchersListComponent, VouchersCreateComponent],
  imports: [
    CommonModule,
    ButtonsModule, CardsModule, IconsModule,
    FileInputModule, WavesModule, TableModule,
    MdbSelectModule, FormsModule, ReactiveFormsModule, 
    ModalModule, TooltipModule, PopoverModule, DatepickerModule,
    MDBBootstrapModulesPro.forRoot(),
    VouchersRoutingModule
  ]
})
export class VouchersModule { }
