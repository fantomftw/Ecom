import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { ProductListComponent } from './pg/product/product-list/product-list.component';
import { ProductCategoriesComponent } from './pg/product/product-categories/product-categories.component';
import { ProductBrandComponent } from './pg/product/product-brand/product-brand.component';
import { RatingReviewComponent } from './pg/product/rating-review/rating-review.component';
// import { CouponsComponent } from './pg/product/coupons/coupons.component';
import { ImportsComponent } from './pg/product/imports/imports.component';
import { ButtonsModule, CardsModule, FileInputModule, IconsModule, InputsModule, MDBBootstrapModulesPro, MdbSelectModule, ModalModule, PopoverModule, TableModule, TooltipModule, WavesModule } from 'ng-uikit-pro-standard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NewProductComponent } from './pg/product/new-product/new-product.component';
import { TrendListComponent } from './pg/product/trend-list/trend-list.component';
import { CouponListComponent } from './pg/product/coupon-list/coupon-list.component';


@NgModule({
  declarations: [CatalogComponent, ProductListComponent, ProductCategoriesComponent, ProductBrandComponent, RatingReviewComponent, ImportsComponent, NewProductComponent, TrendListComponent, CouponListComponent],
  imports: [
    CommonModule,
    ButtonsModule, WavesModule, CardsModule, MdbSelectModule,
    FormsModule, HttpClientModule, ReactiveFormsModule, FileInputModule,
    IconsModule, TableModule, ModalModule, TooltipModule, PopoverModule, InputsModule, NgxDropzoneModule,
    MDBBootstrapModulesPro.forRoot(),
    CatalogRoutingModule
  ]
})
export class CatalogModule { }
