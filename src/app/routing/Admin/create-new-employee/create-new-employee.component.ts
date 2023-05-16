import { Component, ChangeDetectorRef } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.empForm = this.fb.group({

      employeeID: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      panNumber: [''],
      designationName: [''],
      shiftName: [''],
      isActive: new FormControl<string | null>(null),
      doj: [''],
      Password: [''],
      // employeeID: '',
      // firstName: '',
      // lastName: '',
      // email: '',
      // panNumber: '',
      // designationName: '',
      // shiftName: '',
      // isActive: '',
      // doj: '',
      // designationID: '',
      // Password: '',
    });
    this.empServ.getShifts().subscribe((res) => {
      this.Shifts = res;
    });
    this.empServ.getDesignationRoles().subscribe((res) => {
      this.roles = res;
    });
  }
  save() {
    debugger;
    console.log(this.empForm.value);
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
      Doj: this.empForm.value.doj
    }
    console.log(obj)
    // let data = JSON.stringify(this.empForm.value);
    //this.empServ.postEmp(data);
    this.empServ.createEmployee(obj).subscribe((d) => {
      console.log(d);
    });
  }
  onchange() {
    console.log(this.empForm.invalid, this.empForm.status);
    this.save_button = this.empForm.valid;
  }
}
