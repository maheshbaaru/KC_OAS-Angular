import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-access',
  templateUrl: './employee-access.component.html',
  styleUrls: ['./employee-access.component.css'],
})
export class EmployeeAccessComponent {
  date3: any;
  dateRequire = true;
  invalidDates: Date;
  empAccess: any;
  constructor(private empServe: EmployeeService) {}
  ngAfterViewInit() {
    this.empServe.getEmp().subscribe(console.log);
  }
}
