import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategoryComponent implements OnInit {
  @Input() categoryId: string;

  action: Subject<any> = new Subject();
  contactForm: FormGroup;

  constructor(fb: FormBuilder, private toastr: ToastrService, private globalService: GlobalService, public modalRef: MDBModalRef) {
    console.log(this.categoryId);
  this.contactForm = fb.group({
    'name': ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  get name() {
    return this.contactForm.get('name');
  }
 
  onSubmit() {
    console.log('catalog/category/'+this.categoryId, this.contactForm.value);
    this.globalService.create('catalog/category/'+this.categoryId, this.contactForm.value).subscribe((res) => {
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
