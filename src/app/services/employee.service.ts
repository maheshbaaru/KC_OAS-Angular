// new Changes


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, merge, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
 
  API_CALL = 'https://localhost:7236';
  list1: string[] = [];
  list2: string[] = [];
  listAll: any;
  // +++++++++++//
  currentid: any;

  constructor(private http: HttpClient) {
  }

  getEmp() {
    return this.http.get(`${this.API_CALL}/SalaryDeductions`);
  }
  postEmp(data: any){
    console.log(data)
    // return this.http.post(`https://localhost:7236/AddEmployee`,data)
    return this.http.post(`${this.API_CALL}/createEmployee`,data) 
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
  applyleave(id: any) {
    return this.http.get(`${this.API_CALL}/TblEmpLeaves?EmpId=`+id);
  }
  leaveapply(Id:any){
  //  return this.http.post(`${this.API_CALL}/ApplyLeave`);
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

  id(id:any){
    this.currentid=id
  }

  getSpecifiEmployeeLeavesDataById(): Observable<any[]>{
    return new Observable((observer) => {
        this.http.get(`https://localhost:7236/GetSpecificEmpLeave?id=${this.currentid}`).subscribe((result) => {
            const resultData = Object.values(result);
            //  console.log(resultData);
            observer.next(resultData);
            observer.complete();
        })
    })
  }
 

}
