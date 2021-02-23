import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverModule } from 'ng-uikit-pro-standard';
import { AppComponent } from 'projects/admin/src/app/app.component';
import { environment } from 'projects/shared/src/environments/environment';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';

@Component({
  selector: 'app-add-restaurant-item',
  templateUrl: './add-restaurant-item.component.html',
  styleUrls: ['./add-restaurant-item.component.scss']
})
export class AddRestaurantItemComponent implements OnInit {

  heading;
  restaurantId;
  menuId;
  itemId;


  baseUrl = environment.baseUrl;
  imagePath;
  menuItemId;

  productForm: FormGroup;
  
  cuisineList:any=[];
  selectedCuisineValue;

  constructor(private router:Router, private route:ActivatedRoute, private GlobalService: GlobalService, private fb:FormBuilder, private baseApp:AppComponent) { 
    
  }

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.params.restaurantId;
    this.menuId = this.route.snapshot.params.menuId;
    this.itemId = this.route.snapshot.params.itemId;
    this.menuItemId=this.route.snapshot.params.menuItemId;

    console.log(this.restaurantId);
    console.log(this.menuId);
    console.log(this.itemId);

    this.intializeForm();
    this.getCuisineList();
    if(this.itemId){
      console.log("Searching for global menu items")
      this.getItemById(this.itemId)
    }
    if(this.menuItemId){
      console.log("Searching for Restaurant Menu Details")
      this.getMenuItemById(this.menuItemId)
    }  
  }

  intializeForm(){
    /* Initiate the form structure */
    this.productForm = this.fb.group({
      _id:[''],
      name: [''],
      cuisine:[''],
      description:[''],
      image:[''],
      status:[''],
      item_cost: this.fb.array(
        [
          this.fb.group(
            {
              priceFor:['', Validators.required],
              price:['', Validators.required]
            }
          )
        ]
      ),
      addOns: this.fb.array(
        [
          this.fb.group(
            {
              item:['', Validators.required],
              price:['', Validators.required]
            }
          )
        ]
      )
    })

  }
  
  ///////// This is new ////////
  get _id(){
    return this.productForm.get('_id');
  }
  get image(){
    return this.productForm.get('image');
  }
  get status(){
    return this.productForm.get('status');
  }
  get name(){
    return this.productForm.get('name');
  }
  get cuisine(){
    return this.productForm.get('cuisine');
  }
  get description(){
    return this.productForm.get('description');
  }
  get itemCost() {
    return this.productForm.get('item_cost') as FormArray;
  }
  get addOns() {
    return this.productForm.get('addOns') as FormArray;
  }
  
  ///////////End ////////////////

  getItemById(id){
    this.GlobalService.getById("menu/item",id).subscribe((res)=>{
      let itemData=res['item']
      console.log(itemData);
      this.productForm.patchValue({
        _id:itemData._id,
        name:itemData.name,
        description:itemData.description

      })
      this.imagePath=itemData.image;
      this.selectedCuisineValue=itemData.cuisine_id;
    })
  }

  getMenuItemById(id){
    this.GlobalService.getById("menu/menuItem/itemById", id).subscribe((res)=>{
      console.log(res);
      let itemData=res['item']
      console.log(itemData)
      this.productForm.patchValue({
        _id:itemData.item_id._id,
        name:itemData.item_id.name,
        description:itemData.item_id.description,
        cuisine:itemData.item_id.cuisine_id
      })
      if(itemData.addOns){
        this.addAddOns(itemData.addOns);
      }
      if(itemData.cost){
        this.addItemCost(itemData.cost);        
      }
      this.imagePath=itemData.image;
      this.selectedCuisineValue=itemData.cuisine_id;
    })
  }
  getCuisineList(){
    this.GlobalService.getAll("menu/cuisine").subscribe((res)=>{
      console.log(res)
      this.cuisineList=res['cuisine'];
      console.log(this.cuisineList);
    })
  }

  getSelectedCuisineValue(value:any){
    console.log('Selected Value:', value);
  }

  addSellingPoint() {
    this.itemCost.push(this.fb.group({priceFor:'', price:''}));
  }

  addItemCost(cost){
    console.log(cost)
    console.log(cost.length)
    for(var i=0; i<=cost.length-1; i++){
      console.log(cost[i].priceFor)
      this.itemCost.push(this.fb.group({priceFor:cost[i].priceFor, price:cost[i].price}))
    }
  }
  addAddOns(per){
    console.log(per)
    console.log(per.length)
    for(var i=0; i<=per.length-1; i++){
      console.log(per[i].priceFor)
      this.itemCost.push(this.fb.group({priceFor:per[i].priceFor, price:per[i].price}))
    }
  }

  deleteSellingPoint(index) {
    this.itemCost.removeAt(index);
  }

  addSellingPoint1() {
    this.addOns.push(this.fb.group({item:'', price:''}));
  }

  deleteSellingPoint1(index) {
    this.addOns.removeAt(index);
  }

  onSubmit(){
    // console.log(this.productForm.value)
    let createdItem
    if(this.menuItemId){
      const formData = new FormData();
      formData.append('_id', this.productForm.get('_id').value);
      formData.append('status', this.productForm.get('status').value);
      formData.append('name',this.productForm.get('name').value);
      formData.append('item_type',this.productForm.get('item_type').value);
      formData.append('restaurant_name', this.productForm.get('restaurant_name').value);
      formData.append('image',this.productForm.get('image').value);
      formData.append('description',this.productForm.get('description').value);
      formData.append('cuisine',this.productForm.get('cuisine').value);
      formData.append('email',this.productForm.get('email').value);
      formData.append('contact',this.productForm.get('contact').value);
    }else{
      if(this.itemId){
        createdItem ={
          restaurant_id:this.restaurantId,
          menu_id:this.menuId,
          item_id:this.itemId,
          cost : this.productForm.get("item_cost").value,
          addOns: this.productForm.get("addOns").value
        }
      }else{
        createdItem={
          name:this.productForm.get("name").value,
          description:this.productForm.get("description").value,
          cuisine_id:this.productForm.get("cuisine").value,
  
          restaurant_id:this.restaurantId,
          menu_id:this.menuId,
          cost : this.productForm.get("item_cost").value,
          addOns: this.productForm.get("addOns").value
        }
      }
  
      this.GlobalService.create("menu/menuItem", createdItem).subscribe((res)=>{
        if(res['success']){
          console.log("Added successfully")
          console.log(res);
          this.baseApp.showSuccess(res['success_subject'], res['success_message']);
          this.router.navigate(['/restaurant/'+this.restaurantId+'/menu/'+this.menuId])
        }
        console.log(res);
      })
  
    }

    console.log(createdItem)
  }
}
