import { environment } from 'projects/shared/src/environments/environment';
import { Injectable } from '@angular/core';
// import { environment } from 'projects/shared/src/environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Blog } from '../../interface/blog/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiServer = environment.serverurl;
  private userToken =localStorage.getItem('userToken1') ;
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':this.userToken
    })
  }
  errorData: {};
  constructor(private httpClient: HttpClient) { }

  create(Zone): Observable<any> {
    // console.log(this.httpClient.post<any>(this.apiServer + 'Zone', JSON.stringify(Zone), this.httpOptions))
    return this.httpClient.post<any>(this.apiServer + 'blog', JSON.stringify(Zone), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  getById(id): Observable<Blog> {
    return this.httpClient.get<Blog>(this.apiServer + 'blog/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getCount(id): Observable<Blog> {
    return this.httpClient.get<Blog>(this.apiServer + 'blog/count/'+id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAllCount(): Observable<Blog> {
    return this.httpClient.get<Blog>(this.apiServer + 'blog/count/', this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<Blog[]> {
    return this.httpClient.get<Blog[]>(this.apiServer + 'blog/', this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id, Zone): Observable<Blog> {
    return this.httpClient.put<Blog>(this.apiServer + 'blog/' + id, JSON.stringify(Zone), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  updateStatus(id): Observable<Blog> {
    return this.httpClient.get<Blog>(this.apiServer + 'blog/status/' + id,  this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }



  delete(id){
    return this.httpClient.delete<Blog>(this.apiServer + 'blog/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
//   errorHandler(error) {
//     let errorMessage = '';
//     if(error.error instanceof ErrorEvent) {
//       // Get client-side error
//       errorMessage = error.error.message;
//     } else {
//       // Get server-side error
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     console.log(errorMessage);
//     return throwError(errorMessage);
//  }


  private errorHandler(error: HttpErrorResponse) {
    // console.log(error)
    // console.log(error.status)
    // console.log(error.error.message)
    if(error.status===400){
      console.error('error', error.error.message);
      // this.errorData = {
      //   errorTitle: 'Error',
      //   errorDesc: error.error.message
      // };
      this.errorData = {
        errorTitle: 'Error',
        errorDesc: error.error.message
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