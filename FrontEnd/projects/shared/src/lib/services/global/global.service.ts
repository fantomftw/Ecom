import { environment } from 'projects/shared/src/environments/environment';
import { Injectable } from '@angular/core';
// import { environment } from 'projects/shared/src/environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Global } from '../../interface/global/global';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private apiServer = "http://highstreet.webkodz.com/";
  private userToken =localStorage.getItem('userToken1') ;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':this.userToken
    }),
  }
  // multipart/form-data
  FormHttpOptions = {
    headers: new HttpHeaders({
      "Accept": "application/json", 
      'Authorization':this.userToken
    }),
  }
  errorData: {};
  constructor(private httpClient: HttpClient) { }

  registration(url, data): Observable<any> {
    console.log(this.apiServer + url)
    console.log(data);
    // console.log(this.httpClient.post<any>(this.apiServer + 'Zone', JSON.stringify(Zone), this.httpOptions))
    return this.httpClient.post<any>(this.apiServer + url, data)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  create(url, data): Observable<any> {
    // console.log(this.httpClient.post<any>(this.apiServer + 'Zone', JSON.stringify(Zone), this.httpOptions))
    return this.httpClient.post<any>(this.apiServer + url, JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  // getById(id): Observable<Global> {
  //   return this.httpClient.get<Global>(this.apiServer + 'blog/' + id, this.httpOptions)
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }

  getCount(url): Observable<Global> {
    return this.httpClient.get<Global>(this.apiServer + url, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  // getAllCount(): Observable<Global> {
  //   return this.httpClient.get<Global>(this.apiServer + 'blog/count/', this.httpOptions)
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }


  getAll(url): Observable<Global[]> {
    return this.httpClient.get<Global[]>(this.apiServer + url, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getAllForClient(url): Observable<Global[]> {
    return this.httpClient.get<Global[]>(this.apiServer + url)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getById(url, id): Observable<Global[]> {
    return this.httpClient.get<Global[]>(this.apiServer + url+'/'+ id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getByIdForClient(url, id): Observable<Global[]> {
    return this.httpClient.get<Global[]>(this.apiServer + url+'/'+ id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getUserByRole(url, role):Observable<Global[]>{
    return this.httpClient.get<Global[]>(this.apiServer+ url+'/'+role, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(url, id, data ): Observable<any> {
    // console.log(this.httpClient.post<any>(this.apiServer + 'Zone', JSON.stringify(Zone), this.httpOptions))
    return this.httpClient.patch<any>(this.apiServer + url+'/'+id, JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  delete(url, id){
    return this.httpClient.delete<Global>(this.apiServer+url+'/'+id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  updateStatus(url, id){
    return this.httpClient.get<Global>(this.apiServer+url+'/'+id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  PostFormData(url, d ){
    console.log("posting user")
    return this.httpClient.post<any>(this.apiServer+url,d, this.FormHttpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  // update(id, Zone): Observable<Global> {
  //   return this.httpClient.put<Global>(this.apiServer + 'blog/' + id, JSON.stringify(Zone), this.httpOptions)
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }

  // updateStatus(id): Observable<Global> {
  //   return this.httpClient.get<Global>(this.apiServer + 'blog/status/' + id,  this.httpOptions)
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }



  // delete(id){
  //   return this.httpClient.delete<Global>(this.apiServer + 'blog/' + id, this.httpOptions)
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }



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
        err_subject: error.error.err_subject,
        err_message: error.error.err_message
      };
      return throwError(this.errorData);

    }else if(error.status===204){
      this.errorData = {
        err_subject:error.error.err_subject,
        err_message:error.error.err_message
      }
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
      err_subject: 'Oops! Request for document failed',
      err_message: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}
