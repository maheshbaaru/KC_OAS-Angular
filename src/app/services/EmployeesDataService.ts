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
  getEmployeeList() {
    
    return this.http.get<any>(
      environment.API_URL + environment.BASE_URL + 'GetEmployees',
      httpOptions
    );
  }
  CreatenewSalaryDetails(Eid:number,Salary: number,LastRevisedDate:Date,NextRevisedDate:Date) {
   return this.http
      .post(
        `https://localhost:7236/createNewSalary?EmpId=${Eid}&Salary=${Salary}&LastRevisedDate=${LastRevisedDate}&NextRevisedDate=${NextRevisedDate}`,
       
        httpOptions
      )
    
  }



  updateprofile(updateData: any){

    const body = JSON.stringify(updateData);
    this.http.put(`https://localhost:7236/UpdateEmployeeTbl?Id=${updateData.id}&PanNumber=${updateData.PanNumber}
    &FirstName=${updateData.FirstName}
    &LastName=${updateData.PanNumber}
    &Email=${updateData.PanNumber}&EmployeeId=${updateData.EmployeeId}`,
    httpOptions)  .subscribe((result) => {
      const resultData = Object.values(result);
    });
  }
}
