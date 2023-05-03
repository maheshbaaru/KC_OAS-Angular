import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
// interface Shifts {
//   name: string;
// }
// interface Roles{
//   name:string;
// }
@Component({
  selector: 'app-create-new-employee',
  templateUrl: './create-new-employee.component.html',
  styleUrls: ['./create-new-employee.component.css'],
})
export class CreateNewEmployeeComponent {
  roles: any;
  // roles:Roles[];
  selectedrole: any;
  //Shifts:Shifts[];
  Shifts: any;
  constructor(private empServ: EmployeeService) {}
  ngOnInit() {
    // this.Shifts = [
    //   {name:'selectShift'},
    //   {name:'First Shift' },
    //   {name:'Second Shift'}
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
    // this.roles=[
    //   {name:   "Accountant"},
    //   {name: "InVoiceSpecialist"},
    //   {name: "HRExecutive"},
    //   {name: "QALead"},
    //   {name: "SoftWareDeveloper"},
    //   {name: "SoftwareEngineer"},
    //   {name: "SoftwareTrainee"},
    //   {name: "QALead"},
    //   {name: "QA Trainee"},
    //   {name: "Tech Lead"},
    //   {name: "UI Designer"},
    //   {name: "Sr.SoftwareDeveloper"},
    //   {name: "Project Manager"},
    //   {name: "Sr.SoftwareEngineer"},
    //   {name: "Sr.QA"}
    //    ];
    // this.selectedrole;
  }
  ngAfterViewInit() {
    this.empServ.getDesignationRoles().subscribe((res) => {
      this.roles = res;
    });
    this.empServ.getShifts().subscribe((res) => {
      this.Shifts = res;
    });
  }
}
