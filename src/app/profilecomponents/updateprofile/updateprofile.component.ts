import { Component, LOCALE_ID,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeedDataService } from 'src/app/services/EmployeesDataService';
import { HttpClientService } from 'src/app/services/http-client.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { AuthguardService } from 'src/app/services/authguard.service';
import { MessageService } from 'primeng/api';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css'],
})
export class UpdateprofileComponent {
  empdata: any;
  submitted = false;
  isAct = true;
  public updateform: FormGroup;
 
  doj: string;

  constructor(
    private router: Router,
    private service: EmployeedDataService,
    private designatonservice: HttpClientService,
    private formBuilder: FormBuilder,
    private authServ: AuthguardService,
 
    private messageService: MessageService,
    @Inject(LOCALE_ID) public local: string,
  
  ) {}

  get f(): { [key: string]: AbstractControl } {
    return this.updateform.controls;
  }

  ngOnInit(): void {
    this.updateform = this.formBuilder.group({
      employeeId: new FormControl({
        value: '',
        disabled: true,
      }),
      // employeeId: ['', Validators.required ,disabled: true,],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      panNumber: ['', Validators.required],
      designationId: new FormControl({
        value: '',
        disabled: true,
      }),
      shiftId: new FormControl({
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
    let data: any = window.sessionStorage.getItem('loggedinUser');
    this.userdata = JSON.parse(data);
    //  this.updateform.patchValue(this.userdata);
    // this.doj = formatDate(
    //   this.updateform.value.doj,
    //   'MM-dd-YYYY',
    //   this.local
    // );
   
    this.GetEmployee();
    if (!this.userdata.isActive) this.updateform.controls['isActive'].disable();
    // this.service.getEmployeeList().subscribe((data1: any) => {

    //  this.updateform = data1.filter((dat: any) => dat.empId == data1.id * 1);
    // this.empdata = data.filter((dat: any) => dat.empId == this.userdata.id * 1);
    // // //  this.updateform.get('email')?.setValue(data.email);
    // this.updateform.patchValue(this.userdata);
    // //  if (!userdata.isActive) this.updateform.controls['isActive'].disable();
    // });

  }

  //  formdataget() {
  //   this.service.getEmployeeList().subscribe((data1: any) => {

  //     this.updateform.setValue(data1);
  //     if (!data1.isActive) this.updateform.controls['isActive'].disable();
  //   });
  // }
  upadteprofile(updateData: any) {
    if (this.updateform.invalid) {
      for (const control of Object.keys(this.updateform.controls)) {
        this.updateform.controls[control].markAsTouched();
        this.updateform.controls[control].markAsDirty();
      }
   

      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'pleses fill the required fields',
        sticky: true,
      });
      return;
    } else if (this.updateform.valid) {
     
      this.service
        .updateprofile(this.updateform.value, this.userdata.id)
        .subscribe((res) => {
          if (res) {
            this.GetEmployee();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Designation saved',
            });
          }
        });
      this.submitted = true;

     
      
      // this.router.navigate(['navbar/Employees']);
    }
  }
 
  GetEmployee() {
    this.service.getEmployeeById(this.userdata.id).subscribe((res) => {
      this.updateform.patchValue(res);
      // this.submitted = true;
      
      
        
     
     
      for (const control of Object.keys(this.updateform.controls)) {
        this.updateform.controls[control].markAsTouched();
      }
    });
  }
}
