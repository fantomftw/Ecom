import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuCreateComponent } from './menu-create/menu-create.component';
import { ButtonsModule, CardsModule, FileInputModule, IconsModule, MDBBootstrapModulesPro, MdbSelectModule, ModalModule, PopoverModule, TableModule, TooltipModule, WavesModule } from 'ng-uikit-pro-standard';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CuisineListComponent } from './cuisine-list/cuisine-list.component';


@NgModule({
  declarations: [MenuComponent, MenuListComponent, MenuCreateComponent, CuisineListComponent],
  imports: [
    CommonModule,
    ButtonsModule, WavesModule, CardsModule, MdbSelectModule,
    FormsModule, HttpClientModule, ReactiveFormsModule, FileInputModule,
    IconsModule, TableModule, ModalModule, TooltipModule, PopoverModule,    
    MDBBootstrapModulesPro.forRoot(),

    MenuRoutingModule
  ]
})
export class MenuModule { }
