import { Component, OnInit } from '@angular/core';
import { AuthService } from 'projects/shared/src/lib/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService
    ) { }

  ngOnInit(): void {
  }

  Logmeout(){
    console.log("Performing Logout")
    this.authService.logout();

  }
}
