import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    // return this.checkLogin(url);
    if(this.checkLogin(url)){
      let roles = route.data["roles"] as Array<string>;
      console.log(roles);
      
      if(roles){
        var match = this.authService.roleMatch(roles);
        if(match) return true;
        else{
          this.authService.redirectUrl = url;

          this.router.navigate(['/403'], {queryParams: { returnUrl: url }} );          
        }
      }
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string) {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.authService.redirectUrl = url;

    this.router.navigate(['/auth/signin'], {queryParams: { returnUrl: url }} );
  }
}