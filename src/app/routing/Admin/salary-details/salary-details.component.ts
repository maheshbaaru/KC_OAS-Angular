import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { SalaryService } from 'src/app/services/salary.service';
import { EmployeeData, Representative } from 'src/app/Modesls/employee';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-salary-details',
  templateUrl: './salary-details.component.html',
  styleUrls: ['./salary-details.component.css', './salary-details.scss'],
})
export class SalaryDetailsComponent {
  empSalDetails: EmployeeData[];

  representatives: Representative[] = [];
  @ViewChild('dt') table: any;
  id: number;
  employees: EmployeeData[] | any;
  constructor(
    private salaryService: SalaryService,
    @Inject(LOCALE_ID) public local: string
  ) {}

  ngOnInit() {
    this.salaryService.getEmployeesalaryDetails().subscribe((data) => {
      this.empSalDetails = data;
      const salDetails = this.empSalDetails.map((person: any) => ({
        ...person,
        Eid:
          person.empId < 10
            ? 'KC00' + person.empId
            : person.empId < 100
            ? 'KC0' + person.empId
            : person.empId >= 100
            ? 'KC' + person.empId
            : person.empId,

        Name: `${person.firstName ? person.firstName : ''} ${
          person.lastName ? person.lastName : ''
        }`,
        lastRevisedDate: formatDate(
          person.lastRevisedDate,
          'MM-dd-yyyy',
          this.local
        ),
        nextRevisedDate: formatDate(
          person.nextRevisedDate,
          'MM-dd-yyyy',
          this.local
        ),
      }));

      this.empSalDetails = salDetails;
      console.log(this.empSalDetails);
    });
  }
  // getEmployeeById(id: number) {

  // }
}
