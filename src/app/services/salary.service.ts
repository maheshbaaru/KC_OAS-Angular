import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeData } from '../Modesls/employee';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  constructor(private http: HttpClient) { }
  getEmployee(): Observable<any> {
    return new Observable((observer) => {
      this.http.get('https://localhost:7236/SalaryDetails').subscribe((result) => {
        const resultData = Object.values(result);
        observer.next(resultData);
        observer.complete();
      })
    })
  }
  // getEmployeeById(id: number): Observable<any> {
  //   debugger;
  //   console.log(`https://localhost:7236/SalaryHistory?id=${id}`);

  //   return new Observable((obserer) => {
  //      this.http.get(`https://localhost:7236/SalHistoryDetails?EmpId=${id}`).subscribe((res) => {
  //       console.log(res);
  //       const resdata = Object.values(res);
  //       obserer.next(resdata);
  //       obserer.complete();

  //     })

  //   })
  // }
  getEmployeeById(id: number) {
    debugger;
    return this.http.get(`https://localhost:7236/SalaryDetailsById?EmpId=${id}`);
  }
}
