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
  //roles: any;
  roles: Roles[];
  selectedrole: any;
  Shifts: Shifts[];
  //Shifts: any;
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
      designationID: [''],
      Password: [''],
    });

    this.empServ.getShifts().subscribe((res) => {
      this.Shifts = res;
    });
    this.empServ.getDesignationRoles().subscribe((res) => {
      this.roles = res;
    });
  }

  ngAfterViewInit(data: any) {
    // this.empServ.postEmp(data).subscribe((data: any) => {
    //   this.roles = data;
    // });
    // this.empServ.getShifts().subscribe((res) => {
    //   this.Shifts = res;
    // });
    // this.empServ.createEmployee()





  }
  save() {
    console.log(this.empForm.value);
    debugger;
    let data = JSON.stringify(this.empForm.value);
    //  this.empServ.postEmp(data);
   // this.empServ.createEmployee(data.firstName)
    this.empServ.createEmployee(data);
  }
  onchange() {
    console.log(this.empForm.invalid, this.empForm.status);
    this.save_button = this.empForm.valid;
  }
}
