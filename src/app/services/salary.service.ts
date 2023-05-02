import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeData } from '../Modesls/employee';
@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  constructor(private http: HttpClient) {}

  getEmployee() {
    // return this.http
    //   .get('')
    //   .toPromise()
    //   .then((res: any) => <EmployeeData[]>res.data)
    //   .then((data) => {
    //     return data;
    //   });
  }
}


