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
    const API_CALL = 'https://localhost:7236';
    forkJoin({
      user: ajax.getJSON(`${API_CALL}/GetEmployeeTbls`),
      salary: ajax.getJSON(`${this.API_CALL}/SalaryDeductions`),
    }).subscribe((e: any) => {
      this.list1 = e.user;
      this.list2 = e.salary;
      console.log(this.list1);
    });
    // forkJoin([this.list1, this.list2]).subscribe((res) => {
    //   console.log(this.listAll);
    //   console.log(...res[0]);
    // });
    // console.log(this.list1, this.list2);
  }

  getEmp() {
    return this.http.get(`${this.API_CALL}/SalaryDeductions`);
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
