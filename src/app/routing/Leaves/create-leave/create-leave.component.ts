import { Component, Inject, LOCALE_ID } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DatePipe, formatDate } from '@angular/common';

import { LeavesService } from 'src/app/services/leaves.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

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
  id:any;
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
    private route:Router,  @Inject(LOCALE_ID) public local: string,
  ) {}

  ngOnInit(): void {
    this._leaveservice
      .getLeaveType()
      .subscribe((res) => (this.leaveTypes = res));
      
    this.empForm = this.formBuilder.group({
    
    
      leaveTypeId: new FormControl({
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
     const diffTime = Math.abs(this.empForm.value.ToDate.getTime() - this.empForm.value.FromDate.getTime());

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
console.log(diffDays)
  
    this.leaveTypeId = this.empForm.value.leaveTypeId.id;
    this.FromDate = formatDate(this.empForm.value.FromDate, 'YYYY-MM-dd', this.local);
    this.ToDate = formatDate(this.empForm.value.ToDate,'YYYY-MM-dd', this.local);
    this.StatusId = this.empForm.value.StatusId;
    this.Comments = this.empForm.value.Comments;

    this._leaveservice.applyleave(this.leaveTypeId,this.FromDate,this.ToDate,this.StatusId,this.Comments,diffDays).subscribe((res: any) => {
      // console.log(res);
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
      
      }

    });
    this.empForm.reset();
    this.route.navigate(['/navbar']);
      
  }
}