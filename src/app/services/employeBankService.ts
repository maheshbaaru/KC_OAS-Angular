import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Modesls/employeBankInterface';
import { Observable } from 'rxjs';

@Injectable()
export class EmployeService {
  //private baseUrl = '../assets/data/employeeBankData.json';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // getEmployeeData() {
  //     return this.http.get<any>('../assets/data/employeeBankData.json')
  //         .toPromise()
  //         .then(res => <Employee[]>res.data)
  //         .then(data => { return data; console.log(data) });

  // }
  getEmployeeData(): Observable<any[]> {
    return new Observable((observer) => {
      this.http
        .get('https://localhost:7236/GetTblEmpBankDetails')
        .subscribe((result) => {
          const resultData = Object.values(result);

          observer.next(resultData);
          observer.complete();
        });
    });
  }

  // creatEmployeDataAndPost(datas: any) {
  //     this.http.post('../assets/data/employeeBankData.json', datas, this.httpOptions)
  //     console.log('succesfullyAdded')
  //     console.log(datas)
  // }
  creatEmployeDataAndPost(datas: any) {
    this.http.post(
      'https://localhost:7236/GetTblEmpBankDetails',
      datas,
      this.httpOptions
    );
  }
}
