import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { SalarydeductionlistService } from 'src/app/services/salarydeductionlist.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { Inject, LOCALE_ID } from '@angular/core';
import { from } from 'rxjs';
import { MessageService } from 'primeng/api';

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
  SelectedCity1: TaxTayes[];
  selectedCity1: any;
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
    private salDeductionServ: SalarydeductionlistService,
    private fb: FormBuilder,
    @Inject(LOCALE_ID) public local: string,
    private messageSer: MessageService
  ) {
    // this.taxTaypes = [
    //   { name: 'SELECT TAX' },
    //   { name: 'INCOME TAX' },
    //   { name: 'INSURANCE' },
    //   { name: 'LOP' },
    //   { name: 'PROVIDENT FUND' },
    // ];
    this.form = fb.group({
      TaxTypeId: [null, Validators.required],
      EmpId: [null, Validators.required],
      Amount: [null, Validators.required],
      LOPDAYS: [null, Validators.required],
      Month: [[], Validators.required],
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
          Name: `${person.firstName} ${person.lastName}`,
        }));
        this.employeeName = employeeData;
        console.log(employeeData);

        // this.employee.map((eachData:any)=>{
        //   let filterData=this.users.find((emp:any)=>emp.employeeId*1 ==eachData.empId)
        //   eachData['Name']=filterData ? filterData.firstName + filterData.lastName : "";
        //   console.log(filterData);
        // })
        // console.log(this.employee);
      });
    });
    this.cols = [
      { field: 'employeeId', header: 'EmployeeId' },
      { field: 'Name', header: 'Name' },
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
    debugger;
    // this.salDeductionServ.AddDeduction();
    console.log(this.form);

    this.taxType = this.form.value.TaxTypeId.id;
    this.employeeId = this.form.value.EmpId.employeeId;
    this.selectedAmount = this.form.value.Amount;
    this.selectedLOP = this.form.value.LOPDAYS;
    (this.month = formatDate(this.form.value.Month, 'YYYY-MM-dd', this.local)),
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
        console.log(res);
        if (res !== null && res !== res.statusText && res !== res.type) {
          this.messageSer.add({
            severity: 'success',
            summary: 'Success',
            detail: 'TaxType saved',
          });
        }

        if (this.taxType === '' && this.taxType === null) {
          this.messageSer.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Please gave a TaxType',
          });
        }
      });
    //
    this.form.reset();
  }
  ngAfterViewInit() {
    this.salDeductionServ
      .getTaxDeduction()
      .subscribe((res) => (this.taxTaypes = res));
    // this.employeeSer.getEmp().subscribe((res) =>{
    //   this.salDeduction =res
    // } );
  }
}
