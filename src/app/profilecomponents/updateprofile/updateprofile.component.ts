import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeedDataService } from 'src/app/services/EmployeesDataService';
import { HttpClientService } from 'src/app/services/http-client.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthguardService } from 'src/app/services/authguard.service';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css'],
})
export class UpdateprofileComponent {
  empdata: any;
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
      employeeID: [new FormControl({
        value: '',
        disabled: false,
      }),Validators.required],
      firstName: [new FormControl({
        value: '',
        disabled: false,
      }),Validators.required],
      lastName:[ new FormControl({
        value: '',
        disabled: false,
      }),Validators.required],
      email: [new FormControl({
        value: '',
        disabled: false,
      }),Validators.required],
      panNumber:[new FormControl({
        value: '',
        disabled: false,
      }),Validators.required],
      designationName: new FormControl({
        value: '',
        disabled: true,
      }),
      shiftName:new FormControl({
        value: '',
        disabled: true,
      }),
      isActive: new FormControl({
        value: '',
        disabled: false,
      }),
      doj: new FormControl({
        value: '',
        disabled: true,
      }),
    });

    this.formdataget();
  }
  userdata: any;
  formdataget() {
    // console.log(this.updateform);
    let data: any = window.sessionStorage.getItem('loggedinUser');
    this.userdata = JSON.parse(data);
    // this.updateform.patchValue(this.userdata);
    console.log(data);
    this.service.getEmployeeById(this.userdata.id).subscribe(res=>{
      let userdata = JSON.parse(res);
      this.updateform.patchValue(userdata)
    })
    // if (!this.userdata.isActive) this.updateform.controls['isActive'].disable();
    // this.service.getEmployeeList().subscribe((data1: any) => {
    //   console.log(data1);
    //   // this.updateform = data.filter((dat: any) => dat.empId == data.id * 1);
    //   // this.empdata = data.filter((dat: any) => dat.empId == userdata.id * 1);
    // //  this.updateform.get('email')?.setValue(data.email);
    // this.updateform.patchValue(userdata);
    //  if (!userdata.isActive) this.updateform.controls['isActive'].disable();
    //  });
  }

  //  formdataget() {
  //   this.service.getEmployeeList().subscribe((data1: any) => {
  //     console.log(data1);
  //     this.updateform.setValue(data1);
  //     if (!data1.isActive) this.updateform.controls['isActive'].disable();
  //   });
  // }
  upadteprofile(updateData: any) {
    this.service.updateprofile(this.updateform.value,this.userdata.id);
    this.service.getEmployeeById(this.userdata.id).subscribe(res=>{
      this.updateform.patchValue(res)
    })
    this.router.navigate(['./Employees']);
  }
}
