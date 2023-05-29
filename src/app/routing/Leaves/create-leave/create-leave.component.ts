import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { formatDate } from '@angular/common';

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
  statusTypes: any | object;
  empForm: FormGroup;
  leaveTypeId: any;
  FromDate: any;
  ToDate: any;
  StatusId: any;
  Comments: any;
  id: any;
  submitted = false;
  isLoggedIn = false;
  status: any;

  constructor(
    private _fb: FormBuilder,
    private _leaveservice: LeavesService,
    private formBuilder: FormBuilder,
    private messageServ: MessageService,
    private route: Router,
    @Inject(LOCALE_ID) public local: string,
    private messageService: MessageService
  ) {}

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);

  ngOnInit(): void {
    this._leaveservice
      .getLeaveType()
      .subscribe((res) => (this.leaveTypes = res));
    this._leaveservice.getStatus().subscribe((res) => {
      this.statusTypes = res;

      this.status = this.statusTypes[0];
    });
    this.empForm = this.formBuilder.group({
      leaveTypeId: [null, Validators.required],
      FromDate: [null, Validators.required],
      ToDate: [null, Validators.required],
      StatusId: [null, Validators.required],
      Comments: ['', Validators.required],
    });
  }

  onFormSubmit() {
    if (this.empForm.invalid) {
      for (const control of Object.keys(this.empForm.controls)) {
        this.empForm.controls[control].markAsTouched();
        this.empForm.controls[control].markAsDirty();
      }
      this.messageService.clear();
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill the required fields',
        sticky: true,
      });
      return;
    } else if (this.empForm.valid) {
      this.submitted = true;
      const diffTime = Math.abs(
        this.empForm.value.FromDate.getTime() -
          this.empForm.value.ToDate.getTime()
      );
      if (
        Date.parse(this.empForm.value.FromDate) >
        Date.parse(this.empForm.value.ToDate)
      ) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'From Date is Greater Than To Date',
          sticky: true,
        });
      } else {
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        this.leaveTypeId = this.empForm.value.leaveTypeId.id;
        this.FromDate = formatDate(
          this.empForm.value.FromDate,
          'MM-dd-YYYY',
          this.local
        );
        this.ToDate = formatDate(
          this.empForm.value.ToDate,
          'MM-dd-YYYY',
          this.local
        );

        this.StatusId = this.empForm.value.StatusId;
        this.Comments = this.empForm.value.Comments;

        this._leaveservice
          .applyleave(
            this.leaveTypeId,
            this.FromDate,
            this.ToDate,
            this.StatusId,
            this.Comments,
            diffDays
          )
          .subscribe((res: any) => {
            if (res) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Leave details saved',
              });
            }
            this.empForm.reset();
          });

        // this.route.navigate(['/navbar/apply']);
      }
    }
  }
}
