import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import namesData from 'src/assets/data/namesData.json';
import { OnInit, ViewChild } from '@angular/core';
// import { EmployeeData, Representative } from 'src/app/employee';
import { Table } from 'primeng/table';
import { EmployeeData, Representative } from 'src/app/Modesls/employee';

import { SalaryService } from '../../services/salary.service';
import salary from 'src/assets/data/salary.json';
import { from } from 'rxjs';
import { HttpClientService } from 'src/app/services/http-client.service';
import { MessageService } from 'primeng/api';

interface EmployeeName {
  Name: string;
}

interface LeaveType {
  name: string;
}

@Component({
  selector: 'app-modifypassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css'],
})
export class ChangepasswordComponent {
  employees: EmployeeData[] | any;
  leaveTypes: LeaveType[];
  designationID: number;
  employeeID: number;
  names: EmployeeName[];
  isActive: boolean;
  logedUser: any;

  // empForm: FormGroup;
  form: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private salaryService: SalaryService,
    private httpService: HttpClientService,
    private messageSer: MessageService
  ) {
    this.names = namesData;
    this.leaveTypes = [
      { name: 'Casual' },
      { name: 'Sick' },
      { name: 'Earned' },
      { name: 'Compensation' },
      { name: 'Optional' },
    ];
    this.form = this._fb.group({
      oldPass: [null, Validators.required],
      newPass: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/ ),Validators.minLength(8), ],
      ],
      confirmPass: [
        null,
        [
          Validators.required,
          Validators.pattern( /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/ ), 
            Validators.minLength(8),], ],
    });
  }
  formSubmit() {
    if (this.form.invalid) {
      for (const control of Object.keys(this.form.controls)) {
        this.form.controls[control].markAsTouched();
        this.form.controls[control].markAsDirty();
      }
      this.messageSer.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill the required fields',
        sticky: true,
      });
      return;
    } else if (this.form.valid) {
      let logedUser: any = window.sessionStorage.getItem('auth-user');
      logedUser = JSON.parse(logedUser);
      this.designationID = logedUser.designationID;
      this.employeeID = logedUser.employeeID * 1;
      this.isActive = logedUser.isActive;

      const oldPassword = atob(logedUser.password);
      this.logedUser = oldPassword;

      if (
        oldPassword === this.form.value.oldPass &&
        this.form.value.newPass !== this.form.value.oldPass &&
        this.form.value.newPass === this.form.value.confirmPass
      ) {
        const finalPass = btoa(this.form.value.confirmPass);
        this.httpService
          .updatePassword(finalPass, this.employeeID)
          .subscribe((res: any) => {
            if (res) {
              return this.messageSer.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Your Password Saved Successfully',
              });
            }
            this.form.reset();
          });
      }
    }
  }
}
