import { environment } from 'projects/shared/src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl = environment.serverurl;
  errorData: {};

  constructor(private http: HttpClient, private router:Router) { }
  
  redirectUrl: string;

  login(url : string, name: string, password: string) {
    return this.http.post<any>(`${this.serverUrl}`+url, {email: name, password: password})
    .pipe(map(user => {
        if (user && user.token) {
          
          localStorage.setItem('userToken1', JSON.stringify(user.token));
          let tokenData = this.getDecodedAccessToken();
          console.log(tokenData);
          localStorage.setItem('userRole', JSON.stringify(tokenData.data.roles));
        }
      }),
      catchError(this.handleError)
    );
  }

  isLoggedIn() {
    if (localStorage.getItem('userToken1') && localStorage.getItem('userRole')) {
      return true;
    }else{
      return false;
    }
  }

  roleMatch(allowedRoles) : boolean{
    var isMatch = false;
    var userRoles: string[] = JSON.parse(localStorage.getItem('userRole'));
    allowedRoles.forEach(element => {
      if(userRoles.indexOf(element)>-1){
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

  getAuthorizationToken() {
    const currentUser = JSON.parse(localStorage.getItem('userToken1'));
    return currentUser;
  }

  logout() {
    localStorage.removeItem('userToken1');
    localStorage.removeItem('userRole');
    this.router.navigate(['/auth'])
  }


  getDecodedAccessToken() {
    let token = (localStorage.getItem('userToken1')).split('JWT ').pop();
    // console.log(token);
    let reqToken = token.replace('"','');
    // console.log(reqToken);
  const helper = new JwtHelperService();
  const decodedToken = helper.decodeToken(reqToken);
  const expirationDate = helper.getTokenExpirationDate(reqToken);
  const isExpired = helper.isTokenExpired(reqToken);
  // console.log(decodedToken)
  return decodedToken;
  }



  private handleError(error: HttpErrorResponse) {
    // console.log(error)
    // console.log(error.status)
    // console.log(error.error.message)
    if(error.status===400 || error.status===403){
      console.error('error', error.error);
      // this.errorData = {
      //   errorTitle: 'Error',
      //   errorDesc: error.error.message
      // };
      this.errorData = {
        errorTitle: error.error.err_subject,
        errorDesc: error.error.err_message
      };
      return throwError(this.errorData);

    }else if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}
