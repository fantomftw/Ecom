import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { AccordionModule, ButtonsModule, CardsModule, IconsModule, MDBBootstrapModulesPro, NavbarModule, SidenavModule, WavesModule } from 'ng-uikit-pro-standard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CuisineCreateComponent } from './modal/menu/cuisine-create/cuisine-create.component';


@NgModule({
  declarations: [PortalComponent, HeaderComponent, FooterComponent, SidebarComponent, CuisineCreateComponent],
  imports: [
    CommonModule,
    SidenavModule, NavbarModule, WavesModule, AccordionModule,
    ButtonsModule, CardsModule, 
    IconsModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    MDBBootstrapModulesPro.forRoot(),
    PortalRoutingModule
  ],
  entryComponents:[CuisineCreateComponent]

})
export class PortalModule { }
