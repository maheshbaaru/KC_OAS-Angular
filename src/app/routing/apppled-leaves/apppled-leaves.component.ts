import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EmployeService } from 'src/app/employeBankService';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-apppled-leaves',
  templateUrl: './apppled-leaves.component.html',
  styleUrls: ['./apppled-leaves.component.css'],
})
export class ApppledLeavesComponent {
  employeeLeavs: any;
  appliedLeaves: any;
  constructor(private empSer: EmployeeService) {
    this.empSer.appliedLeaves().subscribe((data) => {
      this.employeeLeavs = data;
      console.log(data);
    });
  }
  ngOnInit() {
    this.empSer.appliedLeaves().subscribe((data) => {
      this.appliedLeaves = data;
    });
  }
  // ngOnInit() {}
}
