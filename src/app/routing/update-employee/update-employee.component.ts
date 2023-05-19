
import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Shifts } from '../Admin/create-new-employee/create-new-employee.component';
import { Roles } from '../Admin/create-new-employee/create-new-employee.component';
import { ActivatedRoute } from '@angular/router';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {
  shifts: any;
  roles: any;
  activedRouteId: string | null;
  Result: any;
  employeeID: number;
  Email: any;
  isActive: boolean;
  FirstName: any;
  PanNumber: any;
  LastName: any;
  Doj: Date;
  SelectedDesignation: any;
  selectedShiftId: any
  checked: any;

  constructor(private _service: EmployeeService, private active: ActivatedRoute, private fb: FormBuilder) {

  }
  ngOnInit() {
    debugger;
    let id = +this.active.snapshot.params['id'];
    this._service.getShifts().subscribe(data => {
      this.shifts = data;
      console.log(this.roles);
      this._service.getDesignationRoles().subscribe(data => {
        this.roles = data;
        console.log(this.roles);
        this._service.getSpecificEmployeeById(id).subscribe(res => {
          this.Result = res;
          console.log(this.Result);
          this.employeeID = this.Result.employeeId;
          this.Email = this.Result.email;
          this.isActive = this.Result.isActive;
          this.FirstName = this.Result.firstName;
          this.PanNumber = this.Result.panNumber;
          this.LastName = this.Result.lastName;
          this.Doj = this.Result.doj;
          this.checked = this.Result.isActive;
          this.selectedShiftId = this.shifts.find((item: any) =>
            item.shiftId == this.Result.shiftId
          ),
            this.SelectedDesignation = this.roles.find((item: any) =>
              item.id == this.Result.designationId
            )
        })
      })

    })

  }


  onClickSave() {

  }

}



// import { Component } from '@angular/core';
// import { EmployeeService } from 'src/app/services/employee.service';
// import { Shifts } from '../Admin/create-new-employee/create-new-employee.component';
// import { Roles } from '../Admin/create-new-employee/create-new-employee.component';
// import { ActivatedRoute } from '@angular/router';
// import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
// @Component({
//   selector: 'app-update-employee',
//   templateUrl: './update-employee.component.html',
//   styleUrls: ['./update-employee.component.css']
// })
// export class UpdateEmployeeComponent {
//   shifts: any;
//   roles: any;
//   Result: any;
//   employeeID: number;
//   Email: any;
//   isActive: boolean;
//   FirstName: any;
//   PanNumber: any;
//   LastName: any;
//   Doj: Date;
//   SelectedDesignation: any;
//   selectedShiftId: any
//   checked: any;
//   public updateForm: FormGroup;
//   constructor(private _service: EmployeeService, private active: ActivatedRoute, private fb: FormBuilder) {

//   }
//   ngOnInit() {
//     debugger;
//     let id = +this.active.snapshot.params['id'];
//     this._service.getSpecificEmployeeById(id).subscribe(res => {
//       this.Result = res;
//       console.log(this.Result);
//     })

//     this._service.getShifts().subscribe(data => {
//       this.shifts = data;
//       console.log(this.roles);
//     })
//     this._service.getDesignationRoles().subscribe(data => {
//       this.roles = data;
//       console.log(this.roles);
//     })


//     this.updateForm = this.fb.group({
//       employeeID: this.Result.employeeId,
//       Email: this.Result.email,
//       isActive: this.Result.isActive,
//       FirstName: this.Result.firstName,
//       PanNumber: this.Result.panNumber,
//       LastName: this.Result.lastName,
//       Doj: this.Result.doj,
//       checked: this.Result.isActive,
//       electedShiftId: this.shifts.find((item: any) =>
//         item.shiftId == this.Result.shiftId
//       ),
//       SelectedDesignation: this.roles.find((item: any) =>
//         item.id == this.Result.designationId
//       )
//     })


//     console.log(this.updateForm);

//   }
//   ngAfterViewInit() {
//     this.updateForm = this.fb.group({
//       employeeId: [''],
//       email: [''],
//       isActive: [''],
//       firstName: [''],
//       PanNumber: [''],
//       lastname: [''],
//       doj: [''],
//       checked: [''],
//       shift: [''],
//       Selecteddesignation: ['']
//     })
//   }

//   onClickSave() {

//   }

// }