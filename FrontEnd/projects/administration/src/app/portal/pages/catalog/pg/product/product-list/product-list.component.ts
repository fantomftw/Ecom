import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { AppComponent } from 'projects/administration/src/app/app.component';
import { AddProductComponent } from 'projects/administration/src/app/portal/models/catalog/add-product/add-product.component';
import { ProductImageUploadsComponent } from 'projects/administration/src/app/portal/models/catalog/product-image-uploads/product-image-uploads.component';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  tableStatus=false;

  elements: any = [
    {
      id: 1,
      first: 'Mark',
      last: 'Otto',
      handle: '@mdo',
      collapsed: true,
      masterDetail: [{ orderId: 1, orderDate: '24-07-1996', adress: '35 King George' }],
    },
    {
      id: 2,
      first: 'Jacob',
      last: 'Thornton',
      handle: '@fat',
      collapsed: false,
      masterDetail: [{ orderId: 2, orderDate: '04-01-1992', adress: 'Obere Str. 57' }],
    },
    {
      id: 3,
      first: 'Larry',
      last: 'the Bird',
      handle: '@twitter',
      collapsed: false,
      masterDetail: [{ orderId: 3, orderDate: '15-01-1994', adress: 'Kirchgasse 6' }],
    },
  ];

  headElements = ['#', 'Name', 'Category', 'Trend', 'Brand', 'Status', 'Action'];
  masterHeadElements = ['sku', 'Size', 'color', 'Mrp', 'Sp', 'Discount', 'Images', 'Status', 'Action'];
  modalRef: MDBModalRef;
  
  constructor(private router:Router, private route:ActivatedRoute, private modalService: MDBModalService, private cdRef: ChangeDetectorRef, private GlobalService:GlobalService, private baseApp : AppComponent){

  }
  ngOnInit(){
    this.getProductList();
  }
  getProductList(){
    this.GlobalService.getAll('catalog/product').subscribe((res)=>{
      console.log(res)
      if(res['success']){
        if(res['product']){
          this.tableStatus=true;
          this.elements=res['product'];
        }
      }else{
          this.tableStatus=false;
        }
    })
  }

  edit(id){
    console.log(id)
    // route.navigate
    this.router.navigate(['/catalog/product/view', id])
  }

  addImages(varientID){
    this.modalRef = this.modalService.show(ProductImageUploadsComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'cascading-modal modal-lg',
      containerClass: '',
      animated: true,
      data: {
        varientId: varientID,
        // subCategoryId : this.subCategoryId
      }
  });

    this.modalRef.content.action.subscribe( (result: any) => { 
      console.log(result); 
      console.log("modal response")
      console.log(result); 
      if(result['success']){
        this.baseApp.showSuccess(result['success_subject'], result['success_message']);
        // console.log(this.getSubCategoryList)
        // this.getSubCategoryList(this.subCategoryId);
      }else{
        console.log();
        if( typeof(result["err_message"])!="string"){
          for(let i=0; i<result['err_message'].length; i++){
            this.baseApp.showError(result['err_subject'], result['err_message'][i]);
          }
        }else{
          this.baseApp.showError(result['err_subject'], result['err_message']);

        }

      }
    });
   }
}
