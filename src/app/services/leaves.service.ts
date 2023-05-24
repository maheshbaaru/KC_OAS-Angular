import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeavesService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };
  API_CALL = 'https://localhost:7236';
  constructor(private http: HttpClient) {}

  getStatus() {
    return this.http.get(`${this.API_CALL}/TblStatusControllerAPI`);
  }
  getLeaveType() {
    return this.http.get(`${this.API_CALL}/TblLeaveTypeApi`);
  }

  appliedLeaves() {
    return this.http.get(`${this.API_CALL}/LeavesApproval`);
  }

  applyleave(
    LeaveTypeId: number,
    FromDate: string,
    ToDate: string,
    StatusId: number,
    Comments: string,
    diffDays: number
  ) {
    let currentDate = new Date().toJSON().slice(0, 10);

    let data: any = window.sessionStorage.getItem('auth-user');
    let userdata = JSON.parse(data);
  
    return this.http.post(`${this.API_CALL}/ApplyLeave?EmpId=${userdata.id}&LeaveTypeId=${LeaveTypeId}&NumOfDays=${diffDays}&FromDate=${FromDate}&ToDate=${ToDate}&Comments=${Comments}&Appliedon=${currentDate}&Status='New'&StatusId=1`,this.httpOptions)
  
  }
  employeeLeaves(
    empId: number,
    leaveTypeId: number,
    nOfLeaves: number,
    year: string,
    remainingLeaves: number
  ): Observable<any[]> {
    return this.http.post<any>(
      `${this.API_CALL}/SubmitLeaves?EmpId=${empId}&LeaveTypeId=${leaveTypeId}&NumOfLeaves=${nOfLeaves}&Year=${year}&RemainingLeaves=${remainingLeaves}`,
      this.httpOptions
    );
  }
  getEmployeeLeaves(): Observable<any[]> {
    return this.http.get<any>(`${this.API_CALL}/getEmployeesLeaves`);
  }
}
