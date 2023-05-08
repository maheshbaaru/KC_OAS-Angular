import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalarydeductionlistService {
  API_CALL = 'https://localhost:7236';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  ngOnInit() {}
  getTaxDeduction() {
    return this.http.get(`${this.API_CALL}/TblTaxDeduction`);
  }
  AddDesignation(name: string) {
    debugger;
    return new Observable<any[]>((observer) => {
      this.http.post<any>(
        `${this.API_CALL}/AddDesignations?Name=`,
        JSON.stringify({ name }),
        this.httpOptions
      );
    });
  }
}
