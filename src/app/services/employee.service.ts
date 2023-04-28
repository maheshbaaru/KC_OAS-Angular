import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ajax } from 'rxjs/ajax';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmp() {
    return this.http.get('https://localhost:7236/GetEmployeeTbls');
  }
  getEmployee(id: number) {
    debugger;
    return this.http.get('assets/data/employeeList.json/' + id);
  }
  appliedLeaves() {
    const API_CALL = 'https://localhost:7236';

    return forkJoin({
      user: ajax.getJSON(`${API_CALL}/GetEmployeeTbls`),
      appliedLeaves: ajax.getJSON(`${API_CALL}/LeavesApproval
      `),
    });
  }
}
