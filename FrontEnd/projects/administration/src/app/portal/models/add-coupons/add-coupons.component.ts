import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-coupons',
  templateUrl: './add-coupons.component.html',
  styleUrls: ['./add-coupons.component.scss']
})
export class AddCouponsComponent implements OnInit {

  @Input() categoryId: string;
  @Input() subCategoryId: string;
  
  title= "Add New Coupon";
  data=[];
  showDropDown=false;
  noData = "No Data Listed";
  action: Subject<any> = new Subject();
  contactForm: FormGroup;

  constructor(fb: FormBuilder, private toastr: ToastrService, private globalService: GlobalService, public modalRef: MDBModalRef) {
    console.log(this.categoryId);
    this.contactForm = fb.group({
      'code': ['', Validators.required],
      'cat': [''],
      'subCat': [''],
      'subCatList': [''],
      'trend': [''],
      'brand': [''],
    });
  }

  ngOnInit() {
  }

  get code() {
    return this.contactForm.get('code');
  }


 
  onSubmit() {
    console.log(this.categoryId, this.categoryId.toString())
    console.log(this.subCategoryId, this.subCategoryId.toString())

  console.log('catalog/category/'+this.categoryId.toString()+'/'+this.subCategoryId.toString(), this.contactForm.value);
    this.globalService.create('catalog/category/'+this.categoryId+'/'+this.subCategoryId, this.contactForm.value).subscribe((res) => {
      if(res['success']){
        this.contactForm.reset();
        this.action.next(res);
        this.modalRef.hide();
      }else{
        console.log(res)
        this.action.next(res);
      }
    }, (error: any) => {
      console.log('Model Error', error);
      this.toastr.error('Error', error);
    });
  }

}
