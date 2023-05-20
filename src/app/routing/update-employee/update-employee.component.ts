

import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Shifts } from '../Admin/create-new-employee/create-new-employee.component';
import { Roles } from '../Admin/create-new-employee/create-new-employee.component';
import { ActivatedRoute } from '@angular/router';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {
  shifts: any;
  roles: any;
  Result: any;

  updatedForm: FormGroup;
  constructor(private _service: EmployeeService, private active: ActivatedRoute, private fb: FormBuilder) {
    this.updatedForm = this.fb.group({
      employeeID: new FormControl({
        value: '',
        disabled: true,
      }),
      FirstName: new FormControl({
        value: '',
        disabled: false,
      }),
      LastName: new FormControl({
        value: '',
        disabled: false,
      }),
      Email: new FormControl({
        value: '',
        disabled: false,
      }),
      PanNumber: new FormControl({
        value: '',
        disabled: false,
      }),
      DesignationId: new FormControl({
        value: '',
        disabled: false,
      }),
      shiftId: new FormControl({
        value: '',
        disabled: false,
      }),
      checked: new FormControl({
        value: '',
        disabled: false,
      }),
      DOJ: new FormControl({
        value: '',
        disabled: false,
      }),
    });
  }
  ngOnInit() {
    debugger;
    let id = +this.active.snapshot.params['id'];
    this._service.getSpecificEmployeeById(id).subscribe(res => {
      this.Result = res;
      console.log(this.Result);
      this._service.getShifts().subscribe(data => {
        this.shifts = data;
        console.log(this.roles);
        this._service.getDesignationRoles().subscribe(data => {
          this.roles = data;
          console.log(this.roles);
          this.updatedForm = this.fb.group({
            employeeID: this.Result.employeeId,
            Email: this.Result.email,
            checked: this.Result.isActive,
            FirstName: this.Result.firstName,
            PanNumber: this.Result.panNumber,
            LastName: this.Result.lastName,
            DOJ: this.Result.doj,
            shiftId: this.shifts.find((item: any) =>
              item.shiftId == this.Result.shiftId
            ),
            DesignationId: this.roles.find((item: any) =>
              item.id == this.Result.designationId
            )
          })
        })
      })
    })
    console.log(this.updatedForm);
  }

  // onSubmit() {
  //   this.updatedForm = { ...this.updatedForm.value };
  //   this._service.UpdateEmployeeData(this.updatedForm.value);
  // }

}



