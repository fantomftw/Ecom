import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-restaurant-menu',
  templateUrl: './modal-restaurant-menu.component.html',
  styleUrls: ['./modal-restaurant-menu.component.scss']
})
export class ModalRestaurantMenuComponent implements OnInit {

  heading: string = "Add Construction Type";
  id:any;
  //Get restaurantId parameter by menu page
  restaurantId:string;
  // description: string;
  action: Subject<any> = new Subject();
  constructor(public modalRef: MDBModalRef, private GlobalService:GlobalService,  private toastr: ToastrService) {}

  ngOnInit(): void {
    this.formInitializer();
    console.log(this.restaurantId);

    if(this.id){
      this.getZoneById(this.id);
    }
  }

  menuForm: FormGroup;

  formInitializer(){
    this.menuForm = new FormGroup({
      _id: new FormControl(''),
      name: new FormControl('', Validators.required),
      status: new FormControl('')
    });
  }

  get _id() {
    return this.menuForm.get('_id');
  }
  get status() {
    return this.menuForm.get('status');
  }
  get name() {
    return this.menuForm.get('name');
  }

  getZoneById(id){
    this.GlobalService.getById('restaurant/menu',id).subscribe((res)=>{
      if(res['success']){
        let menu = res['menu']
        console.log(res);
        this.menuForm.patchValue({
          name:menu.name ,
          status:menu.status,
          _id:menu._id
        });
      }else{
        console.log(res);
      }
    })
  }
  onSubmit(){
    console.log(this.menuForm.value)
    if(!this.menuForm.value._id){
      this.GlobalService.create('menu/'+this.restaurantId, this.menuForm.value).subscribe((res)=>{
        console.log(res);
        if(res['success']==true){
          this.toastr.success(res['success_subject'], res['success_message']);
          this.action.next(true);
          this.modalRef.hide();
        }else{
          console.log(res['err_message'].length);
          for(let i=0; i<res['err_message'].length; i++){
            this.toastr.error(res['err_subject'], res['err_message'][i]);
          }
        }
      })
    }else{
      console.log("pushing update code");
      this.GlobalService.update('menu', this.menuForm.value._id, this.menuForm.value).subscribe((res)=>{
        console.log(res)
        if(res['success']==true){
          this.toastr.success(res['success_subject'], res['success_message']);
          this.action.next(true);
          this.modalRef.hide();
        }else{
          // console.log(res['err_message'].length)
          // for(let i=0; i<res['err_message'].length; i++){
            this.toastr.error(res['err_subject'], res['err_message']);
          // }
        }
      })
    }
  }
}