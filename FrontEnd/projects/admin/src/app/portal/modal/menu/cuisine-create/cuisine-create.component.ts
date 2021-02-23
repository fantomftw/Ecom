import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cuisine-create',
  templateUrl: './cuisine-create.component.html',
  styleUrls: ['./cuisine-create.component.scss']
})
export class CuisineCreateComponent implements OnInit {

  heading: string = "Add Cuisine";
  id:any;

  // description: string;
  action: Subject<any> = new Subject();
  constructor(public modalRef: MDBModalRef, private GlobalService:GlobalService,  private toastr: ToastrService) {}

  ngOnInit(): void {
    this.formInitializer();
    console.log(this.heading);
    //  console.log(this.description);
    console.log(this.id);
    if(this.id){
      this.getUserById(this.id);
    }

  }

  userForm: FormGroup;

  formInitializer(){
    this.userForm = new FormGroup({
      _id: new FormControl(''),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      status: new FormControl('')
    });
  }

  get _id() {
    return this.userForm.get('_id');
  }
  get status() {
    return this.userForm.get('status');
  }
  get name() {
    return this.userForm.get('name');
  }

  get description() {
    return this.userForm.get('description');
  }


  getUserById(id){
    this.GlobalService.getById('menu/cuisine',id).subscribe((res)=>{
      if(res['success']){
        let user = res['cuisine']
        console.log(res);
        this.userForm.patchValue({
          name:user.name ,
          description: user.description,
          status:user.status,
          _id:user._id
        });
      }else{
        console.log(res);
      }
    })
  }
  onSubmit(){
    console.log(this.userForm.value)
    if(!this.userForm.value._id){
      this.GlobalService.create('menu/cuisine', this.userForm.value).subscribe((res)=>{
        console.log(res)
        if(res['success']==true){
          this.toastr.success(res['success_subject'], res['success_message']);
          this.action.next(true);
          this.modalRef.hide();
        }else{
          console.log(res['err_message'].length)
          for(let i=0; i<res['err_message'].length; i++){
            this.toastr.error(res['err_subject'], res['err_message'][i]);
          }
        }
      })
    }else{
      console.log("pushing update code");
      this.GlobalService.update('menu/cuisine', this.userForm.value._id, this.userForm.value).subscribe((res)=>{
        console.log(res)
        if(res['success']==true){
          this.toastr.success(res['success_subject'], res['success_message']);
          this.action.next(true);
          this.modalRef.hide();
        }else{
          console.log(res['err_message'].length)
          for(let i=0; i<res['err_message'].length; i++){
            this.toastr.error(res['err_subject'], res['err_message']);
          }
        }
      })
    }

  }

}
