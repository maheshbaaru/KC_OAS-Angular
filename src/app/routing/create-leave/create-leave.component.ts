import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { LeavesService } from 'src/app/services/leaves.service';

interface LeaveType {
  name: string;
}

@Component({
  selector: 'app-create-leave',
  templateUrl: './create-leave.component.html',
  styleUrls: ['./create-leave.component.css'],
})
export class CreateLeaveComponent {
  leaveTypes: any | object;
  empForm: FormGroup;
  leaveTypeId:any
  FromDate: any;
  ToDate: any;
  StatusId: any;
  Comments: any;
  // empForm = new  FormGroup({
  //   empId: new FormControl('', [Validators.required]),
  //   leaveTypeId: new FormControl('', [Validators.required]),
  //   nOfLeaves: new FormControl('', [Validators.required]),
  //   year: new FormControl('', [Validators.required]),
  //   remainingLeaves: new FormControl('', [Validators.required]),

  // });

  constructor(
    private _fb: FormBuilder,
    private _leaveservice: LeavesService,
    private formBuilder: FormBuilder,
    private messageServ: MessageService,
    private route:Router
  ) {}

  ngOnInit(): void {
    this._leaveservice
      .getLeaveType()
      .subscribe((res) => (this.leaveTypes = res));
    this.empForm = this.formBuilder.group({
      LeaveTypeId: new FormControl({
        value: '',
        disabled: false,
      }),
      FromDate: new FormControl({
        value: '',
        disabled: false,
      }),
      ToDate: new FormControl({
        value: '',
        disabled: false,
      }),
      StatusId: new FormControl({
        value: '',
        disabled: false,
      }),
      Comments: new FormControl({
        value: '',
        disabled: false,
      }),
    });
   
  }

  onFormSubmit() {
   
    console.log(this.empForm.value)

    this.leaveTypeId = this.leaveTypes = this.empForm.value.leaveType;
    this.FromDate = this.empForm.value.FromDate;
    this.ToDate = this.empForm.value.ToDate;
    this.StatusId = this.empForm.value.ToDate;
    this.Comments = this.empForm.value.ToDate;

    this._leaveservice.applyleave(this.leaveTypeId,this.FromDate,this.ToDate,this.StatusId,this.Comments).subscribe((res: any) => {
      console.log(res);
      if (res !== null && res !== res.statusText && res !== res.type) {
        this.messageServ.add({
          severity: 'success',
          summary: 'Success',
          detail: 'EmployeeLeaves saved',
        });
      } else {
        this.messageServ.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please gave EmployeeLeaves data',
        });
        this.empForm.reset();
      }
    });
    // this._leaveservice.applyleave().subscribe((res: any) => {
    //   console.log(res);
    //   if (res !== null && res !== res.statusText && res !== res.type) {
    //     this.messageServ.add({
    //       severity: 'success',
    //       summary: 'Success',
    //       detail: 'EmployeeLeaves saved',
        
    //     });
    //   } else {
    //     this.messageServ.add({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: 'Please gave EmployeeLeaves data',
    //     });
    //   }
    // });
    // this.empForm.reset();
    // if (this.empForm.valid) {
    //   console.log(this.empForm.value);
    // }
  }
}
