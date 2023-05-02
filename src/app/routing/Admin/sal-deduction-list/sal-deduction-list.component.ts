import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-sal-deduction-list',
  templateUrl: './sal-deduction-list.component.html',
  styleUrls: ['./sal-deduction-list.component.css'],
})
export class SalDeductionListComponent {
  employeeList: any;

  constructor(
    private active: ActivatedRoute,
    private employeeSer: EmployeeService
  ) {
    console.log(this.active);
  }
  ngAfterViewInit() {
    let id = +this.active.snapshot.params['id'];
    console.log(id);
    this.employeeSer.getEmployee(id).subscribe((data: any) => {
      this.employeeList = [data];
      console.log(this.employeeList);
    });
  }
}
