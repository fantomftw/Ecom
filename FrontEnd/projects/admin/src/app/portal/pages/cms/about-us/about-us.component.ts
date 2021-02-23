import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'projects/admin/src/app/app.component';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '5000',
      minHeight: '5000',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Write something about your Project...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    // uploadUrl: 'v1/image',
    // uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'subscript',
        'superscript',
      ],
      [
        'backgroundColor',
        'customClasses',
        'insertVideo',
        'removeFormat',
        'insertImage',
      ]
    ]
};

  heading = "About us";
  buttonName = "Save";
  //Declaring Variables
  aboutUsForm : FormGroup;


  constructor(private fb : FormBuilder, private route: ActivatedRoute, private router:Router, private baseApp:AppComponent, private GlobalService : GlobalService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getAboutUs();
  }

  initializeForm(){
    this.aboutUsForm = this.fb.group({
      _id:[''],
      description:['', Validators.required],
      
      
    })
  }

  get _id(){
    return this.aboutUsForm.get('_id')
  }
  get description(){
    return this.aboutUsForm.get('description')
  }

  getAboutUs(){
    this.GlobalService.getAll("cms/about-us").subscribe((res)=>{
      if(res['success']){
        let aboutus = res['aboutus'][0];
        this.aboutUsForm.patchValue({
          description : aboutus.description,
          _id : aboutus._id
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
    if(this.aboutUsForm.value._id){
      console.log("updating about us content");
      console.log(this.aboutUsForm.value)
      this.GlobalService.update('cms/about-us',this.aboutUsForm.value._id,this.aboutUsForm.value).subscribe((res)=>{
        console.log(res)
        if(res['success']){
          this.baseApp.showSuccess(res['success_subject'], res['success_message']);
          this.router.navigate(['/cms/about-us']);
        }else{
          for(let i=0; i<res['err_message'].lenght; i++){
            this.baseApp.showError(res['error_subject'], res['error_message'][i])
          }
        }
      })
    }else{
      console.log("creating about us content");
      console.log(this.aboutUsForm.value);
      this.GlobalService.create('cms/about-us',this.aboutUsForm.value).subscribe((res)=>{
        console.log(res)
        if(res['success']){
          console.log("About us stored successfully")
          this.baseApp.showSuccess(res['success_subject'], res['success_message']);
          this.router.navigate(['/cms/about-us']);
        }else{
          for(let i=0; i<res['err_message'].lenght; i++){
            this.baseApp.showError(res['error_subject'], res['error_message'][i])
          }
        }
      })
    }
  }
}
