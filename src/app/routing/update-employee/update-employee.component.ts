import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Shifts } from '../Admin/create-new-employee/create-new-employee.component';
import { Roles } from '../Admin/create-new-employee/create-new-employee.component';
import { ActivatedRoute } from '@angular/router';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent {
  shifts: any;
  roles: any;
  Result: any;
  newArray: any;
  updatedForm: FormGroup;
  designationId: Date;
  form: any;

  submitted = false;
  constructor(
    private _service: EmployeeService,
    private active: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService, private date: DatePipe
  ) {
    this.updatedForm = this.fb.group({
      employeeID: [null, Validators.required],
      FirstName: [null, Validators.required],
      LastName: [null, Validators.required],
      Email: [null, Validators.required],
      PanNumber: [null, Validators.required],
      DesignationId: [null, Validators.required],
      shiftId: [null, Validators.required],
      checked: [null, Validators.required],
      DOJ: [null, Validators.required],
    });
  }
  get f() {
    return this.updatedForm.controls;
  }
  ngOnInit() {
    let id = +this.active.snapshot.params['id'];
    this._service.getSpecificEmployeeById(id).subscribe((res) => {
      this.Result = res;

      this._service.getShifts().subscribe((data) => {
        this.shifts = data;

        this._service.getDesignationRoles().subscribe((data) => {
          this.roles = data;

          this.updatedForm = this.fb.group({
            employeeID: this.Result.employeeId,
            Email: this.Result.email,
            checked: this.Result.isActive,
            FirstName: this.Result.firstName,
            PanNumber: this.Result.panNumber,
            LastName: this.Result.lastName,
            DOJ: this.Result.doj,
            shiftId: this.shifts.find(
              (item: any) => item.shiftId == this.Result.shiftId
            ),
            DesignationId: this.roles.find(
              (item: any) => item.id == this.Result.designationId
            ),
          });
        });
      });
    });
  }

  onSubmit(form: any) {
    if (this.updatedForm.valid) {
      this._service.UpdateEmployeeData(form).subscribe((res) => { });
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: ' Employee Details  Updated Successfully',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please  Fill The Required Fields',
      });
    }
  }
}
