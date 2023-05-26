import { Component } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { SalarydeductionlistService } from 'src/app/services/salarydeductionlist.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { Inject, LOCALE_ID } from '@angular/core';
import { from } from 'rxjs';
import { MessageService } from 'primeng/api';
import { EmployeedDataService } from 'src/app/services/EmployeesDataService';

export interface TaxTayes {
  id?: number;
  Type?: string;
}
@Component({
  selector: 'app-sal-deduction',
  templateUrl: './sal-deduction.component.html',
  styleUrls: ['./sal-deduction.component.css'],
})
export class SalDeductionComponent {
  employe: any;
  employeeName: any;
  submitted: boolean;
  employee: any;
  users: any;
  salDeduction: any;
  productDialog: boolean;
  taxTaypes: any;

  selectedAmount: any;
  selectedLOP: any;
  employeeId: any;
  taxType: any;
  month: any;
  invalidDates: Date[];
  cols: any[];
  description: any;
  public form: FormGroup;
  constructor(
    private employeeSer: EmployeeService,
    private employeeDetailServ: EmployeedDataService,
    private salDeductionServ: SalarydeductionlistService,
    private fb: FormBuilder,
    @Inject(LOCALE_ID) public local: string,
    private messageSer: MessageService
  ) {
    this.form = fb.group({
      TaxTypeId: [null, Validators.required],
      EmpId: [null, Validators.required],
      Amount: [null, Validators.required],
      LOPDAYS: [null, Validators.required],
      Month: [null, Validators.required],
    });
  }
  ngOnInit() {
    this.employeeSer.getEmp().subscribe((data) => {
      this.employee = data;
      this.employeeSer.getUsers().subscribe((userList) => {
        this.users = userList;
        this.users.sort((r1: any, r2: any) =>
          r1.employeeId * 1 > r2.employeeId * 1
            ? 1
            : r1.employeeId * 1 < r2.employeeId * 1
            ? -1
            : 0
        );
        const employeeData = this.users.map((person: any) => ({
          ...person,
          employeeId:
            person.employeeId < 10
              ? 'KC00' + person.employeeId
              : person.employeeId && person.employeeId < 100
              ? 'KC0' + person.employeeId
              : person.employeeId && person.employeeId >= 100
              ? 'KC' + person.employeeId
              : person.employeeId,
          Name: `${person.firstName ? person.firstName : ''} ${
            person.lastName ? person.lastName : ''
          }`,
        }));
        this.employeeName = employeeData;
      });
    });
    this.cols = [
      { field: 'employeeId', header: 'EmployeeId' },
      { field: 'Name', header: 'Employee Name' },
    ];
  }
  openNew() {
    this.employe = {};
    this.submitted = false;
    this.productDialog = true;
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
  save() {
    if (this.form.invalid) {
      for (const control of Object.keys(this.form.controls)) {
        this.form.controls[control].markAsTouched();
        this.form.controls[control].markAsDirty();
      }
      this.messageSer.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill the required fields',
        sticky: true,
      });
      return;
    } else if (this.form.valid) {
      this.taxType = this.form.value.TaxTypeId.id;
      this.employeeId = this.form.value.EmpId.employeeId;
      this.selectedAmount = this.form.value.Amount;
      this.selectedLOP = this.form.value.LOPDAYS;
      (this.month = formatDate(
        this.form.value.Month,
        'YYYY-MM-dd',
        this.local
      )),
        (this.description = this.form.value.TaxTypeId.type);
      this.salDeductionServ
        .AddDeduction(
          this.employeeId,
          this.taxType,
          this.selectedAmount,
          this.month,
          this.selectedLOP,
          this.description
        )
        .subscribe((res: any) => {
          if (res) {
            this.messageSer.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Employee SalaryDeduction saved',
            });
          }
          this.form.reset();
        });
    }
  }
  ngAfterViewInit() {
    this.salDeductionServ
      .getTaxDeduction()
      .subscribe((res) => (this.taxTaypes = res));
  }
}
