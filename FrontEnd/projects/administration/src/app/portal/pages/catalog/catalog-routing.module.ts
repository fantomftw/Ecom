import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogComponent } from './catalog.component';
import { CouponListComponent } from './pg/product/coupon-list/coupon-list.component';
import { ImportsComponent } from './pg/product/imports/imports.component';
import { NewProductComponent } from './pg/product/new-product/new-product.component';
import { ProductBrandComponent } from './pg/product/product-brand/product-brand.component';
import { ProductCategoriesComponent } from './pg/product/product-categories/product-categories.component';
import { ProductListComponent } from './pg/product/product-list/product-list.component';
import { RatingReviewComponent } from './pg/product/rating-review/rating-review.component';
import { TrendListComponent } from './pg/product/trend-list/trend-list.component';

const routes: Routes = [
  {
    path:'', component:CatalogComponent, children:[
      { 
        path: 'product', children:[
          {
            path : '', redirectTo:'list'
          },
          {
            path:'list', component: ProductListComponent
          },
          {
            path:'view/:id', component:NewProductComponent
          },
          {
            path:'new', component:NewProductComponent
          }
        ]
      },
      {
        path:'categories', children:[
          {
            path:'', redirectTo:'list'
          },
          {
            path:'list', component:ProductCategoriesComponent
          }
        ]
      },
      {
        path:'brand', children:[
          {
            path:'', redirectTo:'list'
          },
          {
            path:'list', component:ProductBrandComponent
          }
        ]
      },
      {
        path:'trend', children:[
          {
            path:'', redirectTo:'list'
          },
          {
            path:'list', component:TrendListComponent
          }
        ]
      },
      {
        path:'rating_review', children:[
          {
            path:'', redirectTo:'list'
          },
          {
            path:'list', component:RatingReviewComponent
          }
        ]
      },
      {
        path:'coupons', children:[
          {
            path:'', redirectTo:'list'
          },
          {
            path:'list', component:CouponListComponent
          }
        ]
      },
      {
        path:'import', children:[
          {
            path:'', component:ImportsComponent
          }
        ]
      },
    ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
