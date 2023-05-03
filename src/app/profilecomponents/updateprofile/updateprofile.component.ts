import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeedDataService } from 'src/app/services/EmployeesDataService';
import { HttpClientService } from 'src/app/services/http-client.service';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { AuthguardService } from 'src/app/services/authguard.service';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css'],
})
export class UpdateprofileComponent {
  empdata: any;
  dendata: any;
  public updateform: FormGroup;

  constructor(
    private router: Router,
    private service: EmployeedDataService,
    private designatonservice: HttpClientService,
    private formBuilder: FormBuilder,
    private authServ: AuthguardService
  ) {}

  ngOnInit(): void {
    this.updateform = this.formBuilder.group({
      employeeID: new FormControl({
        value: '',
        disabled: false,
      }),
      firstName: new FormControl({
        value: '',
        disabled: false,
      }),
      lastName: new FormControl({
        value: '',
        disabled: false,
      }),
      email: new FormControl({
        value: '',
        disabled: false,
      }),
      panNumber: new FormControl({
        value: '',
        disabled: false,
      }),
      designationName: new FormControl({
        value: '',
        disabled: false,
      }),
      shiftName: new FormControl({
        value: '',
        disabled: false,
      }),
      isActive: new FormControl({
        value: '',
        disabled: false,
      }),
      doj: new FormControl({
        value: '',
        disabled: false,
      }),
    });

    this.formdataget();
  }

  formdataget() {
    this.service.getEmployeeList().subscribe((data1: any) => {
      console.log(data1);
      this.updateform.setValue(data1);
      if (!data1.isActive) this.updateform.controls['isActive'].disable();
    });
  }

  formdatpost() {
    this.designatonservice.postdesignation((data: any) => {
      console.log(data);
      this.dendata = data;
    });
  }
}
