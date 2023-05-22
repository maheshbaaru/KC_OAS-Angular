import { Component, ChangeDetectorRef } from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EmployeeService } from 'src/app/services/employee.service';
export interface Shifts {
  //shiftId: number;
  name: string;
}
export interface Roles {
  designationId: number;
  name: string;
}
@Component({
  selector: 'app-create-new-employee',
  templateUrl: './create-new-employee.component.html',
  styleUrls: ['./create-new-employee.component.css'],
})
export class CreateNewEmployeeComponent {
  roles: any;
  //roles: Roles[];

  //Shifts: Shifts[];
  Shifts: any;
  save_button: Boolean = false;
  empForm: FormGroup;

  constructor(
    private empServ: EmployeeService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.empForm = this.fb.group({
      employeeID: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      panNumber: [null, Validators.required],
      designationName: [null, Validators.required],
      shiftName: [null, Validators.required],
      isActive: [null, Validators.required],
      doj: [null, Validators.required],
      Password: [null, Validators.required],
    });
    this.empServ.getShifts().subscribe((res) => {
      this.Shifts = res;
    });
    this.empServ.getDesignationRoles().subscribe((res) => {
      this.roles = res;
    });
  }

  get f() {
    return this.empForm.controls;
  }

  save() {
    if (this.empForm.invalid) {
      for (const control of Object.keys(this.empForm.controls)) {
        this.empForm.controls[control].markAsTouched();
        this.empForm.controls[control].markAsDirty();
      }
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'pleses fill the required fields',
        sticky: true,
      });
      return;
    } else if (this.empForm.valid) {
      let obj = {
        Id: this.empForm.value.employeeID,
        FirstName: this.empForm.value.firstName,
        LastName: this.empForm.value.lastName,
        Email: this.empForm.value.email,
        Password: this.empForm.value.Password,
        IsActive: this.empForm.value.isActive,
        EmployeeId: this.empForm.value.employeeID,
        PanNumber: this.empForm.value.panNumber,
        ShiftId: this.empForm.value.shiftName.shiftId,
        Doj: this.empForm.value.doj,
      };

      // let data = JSON.stringify(this.empForm.value);
      //this.empServ.postEmp(data);
      this.empServ.createEmployee(obj).subscribe((d) => {
        console.log(d);
        if (d) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'TaxType saved',
          });
        }
      });
    }
  }
  onchange() {
    this.save_button = this.empForm.valid;
  }
}
