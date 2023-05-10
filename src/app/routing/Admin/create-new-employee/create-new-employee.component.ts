import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
interface Shifts {
  name: string;
}
interface Roles{
  name:string;
}
@Component({
  selector: 'app-create-new-employee',
  templateUrl: './create-new-employee.component.html',
  styleUrls: ['./create-new-employee.component.css'],
})
export class CreateNewEmployeeComponent {
   roles:Roles[];
  selectedrole: any;
  shifts:Shifts[];
  Shifts: any;
  save_button: Boolean = false;
  empForm: FormGroup;

  constructor(private empServ: EmployeeService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.empForm = this.fb.group({
      // employeeID: new FormControl({
      //   value: '',
      //   disabled: false
      // },Validators.required),
      employeeID:[''],

      firstName:[''],
      lastName:[''],
      email:[''],
      panNumber:[''],
      designationName:[''],
      shiftName:[''],
      isActive:[''],
      doj:[''],
      designationID: [''],
      Password: [''],

    });

    // this.Shifts = [
    //   { name: 'selectShift' },
    //   { name: 'First Shift' },
    //   { name: 'Second Shift' }
    // ];
    // this.Shifts = ['selectShift', 'FirstShift', 'SecondShift'];
    // this.roles = [
    //   'Accountant',
    //   'InVoiceSpecialist',
    //   'HRExecutive',
    //   'QALead',
    //   'SoftWareDeveloper',
    //   'SoftwareEngineer',
    //   'SoftwareTrainee',
    //   'QALead',
    //   'QA Trainee',
    //   'Tech Lead',
    //   'UI Designer',
    //   'Sr.SoftwareDeveloper',
    //   'Project Manager',
    //   'Sr.SoftwareEngineer',
    //   'Sr.QA',
    // ];
    // this.roles = [
    //   { name: "Accountant" },
    //   { name: "InVoiceSpecialist" },
    //   { name: "HRExecutive" },
    //   { name: "QALead" },
    //   { name: "SoftWareDeveloper" },
    //   { name: "SoftwareEngineer" },
    //   { name: "SoftwareTrainee" },
    //   { name: "QALead" },
    //   { name: "QA Trainee" },
    //   { name: "Tech Lead" },
    //   { name: "UI Designer" },
    //   { name: "Sr.SoftwareDeveloper" },
    //   { name: "Project Manager" },
    //   { name: "Sr.SoftwareEngineer" },
    //   { name: "Sr.QA" }
    // ];
    //  this.selectedrole;

    // this.save();
    this.empServ.getShifts().subscribe((res) => {
         this.Shifts = res;
       });
     this.empServ.getDesignationRoles().subscribe((res)=>{
      this.roles=res;
     })

  }




  ngAfterViewInit(data: any) {
    // this.empServ.postcreateemployee(data).subscribe((data:any ) => {
    //   this.roles = data;
    // });
    // this.empServ.getShifts().subscribe((res) => {
    //   this.Shifts = res;
    // });
  }
  save() {
    console.log(this.empForm.value)
    let data = JSON.stringify(this.empForm.value)
    // this.empServ.postEmp(data)

  }
  onchange() {
    console.log(this.empForm.invalid, this.empForm.status)
    this.save_button = this.empForm.valid
  }

}
