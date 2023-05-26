import { Component, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-sal-deduction-list',
  templateUrl: './sal-deduction-list.component.html',
  styleUrls: ['./sal-deduction-list.component.css'],
})
export class SalDeductionListComponent {
  employeeList: any;
  cols: { field: string; header: string }[];

  constructor(
    private active: ActivatedRoute,
    private employeeSer: EmployeeService,
    @Inject(LOCALE_ID) public local: string
  ) {}
  ngOnInit() {
    this.cols = [
      { field: 'empId', header: 'EmployeeId' },
      { field: 'taxTypeId', header: 'TaxTypes' },
      { field: 'amount', header: 'Amount' },
      { field: 'taxDescription', header: 'TaxDescription' },
      { field: 'effectedMonth', header: 'EffectedMonth' },
      { field: 'noOfLopdays', header: 'No Of LOP Days' },
    ];
  }
  ngAfterViewInit() {
    let id = this.active.snapshot.params['id'].replace('KC', '');

    this.employeeSer.getEmployee(id).subscribe((data: any) => {
      this.employeeList = data;

      const salDeduction = this.employeeList.map((person: any) => ({
        ...person,
        effectedMonth: formatDate(
          person.effectedMonth,
          'YYYY-MM-dd',
          this.local
        ),
        empId:
          person.empId < 10
            ? 'KC00' + person.empId
            : person.empId && person.empId < 100
            ? 'KC0' + person.empId
            : person.empId && person.employeeId >= 100
            ? 'KC' + person.employeeId
            : person.employeeId,

        Name: `${person.firstName ? person.firstName : ''} ${
          person.lastName ? person.lastName : ''
        }`,
      }));
      this.employeeList = salDeduction;
    });
  }
}
