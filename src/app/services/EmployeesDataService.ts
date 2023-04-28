import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/services/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class EmployeedDataService{
  constructor(private http: HttpClient) {}
  getEmployeeList(){
    return this.http.get<any>(environment.API_URL+environment.BASE_URL+'GetEmployees',  httpOptions);
  }
}


