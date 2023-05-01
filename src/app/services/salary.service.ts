import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeData } from '../Modesls/employee';
@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  constructor(private http: HttpClient) { }

  // getEmployee() {
  //   return this.http
  //     .get('')
  //     .toPromise()
  //     .then((res: any) => <EmployeeData[]>res.data)
  //     .then((data) => {
  //       return data;
  //     });
  // }
  getEmployee(): Observable<any> {
    debugger;
    return new Observable((observer) => {
      this.http.get('https://localhost:7236/SalaryDetails').subscribe((result) => {
        const resultData = Object.values(result);
        console.log(resultData);
        observer.next(resultData);
        observer.complete();
      })
    })
  }
}
