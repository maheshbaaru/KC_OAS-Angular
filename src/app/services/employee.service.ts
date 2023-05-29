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
  postEmp(data: any) {
    // return this.http.post(`https://localhost:7236/AddEmployee`, data);
    return this.http
      .post(`${this.API_CALL}/createEmployee`, data)
      .subscribe((result) => {
        //const resultData = Object.values(result);
      });
  }
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
    const body = JSON.stringify(updateData);

    return this.http
      .put<any>(
        `https://localhost:7236/UpdateEmpLeaveDetails?Id=${updateData.id}&LeaveTypeId=${updateData.leaveTypeId}&StatusId=${updateData.statusId} `,
        this.httpOptions
      )
      .subscribe((result) => {
        const resultData = Object.values(result);
      });
  }
  getShifts(): Observable<any> {
    return this.http.get(`https://localhost:7236/GetTblShifts`);
  }
  getDesignationRoles(): Observable<any> {
    return this.http.get(`https://localhost:7236/GetDesignations`);
  }

  getAllEmployees(): Observable<any> {
    return this.http.get(`https://localhost:7236/GetEmployeeTbls`);
  }

  createEmployee(obj: any): Observable<any[]> {
    const {
      designationId,
      FirstName,
      LastName,
      Email,
      Password,
      IsActive,
      EmployeeId,
      PanNumber,
      ShiftId,
      Doj,
    } = obj;
    return this.http.post<any>(
      `${this.API_CALL}/AddEmployee?DesignationId=${designationId}&FirstName=${FirstName}&LastName=${LastName}&email=${Email}&password=${Password}&isActive=${IsActive}&EmployeeId=${EmployeeId}&PanNumber=${PanNumber}&shiftId=${ShiftId}&doj=${Doj}`,
      this.httpOptions
    );
  }
  getSpecificEmployeeById(id: any): Observable<any> {
    return this.http.get(`https://localhost:7236/GetEmployeeById?id=` + id);
  }

  UpdateEmployeeData(form: any) {
    return this.http.put<any>(
      `${this.API_CALL}/UpdateEmployeeTbl?employeeID=${form.employeeID}&Email=${form.Email}&isActive=${form.checked}&FirstName=${form.FirstName}&PanNumber=${form.PanNumber}&LastName=${form.LastName}&shiftId=${form.shiftId.shiftId}&DesignationId=${form.DesignationId.id}`,
      this.httpOptions
    );
  }
  updateEmpStatus(event: any, id: any) { 
    return this.http.put<any>(
      `${this.API_CALL}/UpdateEmployeeTbl?isActive=${event}&EmployeeId=${id}`, this.httpOptions);

  }
}
