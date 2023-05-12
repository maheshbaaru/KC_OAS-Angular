
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/services/environment';
import { BehaviorSubject } from 'rxjs';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthguardService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  isRemberMeChecked: boolean=true;



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
    localStorage.removeItem('user');
    return this.httpClient.post('http://localhost:4200/signout', { }, httpOptions);
  }

  constructor(private httpClient: HttpClient) {

    // this.currentUserSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('user')));
    // this.currentUser = this.currentUserSubject.asObservable();
   }






}

