import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Shifts } from '../Admin/create-new-employee/create-new-employee.component';
import { Roles } from '../Admin/create-new-employee/create-new-employee.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {
  selectedValue: any;
  selectedShift: any;
  shifts: any;
  roles: any;
  constructor(private _service: EmployeeService, private active: ActivatedRoute) {

  }
  ngOnInit() {
    let id = this.active.snapshot.params['id'];
   
    this._service.getDesignationRoles().subscribe(data => {
      this.roles = data;

      console.log(this.roles);
    })

    this._service.getShifts().subscribe(data => {
      this.shifts = data;
      console.log(this.shifts);
    })
  }

}
