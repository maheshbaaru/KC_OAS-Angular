import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SalarydeductionlistService {
  API_CALL = 'https://localhost:7236';
  constructor(private http: HttpClient) {}
  ngOnInit() {
  }
  getTaxDeduction(){
    return this.http.get(`${this.API_CALL}/TblTaxDeduction`);

  }
}
