import { Component } from '@angular/core';
import { EmployeedDataService } from 'src/app/services/EmployeesDataService';
import { EmployeeService } from 'src/app/services/employee.service';
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
  //   private service: EmployeedDataService,private Empser:EmployeeService
  // ) {}
    private service: EmployeedDataService
    , private _ser: EmployeeService
  ) { }

  ngOnInit(): void {

   
    this.service.getEmployeeList().subscribe((data1: any) => {
      this.empdata = data1;
      // this.cols = [
      //   { field: 'employeeID', header: 'EmpID', routerLink: '../updateemployee' },
      //   { field: 'firstName', header: 'FirstName' },
      //   { field: 'lastName', header: 'LastName' },
      //   { field: 'email', header: 'Email' },
      //   { field: 'designationName', header: 'Designation' },
      //   { field: 'panNumber', header: 'Pan Number' },
      //   { field: 'isActive', header: 'IsActive' },
      //   { field: 'shiftName', header: 'Shift' },
      // ];
    });
    this.cols = [
      { field: 'employeeID', header: 'Emp ID' },
      { field: 'firstName', header: 'FirstName' },
      { field: 'lastName', header: 'LastName' },
      { field: 'email', header: 'Email' },
      { field: 'designationName', header: 'Designation' },
      { field: 'panNumber', header: 'Pan Number' },
      { field: 'isActive', header: 'IsActive' },
      { field: 'shiftName', header: 'Shift' },
    ];
  }

  // updatedata(data:any){
  //   this.Empser.UpdateEmployeeData(data,).subscribe((res)=>{
  //     if (res) {
  //       this.getEmployeeList();
      
  //     }

  //   });

  // }
  getEmployeeList() {
    this.service.getEmployeeById(this.empdata.id).subscribe((res) => {
      this.empdata.patchValue(res);
    });
  }

  checkedChange(event: any, empId: any) {
    let id = parseInt(empId.replace("KC", ''));
    this._ser.updateEmpStatus(event.checked, id).subscribe((res) => {
    });
  }
    getAllInactiveEmployees(empdata:any){


    debugger;
    console.log(empdata);
  }


}

