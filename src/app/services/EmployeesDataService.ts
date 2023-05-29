import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/services/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class EmployeedDataService {
  constructor(private http: HttpClient) {}

  getEmployeeData(){
    return this.http.get<any>(
      environment.API_URL + environment.BASE_URL + 'GetEmployeeTbls',
      httpOptions
    );
  }
  getEmployeeList() {
    return this.http.get<any>(
      environment.API_URL + environment.BASE_URL + 'GetEmployees',
      httpOptions
    );
  }
  CreatenewSalaryDetails(
    Eid: number,
    Salary: number,
    LastRevisedDate: Date,
    NextRevisedDate: Date
  ) {
    return this.http.post(
      `https://localhost:7236/createNewSalary?EmpId=${Eid}&Salary=${Salary}&LastRevisedDate=${LastRevisedDate}&NextRevisedDate=${NextRevisedDate}`,

      httpOptions
    );
  }

  updateprofile(updateData: any, id: any) {
    const body = JSON.stringify(updateData);
    return this.http.put(
      `https://localhost:7236/UpdateEmployeeTbl?Id=${id}&PanNumber=${updateData.panNumber}
    &FirstName=${updateData.firstName}
    &LastName=${updateData.lastName}
    &Email=${updateData.email}&EmployeeId=${updateData.employeeId}&IsActive=${updateData.isActive}`,
      httpOptions
    );
  }
  getEmployeeById(id: any) {
    return this.http.get<any>(
      `https://localhost:7236/GetEmployeeById?Id=${id}`,
      httpOptions
    );
  }
}
