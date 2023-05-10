import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import namesData from 'src/assets/data/namesData.json';
import { OnInit, ViewChild } from '@angular/core';
import { EmployeeData, Representative } from 'src/app/Modesls/employee';
import { Table } from 'primeng/table';

import { SalaryService } from 'src/app//services/salary.service';
import { LeavesService } from 'src/app/services/leaves.service';
import { EmployeeService } from 'src/app/services/employee.service';

interface EmployeeName {
  Name: string;
}

interface LeaveType {
  id: number;
  name: string;
}

@Component({
  selector: 'app-employee-leaves',
  templateUrl: './employee-leaves.component.html',
  styleUrls: ['./employee-leaves.component.css'],
})
export class EmployeeLeavesComponent {
  employees: EmployeeData[] | any;
  leaveTypes: any | object;

  names: EmployeeName[];
  empForm: FormGroup;
  employeeLeavs: any;


  constructor(
    private _fb: FormBuilder,
 
    private empservice: EmployeeService,
    private leaveSer: LeavesService
  ) {
    this.names = namesData;
    // this.leaveTypes = [
    //   { name: 'Casual' },
    //   { name: 'Sick' },
    //   { name: 'Earned' },
    //   { name: 'Compensation' },
    //   { name: 'Optional' },
    // ];
    this.empForm = this._fb.group({
      name: '',
      Salary: '',
      LastRevisedDate: '',
      NextRevisedDate: '',
    });
  }

  // sample = [''];

  // representatives: Representative[] = [];
  // @ViewChild('dt')
  // table!: Table;

  ngOnInit() {


    let loogedUser: any = window.sessionStorage.getItem('loggedinUser')
    loogedUser = JSON.parse(loogedUser)
     this.empservice.applyleave(loogedUser.id).subscribe((data: any) => {
    
    this.employeeLeavs = data.filter((dat: any) => dat.empId == loogedUser.employeeID * 1);
    });
    // this.leaveSer.applyleave().subscribe((data) => {
    //   this.employees = data;
    //   console.log(this.employees)
    // });
  }
  // ngAfterViewInit() {
  //   this.leaveSer.getLeaveType().subscribe((res) => (this.leaveTypes = res));
  // }

}
