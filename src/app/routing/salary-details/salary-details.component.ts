import { Component, ViewChild } from '@angular/core';
//import salary from './salary.json';
import { Table } from 'primeng/table';
import { SalaryService } from 'src/app/services/salary.service';
import { EmployeeData, Representative } from 'src/app/employee';
import{ Employee} from 'src/app/employeBankInterface';
@Component({
  selector: 'app-salary-details',
  templateUrl: './salary-details.component.html',
  styleUrls: ['./salary-details.component.css', './salary-details.scss'],
})


export class SalaryDetailsComponent {
 // sample = salary;
 empSalDetails:EmployeeData[];
  representatives: Representative[] = [];
  @ViewChild('dt') table: Table;

  //employees: EmployeeData[] | any;
  constructor(private salaryService: SalaryService) { }

  ngOnInit() {
    // this.salaryService
    //   .getEmployee()
    //   .then((employees: any) => (this.employees = employees));
    this.salaryService.getEmployee().subscribe(data => {
      debugger;
      this.empSalDetails = data;
      
      
      console.log(this.empSalDetails);
    })
  }
}
