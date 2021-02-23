import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-trend',
  templateUrl: './add-trend.component.html',
  styleUrls: ['./add-trend.component.scss']
})
export class AddTrendComponent implements OnInit {

  imageSrc: String;

  action: Subject<any> = new Subject();
  contactForm: FormGroup;

  constructor(fb: FormBuilder, private toastr: ToastrService, private globalService: GlobalService, public modalRef: MDBModalRef) {

  this.contactForm = fb.group({
    'name': ['', Validators.required],
    'title': ['', [Validators.required]],
    'image': ['', [Validators.required]],

    });
  }

  ngOnInit() {
    this.imageSrc="./assets/images/sampleTrendImage.jpg";
  }

  get name() {
    return this.contactForm.get('name');
  }
  get title() {
    return this.contactForm.get('title');
  }
  get image() {
    return this.contactForm.get('image');
  }


  onFileChange(event) {
    console.log(event)
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      if (event.target.files.length > 0) {
        console.log(event.target.files)
        const image = event.target.files[0];
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageSrc = reader.result as string;
          console.log(reader.result)
        };
        this.contactForm.get('image').setValue(image);
        console.log(image)
      }

    }
  } 
 
  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.contactForm.get('name').value);
    formData.append('title', this.contactForm.get('title').value);
    formData.append('image', this.contactForm.get('image').value);

    this.globalService.PostFormData('catalog/trend', formData).subscribe((res) => {
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
