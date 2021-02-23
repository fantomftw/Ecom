import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-image-uploads',
  templateUrl: './product-image-uploads.component.html',
  styleUrls: ['./product-image-uploads.component.scss']
})
export class ProductImageUploadsComponent implements OnInit {
  @Input() varientId: string;
  files: File[] = [];

  action: Subject<any> = new Subject();
  contactForm: FormGroup;

  constructor(fb: FormBuilder, private toastr: ToastrService, private globalService: GlobalService, public modalRef: MDBModalRef) {
    console.log(this.varientId);
    // this.contactForm = fb.group({
    //   'bulkUpload': ['', Validators.required],
    // });
  }

  ngOnInit() {
  }

  // get bulkUpload() {
  //   return this.contactForm.get('bulkUpload');
  // }
 
  onSubmit() {
    const formData = new FormData();
    console.log("images 0", this.files)
    
    for(var i=0; i<=this.files.length-1;i++){
      formData.append('images['+i+']', this.files[i]);      
    }

    // this.files.map((item) => {
    //     console.log("ITEM----------", item['path'])
    //     formData.append("images", { uri: item['uri'], name: item['fileName'], type: item['type'], path: item['path'] })
    // })

    console.log('/catalog/p_varients/'+this.varientId, formData);
    this.globalService.create('catalog/p_varients/'+this.varientId, formData).subscribe((res) => {
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

  onSelect(event) {
    console.log("event ... ",event);
    console.log('file push')
    this.files.push(...event.addedFiles);
  }

   
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }


 
}
