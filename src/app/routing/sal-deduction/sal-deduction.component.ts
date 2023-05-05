import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { SalarydeductionlistService } from 'src/app/services/salarydeductionlist.service';
import { NgForm } from '@angular/forms';
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

  submitted: boolean;
  employee: any;
  users: any;
  productDialog: boolean;
  taxTaypes: any;
  SelectedCity1: TaxTayes[];
  selectedCity1: any;
  selectedAmount: any;
  selectedLOP: any;
  date3: Date;
  invalidDates: Date[];
  constructor(
    private employeeSer: EmployeeService,
    private salDeductionServ: SalarydeductionlistService
  ) {
    // this.taxTaypes = [
    //   { name: 'SELECT TAX' },
    //   { name: 'INCOME TAX' },
    //   { name: 'INSURANCE' },
    //   { name: 'LOP' },
    //   { name: 'PROVIDENT FUND' },
    // ];
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

        // this.employee.map((eachData:any)=>{
        //   let filterData=this.users.find((emp:any)=>emp.employeeId*1 ==eachData.empId)
        //   eachData['Name']=filterData ? filterData.firstName + filterData.lastName : "";
        //   console.log(filterData);
        // })
        // console.log(this.employee);
      });
    });
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
  save(data: NgForm) {
    console.log(data);
    this.submitted = true;

    this.SelectedCity1;
    this.selectedCity1;
    this.selectedAmount;
    this.selectedLOP;
    this.date3;
  }
  ngAfterViewInit() {
    this.salDeductionServ
      .getTaxDeduction()
      .subscribe((res) => (this.taxTaypes = res));
  }
}
