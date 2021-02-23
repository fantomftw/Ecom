import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { humanizeBytes, UploadFile, UploadInput, UploadOutput } from 'ng-uikit-pro-standard';
import { AppComponent } from 'projects/admin/src/app/app.component';
import { environment } from 'projects/shared/src/environments/environment';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';

@Component({
  selector: 'app-menu-create',
  templateUrl: './menu-create.component.html',
  styleUrls: ['./menu-create.component.scss']
})
export class MenuCreateComponent implements OnInit {
  heading ="Create Menu";
  menuForm: FormGroup;
  buttonName = "Save";

  options = [
    "Veg", "Non-Veg"
  ];

  selectedValue;

  //Image Upload
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  baseUrl = environment.baseUrl;
  imageUrl=this.baseUrl;

  cuisineList :any=[];
  selectedCuisineValue;

  constructor(private GlobalService : GlobalService, private baseApp : AppComponent, private router:Router) {
    this.files = [];
      this.uploadInput = new EventEmitter<UploadInput>();
      this.humanizeBytes = humanizeBytes;
   }


  ngOnInit(): void {
    this.formInitializer();
    this.getCuisineList();
  }

  formInitializer(){
    this.menuForm = new FormGroup({
      _id: new FormControl(''),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      item_type: new FormControl('', Validators.required),
      image: new FormControl(''),
      cuisine: new FormControl('', Validators.required),
      status: new FormControl('')
    });
  }
  
  getCuisineList(){
    this.GlobalService.getAll("menu/cuisine/Active").subscribe((res)=>{
      console.log(res)
      this.cuisineList=res['cuisine']
    })
  }

  get _id() {
    return this.menuForm.get('_id');
  }
  get status() {
    return this.menuForm.get('status');
  }
  get name() {
    return this.menuForm.get('name');
  }
  get item_type() {
    return this.menuForm.get('item_type');
  }
  get image() {
    return this.menuForm.get('image');
  }
  get description() {
    return this.menuForm.get('description');
  }
  get cuisine() {
    return this.menuForm.get('cuisine');
  }

  getSelectedValue(value: any) {
    console.log('Selected value:', value);
  }

  getSelectedCuisineValue(value: any) {
    console.log('Selected value:', value);
  }

  getFile2(e){
    console.log(e);
    this.menuForm.get('image').setValue(e);
  }
  
  onSubmit(){ 
    console.log(this.menuForm.value);
    const formData = new FormData();
      formData.append('_id', this.menuForm.get('_id').value);
      formData.append('status', this.menuForm.get('status').value);
      formData.append('name',this.menuForm.get('name').value);
      formData.append('item_type',this.menuForm.get('item_type').value);
      formData.append('image',this.menuForm.get('image').value);
      formData.append('description',this.menuForm.get('description').value);
      formData.append('cuisine',this.menuForm.get('cuisine').value);

    console.log(formData);
    this.GlobalService.PostFormData("menu/item",formData).subscribe(data => {
      if(data['success']){
        console.log(data);
        this.baseApp.showSuccess(data['success_subject'], data['success_message']);
        this.router.navigate(['/menu/item'])
      }else{
        this.baseApp.showError(data['err_subject'], data['err_message']);
      }
    })
  }
}