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
  constructor(private empSer: EmployeeService) {
  }
  ngOnInit() {
    let loogedUser: any = window.sessionStorage.getItem('loggedinUser')
    loogedUser = JSON.parse(loogedUser)
    this.empSer.appliedLeaves(loogedUser.id).subscribe((data: any) => {
    
    // this.employeeLeavs = data.filter((dat: any) => dat.empId == loogedUser.employeeID * 1);
    });
  }
 

}
