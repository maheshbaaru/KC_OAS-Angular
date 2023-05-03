import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import namesData from 'src/assets/data/namesData.json';
import { OnInit, ViewChild } from '@angular/core';
import { EmployeeData, Representative } from 'src/app/Modesls/employee';
import { Table } from 'primeng/table';

import { SalaryService } from 'src/app//services/salary.service';
import { LeavesService } from 'src/app/services/leaves.service';

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

  constructor(
    private _fb: FormBuilder,
    private salaryService: SalaryService,
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

  sample = [''];

  representatives: Representative[] = [];
  @ViewChild('dt')
  table!: Table;

  ngOnInit() {
    // this.salaryService
    //   .getEmployee()
    //   .then((employees: any) => (this.employees = employees));
  }
  ngAfterViewInit() {
    this.leaveSer.getLeaveType().subscribe((res) => (this.leaveTypes = res));
  }
}
