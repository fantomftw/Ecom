import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  action: Subject<any> = new Subject();
  contactForm: FormGroup;
  disabledSubmitButton: boolean = true;
  retailerTypeList: Array<any>;

  trendFeed = [];
  brandFeed = [];
  categoryFeed = [];
  subCategoryFeed = [];
  subCategoryListFeed = [];


  selectedTrendValue;
  selectedBrandValue;
  selectedCategoryValue;
  selectedSubCategoryValue ;
  selectedSubCategoryListValue;
  
  getSelectedTrendValue(value: any) {
    console.log('Selected trend value:', value);
  }
  getSelectedBrandValue(value: any) {
    console.log('Selected trend value:', value);
  }
  getSelectedCategoryValue(value: any) {
    console.log('Selected category value:', value);
    this.selectedCategoryValue=value;
    this.getSubCategoryFeed(value);
  }
  getSelectedSubCategoryValue(value: any) {
    console.log('Selected SubCategory value:', value);
    this.selectedSubCategoryValue=value;
    this.getSubCategoryListFeed(value)
  }
  getSelectedSubCategoryListValue(value: any) {
    console.log('Selected subCategory List value:', value);
  }
  @HostListener('input') oninput() {

    if (this.contactForm.valid) {
      this.disabledSubmitButton = false;
    }
  }

  constructor(fb: FormBuilder, private toastr: ToastrService, private globalService: GlobalService, public modalRef: MDBModalRef) {

  this.contactForm = fb.group({
    'name': ['', Validators.required],
    'title': ['', [Validators.required]],
    'trend':['', Validators.required],
    'brand':['', Validators.required],
    'category': ['', [Validators.required]],
    'subCategory': ['', [Validators.required]],
    'subCategoryList': ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getCategoryFeed();
    this.getBrandFeed();
    this.getTrendFeed();
  }

  get name() {
    return this.contactForm.get('name');
  }
  get title() {
    return this.contactForm.get('title');
  }
  get trend() {
    return this.contactForm.get('trend');
  }
  get brand() {
    return this.contactForm.get('brand');
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
 

  onSubmit() {
    console.log(this.contactForm.value)
    this.globalService.create('catalog/product', this.contactForm.value).subscribe((res) => {
      if(res['success']){
        console.log(res)
        this.action.next(res);
        this.modalRef.hide();
      }else{
        console.log(res)
        this.action.next(res);
      }
      // alert('Your message has been sent.');
      this.contactForm.reset();
      this.disabledSubmitButton = true;
    }, (error: any) => {
      console.log('Model Error', error);
      this.toastr.error('Error', error);
    });
  }

  getCategoryFeed(){
    this.globalService.getAll('catalog/category/list').subscribe((res)=>{
     console.log(res)
      if(res['success']){
        console.log(res['category']);
        this.categoryFeed=res['category']      }
    })
  }
  getSubCategoryFeed(id){
    this.globalService.getAll('catalog/category/list/'+this.selectedCategoryValue).subscribe((res)=>{
      console.log(res)
      if(res['success']){
        console.log(res['subCategory']);
        this.subCategoryFeed=res['subCategory']      }
    })
  }
  getSubCategoryListFeed(id){
    this.globalService.getAll('catalog/category/list/'+this.selectedCategoryValue+'/'+this.selectedSubCategoryValue).subscribe((res)=>{
      console.log(res)
      if(res['success']){
        console.log(res['subCategoryList']);
        this.subCategoryListFeed=res['subCategoryList']      }
    })
  }
  getBrandFeed(){
    this.globalService.getAll('catalog/brand').subscribe((res)=>{
      console.log(res)
      if(res['success']){
        console.log(res['brand']);
        this.brandFeed=res['brand']      }
    })
  }
  getTrendFeed(){
    this.globalService.getAll('catalog/trend').subscribe((res)=>{
      console.log(res)
      if(res['success']){
        console.log(res['trend']);
        this.trendFeed=res['trend']      }
    })
  }
}
