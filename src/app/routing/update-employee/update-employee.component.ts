import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Shifts } from '../Admin/create-new-employee/create-new-employee.component';
import { Roles } from '../Admin/create-new-employee/create-new-employee.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {
  shifts: Shifts[] |any;
  roles: Roles[] | any;
  constructor(private _service: EmployeeService,private active:ActivatedRoute) {

  }
  ngOnInit() {
    let id=this.active.snapshot.params['id'];   
    //   this.Shifts=["selectShift","FirstShift","SecondShift"];
    //   this.roles=[ "Accountant",
    //   "InVoiceSpecialist",
    //    "HRExecutive",
    //    "QALead",
    //    "SoftWareDeveloper",
    //    "SoftwareEngineer",
    //    "SoftwareTrainee",
    //   "QALead",
    //    "QA Trainee",
    //    "Tech Lead",
    //   "UI Designer",
    //    "Sr.SoftwareDeveloper",
    //   "Project Manager",
    //    "Sr.SoftwareEngineer",
    //    "Sr.QA"
    //   ];
    // }

// this._service.getShifts().subscribe(data=>{
//    this.shifts=JSON.stringify(data);
//    console.log(this.shifts);


  //})








  }
  




}
