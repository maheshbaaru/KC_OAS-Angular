import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, merge, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  API_CALL = 'https://localhost:7236';
  list1: string[] = [];
  list2: string[] = [];
  listAll: any;

  constructor(private http: HttpClient) {
  }

  getEmp() {
    return this.http.get(`${this.API_CALL}/SalaryDeductions`);
  }
  getUsers() {
    return this.http.get(`${this.API_CALL}/GetEmployeeTbls`);
  }
  getEmployee(id: number) {
    return this.http.get(`${this.API_CALL}/SalaryDeduction?EmpId=` + id);
  }
  appliedLeaves() {
    return this.http.get(`${this.API_CALL}/LeavesApproval`);
  }
  getDesignationRoles() {
    return this.http.get(`${this.API_CALL}/GetDesignations`);
  }
  getShifts() {
    return this.http.get(`${this.API_CALL}/TblShiftControllerAPI`);
  }
}
