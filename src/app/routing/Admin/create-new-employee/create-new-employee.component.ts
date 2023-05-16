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
      isActive: [''],
      doj: [''],
      Password: [''],
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
    console.log(this.empForm);
    console.log(this.empForm.value);
    // let data = JSON.stringify(this.empForm.value);
    //this.empServ.postEmp(data);
    this.empServ.createEmployee(
      this.empForm.value.firstName,
      this.empForm.value.lastName,
      this.empForm.value.email,
      this.empForm.value.password,
      this.empForm.value.isActive,
      this.empForm.value.EmployeeId,
      this.empForm.value.panNumber,
      this.empForm.value.shiftName.shiftId,
      this.empForm.value.doj,
      this.empForm.value.designationName.id

    );
  }
  onchange() {
    console.log(this.empForm.invalid, this.empForm.status);
    this.save_button = this.empForm.valid;
  }
}
