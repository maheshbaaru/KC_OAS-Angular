import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import namesData from 'src/assets/data/namesData.json';
import { OnInit, ViewChild } from '@angular/core';
import { EmployeeData, Representative } from 'src/app/Modesls/employee';
import { Table } from 'primeng/table';

import { SalaryService } from 'src/app//services/salary.service';
import { LeavesService } from 'src/app/services/leaves.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { formatDate } from '@angular/common';
import { MessageService } from 'primeng/api';

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

  names: any;
  updateform: FormGroup;
  employeeLeavs: any;
  //under forms using props
  leaveTypeId: any;
  EmpId: any;
  noOfLeaves: any;

  year: any;
  remainLeaves: any;
  employeeName: any;

  constructor(
    private _fb: FormBuilder,

    private empservice: EmployeeService,
    private leaveSer: LeavesService,
    private messageServ: MessageService
  ) {
    // this.leaveTypes = [
    //   { name: 'Casual' },
    //   { name: 'Sick' },
    //   { name: 'Earned' },
    //   { name: 'Compensation' },
    //   { name: 'Optional' },
    // ];
    this.updateform = this._fb.group({
      name: null,
      // Salary: '',
      // LastRevisedDate: '',
      // NextRevisedDate: '',
      leaveType: null,
      year: null,
      noOfLeaves: null,
      remainLeaves: null,
    });
  }

  // sample = [''];

  // representatives: Representative[] = [];
  // @ViewChild('dt')
  // table!: Table;

  ngOnInit() {
    this.updateform = this._fb.group({
      name: ['', Validators.required],
      leaveType: ['', Validators.required],
      year: ['', Validators.required],
      noOfLeaves: ['', Validators.required],
    });
    // let loogedUser: any = window.sessionStorage.getItem('loggedinUser');
    // loogedUser = JSON.parse(loogedUser);
    // this.empservice.applyleave(loogedUser.id).subscribe((data: any) => {
    //   this.employeeLeavs = data.filter(
    //     (dat: any) => dat.empId == loogedUser.employeeID * 1
    //   );
    // });
    // this.leaveSer.applyleave().subscribe((data) => {
    //   this.employees = data;
    //   console.log(this.employees)
    // });
    this.empservice.getUsers().subscribe((res) => {
      this.names = res;
      const employeeData = this.names.map((person: any) => ({
        ...person,
        Name: `${person.firstName} ${person.lastName}`,
      }));
      this.employeeName = employeeData;
    });
  }
  ngAfterViewInit() {
    this.leaveSer.getLeaveType().subscribe((res) => (this.leaveTypes = res));
    this.leaveSer
      .getEmployeeLeaves()
      .subscribe((res) => (this.employeeLeavs = res));
  }
  saveEmpLeaves() {
    if (this.updateform.invalid) {
      for (const control of Object.keys(this.updateform.controls)) {
        this.updateform.controls[control].markAsTouched();
        this.updateform.controls[control].markAsDirty();
      }
      this.messageServ.add({
        severity: 'error',
        summary: 'Error',
        detail: 'pleses fill the required fields',
        sticky: true,
      });
      return;
    } else if (this.updateform.valid) {
      // console.log(this.updateform.value);
      this.leaveTypeId = this.leaveTypes = this.updateform.value.leaveType.id;
      this.EmpId = this.updateform.value.name.id;
      this.noOfLeaves = parseInt(this.updateform.value.noOfLeaves);
      console.log(this.noOfLeaves);
      this.remainLeaves = this.updateform.value.remainingLeaves;
      this.year = this.updateform.value.year.getFullYear();

      this.leaveSer
        .employeeLeaves(
          this.EmpId,
          this.leaveTypeId,
          this.noOfLeaves,
          this.year,
          this.remainLeaves
        )
        .subscribe((res: any) => {
          console.log(res);
          if (res) {
            this.messageServ.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Data saved',
            });
          }
        });
    }
    this.updateform.reset();
  }
}
