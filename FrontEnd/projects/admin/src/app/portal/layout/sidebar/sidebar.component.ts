import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from 'projects/shared/src/lib/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  currentUser;
  constructor(private authService: AuthService)
  {

  }
  ngOnInit(): void {
    // console.log("Getting user details")
    this.currentUser = this.authService.getDecodedAccessToken()
    console.log(this.currentUser)

    $(".sidebar-dropdown > a").click(function() {
      $(".sidebar-submenu").slideUp(200);
      if (
        $(this)
          .parent()
          .hasClass("active")
      ) {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
          .parent()
          .removeClass("active");
      } else {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
          .next(".sidebar-submenu")
          .slideDown(200);
        $(this)
          .parent()
          .addClass("active");
      }
    });
    $("#close-sidebar").click(function() {
      $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function() {
      $(".page-wrapper").addClass("toggled");
    });
    $(".page-wrapper").removeClass("toggled");

  }

}
