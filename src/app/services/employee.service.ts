import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, merge, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
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
  postEmp(data: any){
    console.log(data)
    // return this.http.post(`https://localhost:7236/AddEmployee`,data)
    return this.http.post(`${this.API_CALL}/AddEmployee`,data,httpOptions) 
    .subscribe((result) => {
      const resultData = Object.values(result);
      console.log(resultData);
     
    })
  }
  getUsers() {
    return this.http.get(`${this.API_CALL}/GetEmployeeTbls`);
  }
  getEmployee(id: number) {
    return this.http.get(`${this.API_CALL}/SalaryDeduction?EmpId=` + id);
  }
  appliedLeaves(id: any) {
    return this.http.get(`${this.API_CALL}/LeavesApproval?EmpId=`+id);
  }
  getDesignationRoles() {
    return this.http.get(`${this.API_CALL}/GetDesignations`);
  }
  getShifts() {
    return this.http.get(`${this.API_CALL}/TblShiftControllerAPI`);
  }

   postcreateemployee(data:any ){
    this.http.post('https://localhost:7236/createNewSalary', JSON.stringify(data), httpOptions)
    .subscribe((result) => {
      const resultData = Object.values(result);
      console.log(resultData);
     
    })
  }
}
