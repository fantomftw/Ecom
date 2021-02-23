import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'projects/admin/src/app/app.component';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  heading = "About us";
  buttonName = "Save";
  //Declaring Variables
  contactUsForm : FormGroup;
  
  constructor(private fb : FormBuilder, private route: ActivatedRoute, private router:Router, private baseApp:AppComponent, private GlobalService : GlobalService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getContactUs();
  }

  initializeForm(){
    this.contactUsForm = this.fb.group({
      _id:[''],
      address:['', Validators.required],
      email:['', (Validators.required, Validators.email)],
      contact:[''],
      mobile:['', (Validators.required, Validators.length[10])],
      facebook:[''],
      google:[''],
      twitter:[''],
      linkedin:[''],
      telegram:[''],
      instagram:[''],
    })
  }

  get _id(){
    return this.contactUsForm.get('_id')
  }
  get email(){
    return this.contactUsForm.get('email')
  }
  get address(){
    return this.contactUsForm.get('address')
  }
  get contact(){
    return this.contactUsForm.get('contact')
  }
  get mobile(){
    return this.contactUsForm.get('mobile')
  }
  get facebook(){
    return this.contactUsForm.get('facebook')
  }
  get twitter(){
    return this.contactUsForm.get('twitter')
  }
  get telegram(){
    return this.contactUsForm.get('telegram')
  }
  get google(){
    return this.contactUsForm.get('google')
  }  
  get instagram(){
    return this.contactUsForm.get('google')
  }

  getContactUs(){
    this.GlobalService.getAll("cms/contact-us").subscribe((res)=>{
      if(res['success']){
        let contactus = res['contactus'][0];
        this.contactUsForm.patchValue({
          address : contactus.address,
          email : contactus.email,
          mobile : contactus.mobile,
          contact : contactus.contact,
          facebook : contactus.facebook,
          google : contactus.google,
          twitter : contactus.twitter,
          linkedin : contactus.linkedin,
          telegram : contactus.telegram,
          _id : contactus._id
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
    if(this.contactUsForm.value._id){
      console.log("updating about us content");
      console.log(this.contactUsForm.value)
      this.GlobalService.update('cms/contact-us',this.contactUsForm.value._id,this.contactUsForm.value).subscribe((res)=>{
        console.log(res)
        if(res['success']){
          this.baseApp.showSuccess(res['success_subject'], res['success_message']);
          this.router.navigate(['/cms/contact-us']);
        }else{
          for(let i=0; i<res['err_message'].lenght; i++){
            this.baseApp.showError(res['error_subject'], res['error_message'][i])
          }
        }
      })
    }else{
      console.log("creating about us content");
      console.log(this.contactUsForm.value);
      this.GlobalService.create('cms/contact-us',this.contactUsForm.value).subscribe((res)=>{
        console.log(res)
        if(res['success']){
          console.log("Contact us stored successfully")
          this.baseApp.showSuccess(res['success_subject'], res['success_message']);
          this.router.navigate(['/cms/contact-us']);
        }else{
          for(let i=0; i<res['err_message'].lenght; i++){
            this.baseApp.showError(res['error_subject'], res['error_message'][i])
          }
        }
      })
    }
  }
}
