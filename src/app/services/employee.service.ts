import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ajax } from 'rxjs/ajax';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  API_CALL = 'https://localhost:7236';
  constructor(private http: HttpClient) {
    // user: ajax.getJSON(`${API_CALL}/GetEmployeeTbls`),
  }

  getEmp() {
    return this.http.get(`${this.API_CALL}/SalaryDeductions`);
  }
  getEmployee(id: number) {
    debugger;
    return this.http.get(`${this.API_CALL}/SalaryDeduction?EmpId=` + id);
  }
  appliedLeaves() {
    return this.http.get(`${this.API_CALL}/LeavesApproval`);
  }
}
