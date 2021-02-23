import { Component, OnInit } from '@angular/core';
import { AuthService } from 'projects/shared/src/lib/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isNavBar : boolean = true;
  currentUser;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.navBarChange();
    this.currentUser = this.authService.getDecodedAccessToken()
  }

  LogMeOut(){
    // console.log("Performing Logout")
    this.authService.logout();

  }
  navBarChange(){
    if(this.isNavBar){
      $('.hamburger').addClass("is-active")
      $('.app-container').addClass("closed-sidebar")
      this.isNavBar=false;
    }else{
      console.log("opening toggle")
      $('.hamburger').removeClass("is-active")
      $('.app-container').removeClass("closed-sidebar")
      this.isNavBar=true;
    }
  }


}
