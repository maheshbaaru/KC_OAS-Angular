import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EmployeService } from 'src/app/services/employeBankService';
import { EmployeeService } from 'src/app/services/employee.service';
import { LeavesService } from 'src/app/services/leaves.service';

@Component({
  selector: 'app-apppled-leaves',
  templateUrl: './apply-leaves.component.html',
  styleUrls: ['./apply-leaves.component.css'],
})
export class ApplyLeavesComponent {
  employeeLeavs: any;
  appliedLeaves: any;
  constructor(private empSer: EmployeeService,private leaveServ:LeavesService) {
    // this.empSer.appliedLeaves().subscribe((data) => {
    //   this.employeeLeavs = data;
    //   console.log(data);
    // });
  }
  ngOnInit() {
    this.empSer.appliedLeaves().subscribe((data) => {
      this.employeeLeavs = data;
      console.log(data);
    });
  }
 

}
