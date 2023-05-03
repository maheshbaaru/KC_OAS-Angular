import { Component } from '@angular/core';
import { EmployeedDataService } from 'src/app/services/EmployeesDataService';
//import { Router } from '@angular/router';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent {
  empdata: any;
  cols: any[];
  constructor(
    //private router:Router,
    private service: EmployeedDataService
  ) {}

  ngOnInit(): void {
    this.service.getEmployeeList().subscribe((data1: any) => {
      this.empdata = data1;
      this.cols = [
        { field: 'employeeID', header: 'EmpID' },
        { field: 'firstName', header: 'FirstName' },
        { field: 'lastName', header: 'LastName' },
        { field: 'email', header: 'Email' },
        { field: 'designationName', header: 'Designation' },
        { field: 'panNumber', header: 'Pan Number' },
        { field: 'isActive', header: 'IsActive' },
        { field: 'shiftName', header: 'Shift' },
      ];
    });
  }
}
