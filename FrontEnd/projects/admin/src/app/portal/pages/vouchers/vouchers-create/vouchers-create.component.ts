import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';
import { IMyOptions } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-vouchers-create',
  templateUrl: './vouchers-create.component.html',
  styleUrls: ['./vouchers-create.component.scss']
})
export class VouchersCreateComponent implements OnInit {
  heading: string = "Add User/Employee";
  id:any;
  model;

  //Drop down list variables
  restaurantList:any;

  selectedRestaurantValue;

  userForm: FormGroup;

  getSelectedRestaurantValue(value: any) {
    console.log('Selected Restaurant value:', value);
  }

  public myDatePickerOptions: IMyOptions = {
    // Your options
  };

  constructor(private GlobalService:GlobalService,  private toastr: ToastrService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.formInitializer();
    console.log(this.heading);
    //  console.log(this.description);
    console.log(this.id);
    if(this.id){
      this.getUserById(this.id);
    }
    this.getRestaurantList();
  }

  formInitializer(){
    this.userForm = new FormGroup({
      _id: new FormControl(''),
      code: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      startOn: new FormControl('', Validators.required),
      endsOn: new FormControl('', Validators.required),
      status: new FormControl(''),
      maxReedemAmt: new FormControl(''),
      minCartValue: new FormControl(''),
      value: new FormControl(''),
      isAllVendor: new FormControl(''),
      voucherScope: new FormControl(''),
      restaurant_id:new FormControl('')
    });
  }
  
  get _id() {
    return this.userForm.get('_id');
  }
  get status() {
    return this.userForm.get('status');
  }
  get code() {
    return this.userForm.get('code');
  }
  
  get description() {
    return this.userForm.get('description');
  }
  
  get startOn() {
    return this.userForm.get('startOn');
  }
  
  get maxReedemAmt(){
    return this.userForm.get('maxReedemAmt');
  }
  get minCartValue(){
    return this.userForm.get('minCartValue');
  }
  get value(){
    return this.userForm.get('value');
  }
  get isAllVendor(){
    return this.userForm.get('isAllVendor');
  }
  get voucherScope(){
    return this.userForm.get('voucherScope');
  }
  get restaurant_id(){
    return this.userForm.get('restaurant_id');
  }
  
  getRestaurantList(){
    this.GlobalService.getAll('restaurant').subscribe((res)=>{
      this.restaurantList=res['restaurant']  

      console.log(this.restaurantList)
    })
  }
  
  getUserById(id){
    this.GlobalService.getById('user',id).subscribe((res)=>{
      if(res['success']){
        let user = res['user']
        console.log(res);
        this.userForm.patchValue({
          code:user.name ,
          zone: user.code,
          contact: user.contact,
          email: user.email,
          roles: user.roles,
          status:user.status,
          _id:user._id
        });
        this.selectedRestaurantValue=user.roles;
      }else{
        console.log(res);
      }
    })
  }

  onSubmit(){
    console.log(this.userForm.value)
    if(!this.userForm.value._id){
      this.GlobalService.create('vouchers', this.userForm.value).subscribe((res)=>{
        console.log(res)
        if(res['success']==true){
          this.toastr.success(res['success_subject'], res['success_message']);
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
      this.GlobalService.update('vouchers', this.userForm.value._id, this.userForm.value).subscribe((res)=>{
        console.log(res)
        if(res['success']==true){
          this.toastr.success(res['success_subject'], res['success_message']);
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
