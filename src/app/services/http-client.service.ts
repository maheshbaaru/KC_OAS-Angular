import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { environment } from './environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  API_CALL = 'https://localhost:7236';
  constructor(private http: HttpClient) {}

  postdesignation(data: any) {
    this.http.post('https://localhost:7236/GetTblEmpBankDetails', data);
  }

  profilephoto(id: any) {
    let loogedUser: any = window.sessionStorage.getItem('auth-user');
    loogedUser = JSON.parse(loogedUser);
    this.http.post(`${this.API_CALL}/AddProfilePhoto`, id);
  }

  getUpdateform() {
    return this.http.get<any>(
      environment.API_URL + environment.BASE_URL + 'Login?id=' + '',
      httpOptions
    );
  }
  AddTaxType(type: string): Observable<any[]> {
    return this.http.post<any>(
      `${this.API_CALL}/GetTblTaxDeduction?Type=${type}`,
      this.httpOptions
    );
  }

  updatePassword(password: string, empId: number): Observable<any[]> {
    //https://localhost:7236/UpdateEmployeeTbl?IsActive=true&EmployeeId=112&PanNumber=HSCBC1S&ShiftId=1&DesignationId=4;
    //https://localhost:7236/UpdateEmployeeTbl?Password=ultralow&EmployeeId=112
    return this.http.put<any>(
      `${this.API_CALL}/UpdateEmployeeTbl?Password=${password}&EmployeeId=${empId}`,
      httpOptions
    );
  }
}
