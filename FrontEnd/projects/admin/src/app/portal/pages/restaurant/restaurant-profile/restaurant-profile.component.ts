import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { AppComponent } from 'projects/admin/src/app/app.component';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';
import { environment } from 'projects/shared/src/environments/environment';
@Component({
  selector: 'app-restaurant-profile',
  templateUrl: './restaurant-profile.component.html',
  styleUrls: ['./restaurant-profile.component.scss']
})
export class RestaurantProfileComponent implements OnInit {
  heading="Restaurant Profile";
  constructor(private fb: FormBuilder, private route:ActivatedRoute, private baseApp:AppComponent, private router:Router, private GlobalService:GlobalService) { }

  restaurantId;
  restaurantForm:FormGroup;
  baseUrl=environment.baseUrl;
  image;
  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.params.restaurantId;
    $('input').prop('disabled', true)
    
    this.initializingForm();  
    this.getRestaurantById(this.restaurantId);
  }

  initializingForm(){
    this.restaurantForm = this.fb.group({
      _id : [''],
      user_name:['', Validators.required],
      restaurant_name : ['', [Validators.required]],
      cuisine:['',[Validators.required]],
      user_email:['',[Validators.required]],
      user_contact:['',[Validators.required]],
      email:[''],
      contact:[''],
      address:[''],
      city:[''],
      state:[''],
      country:[],
      facebook:[''],
      twitter:[''],
      instagram:[''],
      whatsapp:['']
    })
  }
  
  get _id() {
    return this.restaurantForm.get('_id');
  }
  get restaurant_name(){
    return this.restaurantForm.get('restaurant_name');
  }
  get cuisine(){
    return this.restaurantForm.get('cuisine');
  }
  get user_name(){
    return this.restaurantForm.get('user_name');
  }
  get user_email(){
    return this.restaurantForm.get('user_email');
  }
  get user_contact(){
    return this.restaurantForm.get('user_contact');
  }
  get contact(){
    return this.restaurantForm.get('contact');
  }
  get email(){
    return this.restaurantForm.get('email');
  }
  get city(){
    return this.restaurantForm.get('city');
  }
  get state(){
    return this.restaurantForm.get('state');
  }
  get country(){
    return this.restaurantForm.get('country');
  }
  get facebook(){
    return this.restaurantForm.get('facebook');
  }
  get twitter(){
    return this.restaurantForm.get('twitter');
  }
  get instagram(){
    return this.restaurantForm.get('instagram');
  }
  get whatsapp(){
    return this.restaurantForm.get('whatsapp');
  }
  get address(){
    return this.restaurantForm.get('address');
  }


  getRestaurantById(id){
    if(id){
      this.GlobalService.getById("restaurant", this.restaurantId).subscribe((res)=>{
        if(res['success']){
          let info=res['restaurant'];
          console.log(info)

          this.restaurantForm.patchValue({
            _id: info._id,
            restaurant_name:info.restaurant_name,
            cuisine:info.cuisine_id.name,
            user_name:info.user_id.name,
            user_email:info.user_id.email,
            user_contact:info.user_id.contact,
            email:info.email,
            contact:info.contact,
            address:info.address,
            city:info.city,
            state:info.state,
            country:info.country,
          });
          this.image=this.baseUrl+info.image;
        }else{
          console.log(res);
          this.baseApp.showError(res['err_subject'], res['err_message']);
        }
      })
    }else{
      this.baseApp.showWarning("Error !!","No Restaurant Found to show.")
      this.router.navigate(["/restaurant"]);
    }
  }
}
