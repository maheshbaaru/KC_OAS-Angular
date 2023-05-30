import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { EmployeService } from 'src/app/services/employeBankService';
import { EmployeeService } from 'src/app/services/employee.service';
import { LeavesService } from 'src/app/services/leaves.service';

@Component({
  selector: 'app-apppled-leaves',
  templateUrl: './apply-leaves.component.html',
  styleUrls: ['./apply-leaves.component.css'],
})
export class ApplyLeavesComponent {
  employeeLeavs: any;
  appliedLeaves: any;
  cols: any[];
  employee: any;
  constructor(
    private empSer: EmployeeService,
    @Inject(LOCALE_ID) public local: string
  ) {}
  ngOnInit() {
    let loogedUser: any = window.sessionStorage.getItem('auth-user');
    loogedUser = JSON.parse(loogedUser);
    this.empSer.appliedLeaves().subscribe((data: any) => {
      this.employeeLeavs = data.filter(
        (dat: any) => dat.empId == loogedUser.employeeID * 1
      );
      this.employeeLeavs=this.employeeLeavs.map((person: any) => ({
        ...person,

        empId:
          person.empId < 10
            ? 'KC00' + person.empId
            : person.empId && person.empId < 100
            ? 'KC0' + person.empId
            : person.empId && person.empId >= 100
            ? 'KC' + person.empId
            : person.empId,
      }));
    
      
    });
    this.cols = [
      { field: 'empId', header: 'Emp ID' },
      { field: 'empName', header: 'Emp Name' },
      { field: 'leaveTypeId', header: 'Leave Type' },
      { field: 'numOfDays', header: 'Num Of Days' },
      { field: 'fromDate', header: 'From Date' },
      { field: 'toDate', header: 'To Date' },
      { field: 'appliedOn', header: 'Applied On' },
      { field: 'status', header: 'Status' },
      { field: 'comments', header: 'Comments' },
      { field: 'adminComments', header: 'Admin Comments' },
    ];
  }
}
