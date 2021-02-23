import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';
import { ToastrService } from 'ngx-toastr';
import { string } from 'node_modules1/postcss-selector-parser/postcss-selector-parser';
import { AppComponent } from 'projects/administration/src/app/app.component';
import { AddCategoryListComponent } from 'projects/administration/src/app/portal/models/catalog/category/add-category-list/add-category-list.component';
import { AddSubCategoryComponent } from 'projects/administration/src/app/portal/models/catalog/category/add-sub-category/add-sub-category.component';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private router:Router, private route:ActivatedRoute ,private fb: FormBuilder, private toastr: ToastrService, private modalService: MDBModalService, private GlobalService:GlobalService, private baseApp : AppComponent){
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      subCategoryList: ['', Validators.required],
      brand: ['', Validators.required],
      trend: ['', Validators.required],
      varients: this.fb.array([])
    });
  }




  //Variables to feed the drop down

  categoryId;
  categoryListFeed=[];
  hasCategory=false;
  modalRef: MDBModalRef;

  subCategoryId;
  subCategoryFeed=[];
  showSubCategory=false;
  hasSubCategory=false;

  subCategoryListId;
  subCategoryListFeed=[];
  showSubCategoryList=false;
  hasSubCategoryList=false;

  trendId;
  trendFeed:[];
  hasTrend=false;

  brandId;
  brandFeed:[];
  hasBrand=false;

  
  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    this.getCategory();
    this.getBrand();
    this.getTrend();

    console.log("id --- ", id)
    if(id){
      this.GlobalService.getById('catalog/product',id).subscribe((res)=>{
        let response=res['product'];
        console.log("response ---- ", response)
        console.log(response[0].name)
        this.contactForm.patchValue({
          name:response[0].name,
          title: response[0].title,
        })
        this.categoryId=response[0].category_[0]._id;
        this.subCategoryId=response[0].subCategory_[0]._id;
        this.subCategoryListId=response[0].subCategoryList_[0]._id;
        this.brandId=response[0].brand_[0]._id;
        this.trendId=response[0].trend_[0]._id;
        if(response[0].varients_.length){
          this.pushVarients(response[0].varients_);
        }
      })
    }else{
      this.addVarients();
    }

  }
  
  getCategoryId(value: any) {
    console.log('Category ID:', value);

    this.categoryId=value;
    if(this.hasCategory){
      this.hasCategory=true;
    }

    this.getSubCategory(value);
    this.subCategoryListId;
  }

  getSubCategoryId(value: any) {
    console.log('SubCategory ID:', value);
    this.subCategoryId=value;
    if(this.hasSubCategory){
      this.hasSubCategory=true;
    }
    this.getSubCategoryList(value);
  }
  getSubCategoryListId(value: any) {
    console.log('SubCategoryList ID:', value);
    this.subCategoryListId=value;
  }
  getTrendId(value: any) {
    console.log('Trend ID:', value);
    this.trendId=value;
  }
  getBrandId(value: any) {
    console.log('Brand ID:', value);
    this.brandId=value;
  }

  get name() {
    return this.contactForm.get('name');
  }
  get title() {
    return this.contactForm.get('title');
  }
  get category() {
    return this.contactForm.get('category');
  }
  get subCategory() {
    return this.contactForm.get('subCategory');
  }
  get subCategoryList() {
    return this.contactForm.get('subCategoryList');
  }
  get trend() {
    return this.contactForm.get('trend');
  }
  get brand() {
    return this.contactForm.get('brand');
  }
  get varientsArr(){
    return this.contactForm.get('varients') as FormArray;
  }

  pushVarients(varients){
    console.log('varients ------ ', varients)
    const varientsArr = this.contactForm.controls.varients as FormArray;
    for(var i=0; i<=varients.length; i++){
      varientsArr.push(this.fb.group({
        sku:varients[i].sku,
        size:varients[i].size,
        color:varients[i].color,
        mrp:varients[i].mrp,
        sp:varients[i].sp,
        discount:varients[i].discount
      }))  
    }
  }

  addVarients(){
    const varientsArr = this.contactForm.controls.varients as FormArray;
    varientsArr.push(this.fb.group({
      sku:'',
      size:'',
      color:[],
      mrp:'',
      sp:'',
      discount:''
    }))
  }
  // get point(){
  //   return this.contactForm.get('selling_points');
  // }

  // get sellingPoints() {
  //   return this.contactForm.get('selling_points') as FormArray;
  // }

  // addSellingPoint() {
  //   this.sellingPoints.push(this.fb.group({point:''}));
  // }

  // deleteSellingPoint(index) {
  //   this.sellingPoints.removeAt(index);
  // }


  onSubmit() {
    // console.log('catalog/category/'+this.categoryId, this.contactForm.value);
    this.GlobalService.create('catalog/product/', this.contactForm.value).subscribe((res) => {
      if(res['success']){
        this.contactForm.reset();
        this.baseApp.showSuccess(res['success_subject'], res['success_message']);
      }else{
        console.log(res)
        this.baseApp.showError(res['err_subject'], res['err_message']);
      }
    }, (error: any) => {
      console.log('Model Error', error);
      this.toastr.error('Error', error);
    });
  }

  CancelFunction(){
    
  }

  getCategory(){
    this.GlobalService.getAll("catalog/category/").subscribe((res)=>{
      if(res['success']){
        if(res['category'].length){
          this.showSubCategoryList=false;
          this.categoryListFeed=res['category'];
        }else{
          this.hasCategory=false;
          this.showSubCategoryList=false;
          this.showSubCategory=false;
          this.subCategoryListFeed=[];
          this.categoryListFeed=[];
        }
      }else{
        this.hasCategory=false;
          this.showSubCategoryList=false;
          this.showSubCategory=false;
          this.subCategoryListFeed=[];
          this.subCategoryListFeed=[];
      }
    })
  }

  getSubCategory(id){
    this.GlobalService.getAll("catalog/category/"+id).subscribe((res)=>{
      this.showSubCategory=true;
      this.categoryId=id;
      if(res['success']){
        if(res['subCategory'].length){
          this.subCategoryFeed=res['subCategory']
          console.log(this.subCategoryFeed)
          this.hasSubCategory=true;
        }else{
          this.showSubCategoryList=false;
          this.subCategoryListFeed=[];
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
          this.subCategoryListFeed=res['subCategoryList']
          this.hasSubCategoryList=true;
        }else{
          this.hasSubCategoryList=false;
        }
      }
    })
  }

  getBrand(){
    this.GlobalService.getAll("catalog/brand").subscribe((res)=>{
      if(res['success']){
        console.log("brand ----- ",res['brand'])
        if(res['brand'].length){
          this.brandFeed=res['brand'];
          console.log(this.brandFeed);
          this.hasBrand=true;
        }else{
          console.log("No brand listed")
          this.hasBrand=false;
        }
      }else{
        this.hasBrand=false;
      }
    })
  }

  getTrend(){

    this.GlobalService.getAll("catalog/trend").subscribe((res)=>{
console.log(res)
      if(res['success']){
        if(res['trend'].length){
          this.trendFeed=res['trend'];
          console.log(this.trendFeed);

          this.hasTrend=true;
        }else{
          this.hasTrend=false;
        }
      }else{
        this.hasTrend=false;
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
