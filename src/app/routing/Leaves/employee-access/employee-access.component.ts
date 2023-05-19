import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-access',
  templateUrl: './employee-access.component.html',
  styleUrls: ['./employee-access.component.css'],
})
export class EmployeeAccessComponent {
  date3: any;
  employeeLeavs: any;
  dateRequire = true;
  invalidDates: Date;
  empAccess: any;
  constructor(private empServe: EmployeeService) {}


  ngOnInit() {
 
    // let loogedUser: any = window.sessionStorage.getItem('auth-user')
    // loogedUser = JSON.parse(loogedUser)
    // debugger
    // this.empServe.getUsers().subscribe((data: any) => {
    // return data;
   
    // this.empAccess = data.filter((dat: any) => dat.id == loogedUser.employeeID* 1);
    // console.log(this.empAccess);
    
    // });
  }
  ngAfterViewInit() {
    return this.empServe.getUsers().subscribe((res) => (this.empAccess = res));
  }

}
