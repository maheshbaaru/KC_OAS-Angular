import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/services/environment';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthguardService {
  login( username:string, password: String): Observable<any> {
    return this.httpClient.get<any>(environment.API_URL+environment.BASE_URL+'Login?username='+username+'&password='+password+'',  httpOptions);
  }

  GetDashboarddetails(): Observable<any> {
    
    return this.httpClient.get<any>(environment.API_URL+environment.BASE_URL+'GetHome',  httpOptions);
  }

  // register(username: string, email: string, password: string): Observable<any> {
  //   return this.http.post(
  //     AUTH_API + 'signup',
  //     {
  //       username,
  //       email,
  //       password,
  //     },
  //     httpOptions
  //   );
  // }

  logout(): Observable<any> {
    return this.httpClient.post('http://localhost:4200/signout', { }, httpOptions);
  }

  constructor(private httpClient: HttpClient) { }

}

