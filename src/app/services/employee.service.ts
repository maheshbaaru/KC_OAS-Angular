// new Changes

import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  getEmp() {
    return this.http.get(`${this.API_CALL}/SalaryDeductions`);
  }
  //postEmp(data: any) {
  // debugger;
  // return this.http.post(`https://localhost:7236/AddEmployee`, data);
  // return this.http
  //   .post(`${this.API_CALL}/createEmployee`, data)
  //  .subscribe((result) => {
  //const resultData = Object.values(result);
  // console.log(result);
  // });
  // }
  getUsers() {
    return this.http.get(`${this.API_CALL}/GetEmployeeTbls`);
  }
  getEmployee(id: number) {
    return this.http.get(`${this.API_CALL}/SalaryDeduction?EmpId=` + id);
  }
  applyleave(id: any) {
    return this.http.get(`${this.API_CALL}/TblEmpLeaves?EmpId=` + id);
  }
  leaveapply(Id: any) {
    //  return this.http.post(`${this.API_CALL}/ApplyLeave`);
  }

  appliedLeaves() {
    return this.http.get(`${this.API_CALL}/LeavesApproval`);
  }
  // getDesignationRoles() {
  //   return this.http.get(`${this.API_CALL}/GetDesignations`);
  // }
  // getShifts() {
  //   return this.http.get(`${this.API_CALL}/TblShiftControllerAPI`);
  // }

  id(id: any) {
    this.currentid = id;
  }

  getSpecifiEmployeeLeavesDataById(): Observable<any[]> {
    return new Observable((observer) => {
      this.http
        .get(`https://localhost:7236/GetSpecificEmpLeave?id=${this.currentid}`)
        .subscribe((result) => {
          const resultData = Object.values(result);

          observer.next(resultData);
          observer.complete();
        });
    });
  }

  updateLeavesApprovalData(updateData: any) {
    // debugger;

    const body = JSON.stringify(updateData);

    return this.http
      .put<any>(
        `https://localhost:7236/UpdateEmpLeaveDetails?Id=${updateData.id}&LeaveTypeId=${updateData.leaveTypeId}&StatusId=${updateData.statusId}`,
        this.httpOptions
      )
      .subscribe((result) => {
        const resultData = Object.values(result);
      });
  }
  getShifts(): Observable<any[]> {
    return new Observable((observer) => {
      this.http
        .get(`https://localhost:7236/GetTblShifts`)
        .subscribe((data) => {
          const res = Object.values(data);
          observer.next(res);
          observer.complete();
        });
    });
  }

  getDesignationRoles(): Observable<any[]> {
    return new Observable((observer) => {
      this.http
        .get(`https://localhost:7236/GetDesignations`)
        .subscribe((result) => {
          const resultData = Object.values(result);

          observer.next(resultData);
          observer.complete();
        });
    });
  }
  createEmployee(obj: any): Observable<any[]> {
    debugger;
    const { Id, FirstName, LastName, Email, Password, IsActive, EmployeeId, PanNumber, ShiftId, Doj } = obj;
    return this.http.post<any>(

      `${this.API_CALL}/AddEmployee?FirstName=${FirstName}&LastName=${LastName}&email=${Email}&password=${Password}&isActive=${IsActive}&EmployeeId=${EmployeeId}&//panNumber=${PanNumber}&shiftId=${ShiftId}&doj=${Doj}&id=${Id}`,
      this.httpOptions
    );
  }
}