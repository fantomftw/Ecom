import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { humanizeBytes, UploadFile, UploadInput } from 'ng-uikit-pro-standard';
import { AppComponent } from 'projects/admin/src/app/app.component';
import { environment } from 'projects/shared/src/environments/environment';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';

@Component({
  selector: 'app-restaurant-create',
  templateUrl: './restaurant-create.component.html',
  styleUrls: ['./restaurant-create.component.scss']
})
export class RestaurantCreateComponent implements OnInit {

  heading ="Restaurant Registration";
  restaurantForm: FormGroup;
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

//    showFiles() {
//     let files = '';
//     for (let i = 0; i < this.files.length; i ++) {
//       files += this.files[i].name;
//        if (!(this.files.length - 1 === i)) {
//          files += ',';
//       }
//     }
//     return files;
//  }
//  startUpload(): void {
//   const event: UploadInput = {
//   type: 'uploadAll',
//   url: 'your-path-to-backend-endpoint',
//   method: 'POST',
//   data: { foo: 'bar' },
//   };
//   this.files = [];
//   this.uploadInput.emit(event);
// }

// cancelUpload(id: string): void {
//   this.uploadInput.emit({ type: 'cancel', id: id });
// }

// onUploadOutput(output: UploadOutput | any): void {
// console.log(output.file)
//   if (output.type === 'allAddedToQueue') {
//   } else if (output.type === 'addedToQueue') {
//     this.files.push(output.file); // add file to array when added
//   } else if (output.type === 'uploading') {
//     // update current data in files array for uploading file
//     const index = this.files.findIndex(file => file.id === output.file.id);
//     this.files[index] = output.file;
//   } else if (output.type === 'removed') {
//     // remove file from array when removed
//     this.files = this.files.filter((file: UploadFile) => file !== output.file);
//   } else if (output.type === 'dragOver') {
//     this.dragOver = true;
//   } else if (output.type === 'dragOut') {
//   } else if (output.type === 'drop') {
//     this.dragOver = false;
//   }
//   this.showFiles();
// }
  ngOnInit(): void {
    this.formInitializer();
    this.getCuisineList();
  }

  formInitializer(){
    this.restaurantForm = new FormGroup({
      _id: new FormControl(''),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      item_type: new FormControl('', Validators.required),
      image: new FormControl(''),
      restaurant_name:new FormControl('', Validators.required),
      cuisine: new FormControl('', Validators.required),
      status: new FormControl(''),
      email:new FormControl('', [Validators.required, Validators.email]),
      contact:new FormControl('', [Validators.required])
    });
  }
  
  getCuisineList(){
    this.GlobalService.getAll("menu/cuisine/Active").subscribe((res)=>{
      console.log(res)
      this.cuisineList=res['cuisine']
    })
  }

  get _id() {
    return this.restaurantForm.get('_id');
  }
  get status() {
    return this.restaurantForm.get('status');
  }
  get email() {
    return this.restaurantForm.get('email');
  }
  get contact() {
    return this.restaurantForm.get('contact');
  }
  get name() {
    return this.restaurantForm.get('name');
  }
  get item_type() {
    return this.restaurantForm.get('item_type');
  }
  get restaurant_name(){
    return this.restaurantForm.get('restaurant_name');
  }
  get image() {
    return this.restaurantForm.get('image');
  }
  get description() {
    return this.restaurantForm.get('description');
  }
  get cuisine() {
    return this.restaurantForm.get('cuisine');
  }

  getSelectedValue(value: any) {
    console.log('Selected value:', value);
  }

  getSelectedCuisineValue(value: any) {
    console.log('Selected value:', value);
  }

  getFile2(e){
    console.log(e);
    this.restaurantForm.get('image').setValue(e);
  }
  
  onSubmit(){ 
    console.log(this.restaurantForm.value);
    const formData = new FormData();
      formData.append('_id', this.restaurantForm.get('_id').value);
      formData.append('status', this.restaurantForm.get('status').value);
      formData.append('name',this.restaurantForm.get('name').value);
      formData.append('item_type',this.restaurantForm.get('item_type').value);
      formData.append('restaurant_name', this.restaurantForm.get('restaurant_name').value);
      formData.append('image',this.restaurantForm.get('image').value);
      formData.append('description',this.restaurantForm.get('description').value);
      formData.append('cuisine',this.restaurantForm.get('cuisine').value);
      formData.append('email',this.restaurantForm.get('email').value);
      formData.append('contact',this.restaurantForm.get('contact').value);

    console.log(formData);
    this.GlobalService.PostFormData("restaurant",formData).subscribe(data => {
      if(data['success']){
        console.log(data);
        this.baseApp.showSuccess(data['success_subject'], data['success_message']);
        this.router.navigate(['/restaurant'])
      }else{
        this.baseApp.showError(data['err_subject'], data['err_message']);
      }
    })
  }
}
