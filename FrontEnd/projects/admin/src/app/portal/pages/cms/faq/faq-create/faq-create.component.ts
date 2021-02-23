import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'projects/admin/src/app/app.component';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';

@Component({
  selector: 'app-faq-create',
  templateUrl: './faq-create.component.html',
  styleUrls: ['./faq-create.component.scss']
})
export class FaqCreateComponent implements OnInit {

  heading = "Add FAQ"
  faqForm: FormGroup;
  buttonName = "Save";

  constructor(private GlobalService : GlobalService, private baseApp : AppComponent, private router:Router) { }

  ngOnInit(): void {
    this.formInitializer();
  }

  formInitializer(){
    this.faqForm=new FormGroup({
      _id: new FormControl(''),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })
  }

  get _id() {
    return this.faqForm.get('_id');
  }
  get name() {
    return this.faqForm.get('name');
  }
  get description() {
    return this.faqForm.get('description');
  }

  onSubmit(){
    console.log(this.faqForm.value);
    this.GlobalService.create("cms/faq", this.faqForm.value).subscribe((data)=>{
      console.log(data)
      if(data['success']){
        this.baseApp.showSuccess(data['success_subject'], data['success_message']);
        this.router.navigate(['/cms/faq'])
      }else{
        this.baseApp.showError(data['err_subject'], data['err_message']);
      }
    })
  }
}
