import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ajax } from 'rxjs/ajax';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {
    const API_CALL = 'https://localhost:7236';
    // user: ajax.getJSON(`${API_CALL}/GetEmployeeTbls`),
  }

  getEmp() {
    return this.http.get('https://localhost:7236/GetEmployeeTbls');
  }
  getEmployee(id: number) {
    debugger;
    return this.http.get('assets/data/employeeList.json/' + id);
  }
  appliedLeaves() {
    const API_CALL = 'https://localhost:7236';

    return this.http.get(`${API_CALL}/LeavesApproval`);
  }
}
