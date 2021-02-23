import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  id;
  userForm: FormGroup;
  profileInfo:any={};

  constructor(private route:ActivatedRoute, private GlobalService : GlobalService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params.id;
    this.formInitializer();
    this.GetUserById(this.id)
  }
  GetUserById(id){
    this.GlobalService.getById('user',id).subscribe((res)=>{
      if(res['success']){
        let user = res['user']
        this.profileInfo=res['user']
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
      }else{
        console.log(res);
      }
    })
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
}
