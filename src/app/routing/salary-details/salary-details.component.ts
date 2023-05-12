import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { SalaryService } from 'src/app/services/salary.service';
import { EmployeeData, Representative } from 'src/app/Modesls/employee';

@Component({
  selector: 'app-salary-details',
  templateUrl: './salary-details.component.html',
  styleUrls: ['./salary-details.component.css', './salary-details.scss'],
})


export class SalaryDetailsComponent {
  empSalDetails: EmployeeData[];
  
  representatives: Representative[] = [];
  @ViewChild('dt') table: any;
  id:number;
  employees: EmployeeData[] | any;
  constructor(private salaryService: SalaryService,
  ) { }

  ngOnInit() {
    this.salaryService. getEmployeesalaryDetails().subscribe(data => {
      this.empSalDetails = data;
    })
  }
  // getEmployeeById(id: number) {
  //    debugger;
  //    console.log(id);
  // }
}
