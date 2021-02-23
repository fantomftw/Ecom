import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'projects/admin/src/app/app.component';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit {

  heading = "SMS Settings";
  buttonName = "Save";
  //Declaring Variables
  smsForm : FormGroup;
  
  constructor(private fb : FormBuilder, private route: ActivatedRoute, private router:Router, private baseApp:AppComponent, private GlobalService : GlobalService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getContactUs();
  }

  initializeForm(){
    this.smsForm = this.fb.group({
      _id:[''],
      username:['', Validators.required],
      password:['', Validators.required],
      countryCode:['', Validators.required],
      from:['', Validators.required],
      
    })
  }

  get _id(){
    return this.smsForm.get('_id')
  }
  get username(){
    return this.smsForm.get('username')
  }
  get password(){
    return this.smsForm.get('password')
  }
  get countryCode(){
    return this.smsForm.get('countryCode')
  }
  get from(){
    return this.smsForm.get('from')
  }

  getContactUs(){

    this.GlobalService.getAll("cms/sms").subscribe((res)=>{
      if(res['success']){
        let contactus = res['sms'][0];
        this.smsForm.patchValue({
          username : contactus.username,
          password : contactus.password,
          countryCode : contactus.countryCode,
          from : contactus.from,
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
    if(this.smsForm.value._id){
      console.log("updating about us content");
      console.log(this.smsForm.value)
      this.GlobalService.update('cms/sms',this.smsForm.value._id,this.smsForm.value).subscribe((res)=>{
        console.log(res)
        if(res['success']){
          this.baseApp.showSuccess(res['success_subject'], res['success_message']);
          this.router.navigate(['/cms/sms']);
        }
        else
        {
          for(let i=0; i<res['err_message'].lenght; i++){
            this.baseApp.showError(res['error_subject'], res['error_message'][i])
          }
        }
      })
    }
    else
    {
      console.log("creating about us content");
      console.log(this.smsForm.value);
      this.GlobalService.create('cms/sms',this.smsForm.value).subscribe((res)=>{
        console.log(res)
        if(res['success']){
          console.log("Contact us stored successfully")
          this.baseApp.showSuccess(res['success_subject'], res['success_message']);
          this.router.navigate(['/cms/sms']);
        }
        else
        {
          for(let i=0; i<res['err_message'].lenght; i++){
            this.baseApp.showError(res['error_subject'], res['error_message'][i])
          }
        }
      })
    }

  }

}
