import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  heading: string = "Add User/Employee";
  id:any;

  //Drop down list variables
  roleList:any;

  selectedRoleValue;

  userForm: FormGroup;

  getSelectedRoleValue(value: any) {
    console.log('Selected Role value:', value);
  }

  constructor(private GlobalService:GlobalService,  private toastr: ToastrService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.formInitializer();
    console.log(this.heading);
    //  console.log(this.description);
    console.log(this.id);
    if(this.id){
      this.getUserById(this.id);
    }
    this.getRoleList();
  }

  formInitializer(){
    this.userForm = new FormGroup({
      _id: new FormControl(''),
      name: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      roles: new FormControl('', Validators.required),
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
  
  get contact() {
    return this.userForm.get('contact');
  }
  
  get email() {
    return this.userForm.get('email');
  }
  
  get roles(){
    return this.userForm.get('roles');
  }
  
  getRoleList(){
    this.GlobalService.getAll('role/admin').subscribe((res)=>{
      console.log(res);
      this.roleList=res['roles']  
      // console.log(this.roleList)
    })
  }
  
  getUserById(id){
    this.GlobalService.getById('user',id).subscribe((res)=>{
      if(res['success']){
        let user = res['user']
        console.log(res);
        this.userForm.patchValue({
          name:user.name ,
          zone: user.code,
          contact: user.contact,
          email: user.email,
          roles: user.roles,
          status:user.status,
          _id:user._id
        });
        this.selectedRoleValue=user.roles;
      }else{
        console.log(res);
      }
    })
  }

  onSubmit(){
    console.log(this.userForm.value)
    if(!this.userForm.value._id){
      this.GlobalService.create('user/signup', this.userForm.value).subscribe((res)=>{
        console.log(res)
        if(res['success']==true){
          this.toastr.success(res['success_subject'], res['success_message']);
          this.router.navigate(['user']);
          // this.action.next(true);
          // this.modalRef.hide();
        }else{
          console.log(res['err_message'].length)
          for(let i=0; i<res['err_message'].length; i++){
            this.toastr.error(res['err_subject'], res['err_message'][i]);
          }
        }
      })
    }else{
      console.log("pushing update code");
      this.GlobalService.update('user', this.userForm.value._id, this.userForm.value).subscribe((res)=>{
        console.log(res)
        if(res['success']==true){
          this.toastr.success(res['success_subject'], res['success_message']);
          this.router.navigate(['user']);
          // this.action.next(true);
          // this.modalRef.hide();
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
