import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'projects/admin/src/app/app.component';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';

@Component({
  selector: 'app-app-links',
  templateUrl: './app-links.component.html',
  styleUrls: ['./app-links.component.scss']
})
export class AppLinksComponent implements OnInit {

 
  heading = "Application Links";
  buttonName = "Save";
  //Declaring Variables
  appLinksForm : FormGroup;
  
  constructor(private fb : FormBuilder, private route: ActivatedRoute, private router:Router, private baseApp:AppComponent, private GlobalService : GlobalService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getappLinks();
  }

  initializeForm(){
    this.appLinksForm = this.fb.group({
      _id:[''],
      android_admin:['', Validators.required],
      android_vendor:['', Validators.required],
      android_user:['', Validators.required],
      ios_admin:['', Validators.required],
      ios_vendor:['', Validators.required],
      ios_user:['', Validators.required],
    })
  }

  get _id(){
    return this.appLinksForm.get('_id')
  }
  get android_admin(){
    return this.appLinksForm.get('android_admin')
  }
  get android_vendor(){
    return this.appLinksForm.get('android_vendor')
  }
  get android_user(){
    return this.appLinksForm.get('android_user')
  }
  get ios_admin(){
    return this.appLinksForm.get('ios_admin')
  }
  get ios_vendor(){
    return this.appLinksForm.get('ios_vendor')
  }
  get ios_user(){
    return this.appLinksForm.get('ios_user')
  }


  getappLinks(){
    this.GlobalService.getAll("cms/appStoreLink").subscribe((res)=>{
      console.log(res)
      if(res['success']){
        let appLinks = res['appStoreLinks'][0];
        this.appLinksForm.patchValue({
          android_admin : appLinks.android_admin,
          android_user : appLinks.android_user,
          android_vendor : appLinks.android_vendor,
          ios_admin : appLinks.ios_admin,
          ios_user : appLinks.ios_user,
          ios_vendor : appLinks.ios_vendor,
          _id : appLinks._id
        })
        this.buttonName="Update";
      }else{
        console.log("no data found");
        this.buttonName="Save";
      }
    })

  }

  onSubmmit(){
    console.log("Processing Submit");
    console.log(this.appLinksForm.value);
    if(this.appLinksForm.value._id){
      console.log("updating about us content");
      console.log(this.appLinksForm.value)
      this.GlobalService.update('cms/appStoreLink',this.appLinksForm.value._id,this.appLinksForm.value).subscribe((res)=>{
        console.log(res)
        if(res['success']){
          this.baseApp.showSuccess(res['success_subject'], res['success_message']);
          this.router.navigate(['/cms/appLinks']);
        }else{
          for(let i=0; i<res['err_message'].lenght; i++){
            this.baseApp.showError(res['error_subject'], res['error_message'][i])
          }
        }
      })
    }else{
      console.log("creating about us content");
      console.log(this.appLinksForm.value);
      this.GlobalService.create('cms/appStoreLink',this.appLinksForm.value).subscribe((res)=>{
        console.log(res)
        if(res['success']){
          console.log("Contact us stored successfully")
          this.baseApp.showSuccess(res['success_subject'], res['success_message']);
          this.router.navigate(['/cms/appLinks']);
        }else{
          for(let i=0; i<res['err_message'].lenght; i++){
            this.baseApp.showError(res['error_subject'], res['error_message'][i])
          }
        }
      })
    }
  }

}
