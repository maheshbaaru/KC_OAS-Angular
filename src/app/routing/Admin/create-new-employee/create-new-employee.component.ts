import { formatDate } from '@angular/common';
import { Component, ChangeDetectorRef, Inject, LOCALE_ID } from '@angular/core';
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
    private messageService: MessageService,
    @Inject(LOCALE_ID) public local: string,

  ) { }

  ngOnInit() {
    debugger;
    this.empForm = this.fb.group({
      employeeID: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
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
    debugger;
    if (this.empForm.invalid) {
      for (const control of Object.keys(this.empForm.controls)) {
        this.empForm.controls[control].markAsTouched();
        this.empForm.controls[control].markAsDirty();
      }

      this.messageService.add(
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Please fill the required fields',

        });

    }
    else if (
      this.empForm.valid
    ) {

      let obj = {
        designationId: this.empForm.value.designationName.id,
        FirstName: this.empForm.value.firstName,
        LastName: this.empForm.value.lastName,
        Email: this.empForm.value.email,
        Password: btoa(this.empForm.value.Password),
        IsActive: this.empForm.value.isActive,
        EmployeeId: this.empForm.value.employeeID,
        PanNumber: this.empForm.value.panNumber,
        ShiftId: this.empForm.value.shiftName.shiftId,
        Doj: formatDate(this.empForm.value.doj, 'YYYY-MM-dd', this.local)
      }


      // let data = JSON.stringify(this.empForm.value);
      //this.empServ.postEmp(data);
      this.empServ.createEmployee(obj).subscribe((res) => {
        //   console.log(d);
        if (res) {
          return this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'created Employee Data Saved Successfully',

          });
        }
      });
    }
  }
  onchange() {
    this.save_button = this.empForm.valid;
  }
}
