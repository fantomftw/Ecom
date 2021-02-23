import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'projects/admin/src/app/app.component';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  heading = "Faq"
  faqList:any=[];
  isodd = false;

  
  constructor(private GlobalService : GlobalService, private baseApp : AppComponent) { }


  ngOnInit(): void {
    this.getFaqList();
  }

  changeOdd(i){
    console.log("checking for odd even")
    if(i/2){
      return true;
    }else{
      return false;
    }
  }

  getFaqList(){
    this.GlobalService.getAll("cms/faq").subscribe((res)=>{
      console.log(res);
      if(res['success']){
        this.faqList=res['Faq'];
      }
    })
  }

  onAnimationStateChange(state: any) {
    console.log(state);
  }
}
