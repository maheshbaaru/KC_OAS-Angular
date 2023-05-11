import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeData } from '../Modesls/employee';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  constructor(private http: HttpClient) { }
  getEmployeesalaryDetails(): Observable<any> {
    return new Observable((observer) => {
      this.http.get('https://localhost:7236/SalaryDetails').subscribe((result) => {
        const resultData = Object.values(result);
        observer.next(resultData);
        observer.complete();
      })
    })
  }
  getEmployeeById(id: number): Observable<any> {
    debugger;
    return new Observable((obserer) => {
      this.http.get(`https://localhost:7236/SalaryDetailsById?EmpId=${id}`).subscribe((res) => {
        const resdata = Object.values(res);
        obserer.next(resdata);
        obserer.complete();

      })

    })
  }


}
