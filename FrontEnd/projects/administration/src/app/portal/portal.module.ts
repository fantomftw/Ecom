import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AccordionModule, ButtonsModule, CardsModule, IconsModule, MDBBootstrapModulesPro, NavbarModule, SidenavModule, WavesModule } from 'ng-uikit-pro-standard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileDetailsComponent } from './pages/profile/profile-details/profile-details.component';
import { AddSubCategoryComponent } from './models/catalog/category/add-sub-category/add-sub-category.component';
import { AddCategoryListComponent } from './models/catalog/category/add-category-list/add-category-list.component';
import { AddProductComponent } from './models/catalog/add-product/add-product.component';
import { AddTrendComponent } from './models/catalog/add-trend/add-trend.component';
import { AddBrandComponent } from './models/catalog/add-brand/add-brand.component';
import { ProductImageUploadsComponent } from './models/catalog/product-image-uploads/product-image-uploads.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddCouponsComponent } from './models/add-coupons/add-coupons.component';
import { InvoiceComponent } from './models/invoice/invoice.component';
// import { CouponsComponent } from './pages/catalog/pg/product/coupons/coupons.component';
// import { LightBoxModule } from 'ng-uikit-pro-standard'
import {NgxPrintModule} from 'ngx-print';
@NgModule({
  declarations: [PortalComponent, FooterComponent, HeaderComponent, SettingsComponent, SidebarComponent, ProfileDetailsComponent, AddSubCategoryComponent, AddCategoryListComponent, AddProductComponent, AddTrendComponent, AddBrandComponent, ProductImageUploadsComponent,  AddCouponsComponent, InvoiceComponent],
  imports: [
    CommonModule, NgxPrintModule,  
    SidenavModule, NavbarModule, WavesModule, AccordionModule,
    ButtonsModule, CardsModule,
    IconsModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    MDBBootstrapModulesPro.forRoot(), NgxDropzoneModule,
    PortalRoutingModule
  ],
  entryComponents:[
    AddProductComponent, AddCategoryListComponent, AddSubCategoryComponent, AddCouponsComponent
  ]
})
export class PortalModule { }
