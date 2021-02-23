import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';
import { string } from 'node_modules1/postcss-selector-parser/postcss-selector-parser';
import { AppComponent } from 'projects/administration/src/app/app.component';
import { AddCategoryListComponent } from 'projects/administration/src/app/portal/models/catalog/category/add-category-list/add-category-list.component';
import { AddSubCategoryComponent } from 'projects/administration/src/app/portal/models/catalog/category/add-sub-category/add-sub-category.component';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {
  
  constructor(private router:Router, private modalService: MDBModalService, private GlobalService:GlobalService, private baseApp : AppComponent){}

  categoryList=[];
  
  hasCategory=false;
  modalRef: MDBModalRef;

  categoryId;
  subCategory=[];
  showSubCategory=false;
  hasSubCategory=false;
  
  subCategoryId;
  subCategoryList=[];
  showSubCategoryList=false;
  hasSubCategoryList=false;

  ngOnInit(){
    this.getCategory();
  }
  getCategory(){
    this.GlobalService.getAll("catalog/category/").subscribe((res)=>{
      if(res['success']){
        if(res['category'].length){
          this.hasCategory=true;
          this.showSubCategoryList=false;
          this.categoryList=res['category'];
        }else{
          this.hasCategory=false;
          this.showSubCategoryList=false;
          this.showSubCategory=false;
          this.subCategoryList=[];
          this.subCategoryList=[];
        }
      }else{
        this.hasCategory=false;
          this.showSubCategoryList=false;
          this.showSubCategory=false;
          this.subCategoryList=[];
          this.subCategoryList=[];
      }
    })
  }

  getSubCategory(id){
    this.GlobalService.getAll("catalog/category/"+id).subscribe((res)=>{
      this.showSubCategory=true;
      this.categoryId=id;
      if(res['success']){
        if(res['subCategory'].length){
          this.subCategory=res['subCategory']
          console.log(this.subCategory)
          this.hasSubCategory=true;
        }else{
          this.hasSubCategory=false;
          this.showSubCategoryList=false;
          this.subCategoryList=[];
        }
      }
    })
  }
  getSubCategoryList(id){
    console.log("Fetching sub category list")
    this.GlobalService.getAll("catalog/category/"+this.categoryId+"/"+id).subscribe((res)=>{
      this.showSubCategoryList=true;
      this.subCategoryId=id;
      if(res['success']){
        if(res['subCategoryList'].length){
          this.subCategoryList=res['subCategoryList']
          this.hasSubCategoryList=true;
        }else{
          this.hasSubCategoryList=false;
        }
      }
    })
  }

  updateCategoryStatus(id){
    this.GlobalService.updateStatus('catalog/category/status/1', id).subscribe((res)=>{
      console.log(res)
      if(res['success']){
        this.baseApp.showSuccess(res['success_subject'], res['success_message']);
        
        // this.getUserList();
      }else{
        this.baseApp.showError(res['err_subject'], res['err_message']);
      }
    })  
  }
  updateSubCategoryStatus(id){
    this.GlobalService.updateStatus('catalog/category/status/2', id).subscribe((res)=>{
      console.log(res)
      if(res['success']){
        this.baseApp.showSuccess(res['success_subject'], res['success_message']);
        
        // this.getUserList();
      }else{
        this.baseApp.showError(res['err_subject'], res['err_message']);
      }
    })  
  }
  updateSubCategoryListStatus(id){
    this.GlobalService.updateStatus('catalog/category/status/3', id).subscribe((res)=>{
      console.log(res)
      if(res['success']){
        this.baseApp.showSuccess(res['success_subject'], res['success_message']);
        
        // this.getUserList();
      }else{
        this.baseApp.showError(res['err_subject'], res['err_message']);
      }
    })  
  }
   openAddSubcategory(){
    this.modalRef = this.modalService.show(AddSubCategoryComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'cascading-modal',
      containerClass: '',
      animated: true,
      data: {
        categoryId : this.categoryId,
        subCategoryId : this.subCategoryId
      }
  });

    this.modalRef.content.action.subscribe( (result: any) => { 
      console.log(result); 
      console.log("modal response")
      console.log(result); 
      if(result['success']){
        this.baseApp.showSuccess(result['success_subject'], result['success_message']);
        this.getSubCategory(this.categoryId);
      }else{
        for(let i=0; i<result['err_message'].length; i++){
          this.baseApp.showError(result['err_subject'], result['err_message'][i]);
        }
      }
    });
   }

   openAddSubcategoryList(){
    this.modalRef = this.modalService.show(AddCategoryListComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'cascading-modal',
      containerClass: '',
      animated: true,
      data: {
        categoryId: this.categoryId,
        subCategoryId : this.subCategoryId
      }
  });

    this.modalRef.content.action.subscribe( (result: any) => { 
      console.log(result); 
      console.log("modal response")
      console.log(result); 
      if(result['success']){
        this.baseApp.showSuccess(result['success_subject'], result['success_message']);
        // console.log(this.getSubCategoryList)
        this.getSubCategoryList(this.subCategoryId);
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
