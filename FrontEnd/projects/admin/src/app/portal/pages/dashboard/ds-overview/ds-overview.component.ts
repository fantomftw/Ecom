import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';

@Component({
  selector: 'app-ds-overview',
  templateUrl: './ds-overview.component.html',
  styleUrls: ['./ds-overview.component.scss']
})
export class DsOverviewComponent implements OnInit {

 
  totalUsers=0;
  activeUser=0;

  totalRestaurant=0;
  activeRestaurant=0;
  deactivateRestaurant=0;

  totalBranch=0;
  activeBranch=0;
  deactivateBranch=0;

  totalConstructionType=0;
  activeConstructionType=0;
  deactivateConstructionType=0;

  totalZone=0;
  activeZone=0;
  deactivateZone=0;

  constructor(private GlobalService:GlobalService) { }

  ngOnInit(): void {
    this.GetCount();
  }

  GetCount(){
    this.GlobalService.getAll('user/count').subscribe((res)=>{
      // console.log(res)
      if(res['success']){
        this.totalUsers=res['totalCount']
        this.activeUser=res['active']
      }

    })

    this.GlobalService.getAll('restaurant/count').subscribe((res)=>{
      console.log(res)
      if(res['success']){
        this.totalRestaurant=res['totalCount']
        this.activeRestaurant=res['active']
        this.deactivateRestaurant=res['deactivate']
      }

    })
    
    // this.GlobalService.getAll('branch/count').subscribe((res)=>{
    //   // console.log(res)
    //   this.totalBranch=res['total']
    //   this.activeBranch=res['active']
    //   this.deactivateBranch=res['deactivate']
    // })
    // this.GlobalService.getAll('settings/constructionType/count').subscribe((res)=>{
    //   // console.log(res)
    //   this.totalConstructionType=res['total']
    //   this.activeConstructionType=res['active']
    //   this.deactivateConstructionType=res['deactivate']
    // })

    // this.GlobalService.getAll('settings/zone/count').subscribe((res)=>{
    //   console.log(res)
    //   this.totalZone=res['total']
    //   this.activeZone=res['active']
    //   this.deactivateZone=res['deactivate']
    // })
  }

}
