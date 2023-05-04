import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeavesService {
  API_CALL = 'https://localhost:7236';
  constructor(private http: HttpClient) {}
  getStatus() {
    return this.http.get(`${this.API_CALL}/TblStatusControllerAPI`);
  }
  getLeaveType() {
    return this.http.get(`${this.API_CALL}/TblLeaveTypeApi`);
  }

  applyleave(){
    // return this.http.post(`https://localhost:7236/SubmitLeaves`);
  }
  ngOnInit() {}
}
