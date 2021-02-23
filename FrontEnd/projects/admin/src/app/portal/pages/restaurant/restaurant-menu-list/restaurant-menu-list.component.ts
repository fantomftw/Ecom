import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'projects/shared/src/environments/environment';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';

@Component({
  selector: 'app-restaurant-menu-list',
  templateUrl: './restaurant-menu-list.component.html',
  styleUrls: ['./restaurant-menu-list.component.scss']
})
export class RestaurantMenuListComponent implements OnInit {
  restaurantId;
  menuId;
  itemId;

  baseUrl=environment.baseUrl;

  itemList:any=[];

  constructor(private route:ActivatedRoute, private GlobalService:GlobalService) { }

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.params.restaurantId;
    this.menuId = this.route.snapshot.params.menuId;
    console.log(this.restaurantId)
    console.log(this.menuId)

    this.getRestaurantMenu()
  }

  getRestaurantMenu(){
    this.GlobalService.getByIdForClient('menu/menuItem/item', this.menuId).subscribe((res)=>{
      if(res['success']){
        this.itemList=res['menu']
      }
      console.log(res);
    })
  }

}
