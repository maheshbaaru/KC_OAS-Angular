import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeedDataService } from 'src/app/services/EmployeesDataService';
import { Inject, LOCALE_ID } from '@angular/core';
import { MessageService } from 'primeng/api';
interface EmployeeName {
  Name: string;
}

@Component({
  selector: 'app-create-new-salary-details',
  templateUrl: './create-new-salary-details.component.html',
  styleUrls: ['./create-new-salary-details.component.css'],
})
export class CreateNewSalaryDetailsComponent {
  names: EmployeeName[];
  empForm: FormGroup;
  EmpId: any;
  Salary: any;
  employeeId: any;
  LastRevisedDate: any;
  NextRevisedDate: any;
  Eid: any;
  id: any;
  submitted = false;

  constructor(
    private _fb: FormBuilder,
    private _service: EmployeedDataService,
    private router: Router,
    private messageService: MessageService,
    @Inject(LOCALE_ID) public local: string
  ) {}

  ngOnInit() {
    this.empForm = this._fb.group({
      EmpId: [null, Validators.required],

      Salary: [null, Validators.required],
      LastRevisedDate: [null, Validators.required],
      NextRevisedDate: [null, Validators.required],
    });

    this._service.getEmployeeList().subscribe((data) => {
      this.names = data.filter((item: any) => {
        return item.firstName + item.lastName;
      });
    });
  }
  onLastDateChange(event: any) {
    var d = new Date(event);
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var c = new Date(year + 1, month, day);
    formatDate(c, 'yy-mm-dd', this.local);
    this.empForm.controls['NextRevisedDate'].setValue(c);
  }

  get f() {
    return this.empForm.controls;
  }

  onFormSubmit() {
    if (this.empForm.invalid) {
      for (const control of Object.keys(this.empForm.controls)) {
        this.empForm.controls[control].markAsTouched();
        this.empForm.controls[control].markAsDirty();
      }
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill the required fields',
        sticky: true,
      });
      return;
    } else if (this.empForm.valid) {
      if (this.empForm.value.LastRevisedDate) {
        var d = new Date(this.empForm.value.LastRevisedDate);
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        var c = new Date(year + 1, month, day);
        formatDate(c, 'yy-mm-dd', this.local);
        this.messageService.clear();
        let invalid;

        if (c.toString() != this.empForm.value.NextRevisedDate.toString()) {
          this.messageService.clear();
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Enter Valid Date',
            sticky: true,
          });
        } else {
          // this.id = this.empForm.value.EmpId.id;
          this.EmpId = this.empForm.value.EmpId.id;
          // this.Eid = this.EmpId.replace('KC', '');

          this.Salary = this.empForm.value.Salary;
          this.LastRevisedDate = formatDate(
            this.empForm.value.LastRevisedDate,
            'YYYY-MM-dd',
            this.local
          );
          this.NextRevisedDate = formatDate(
            this.empForm.value.NextRevisedDate,
            'YYYY-MM-dd',
            this.local
          );

          this._service
            .CreatenewSalaryDetails(
              // this.id,
              this.EmpId,
              this.Salary,
              this.LastRevisedDate,
              this.NextRevisedDate
            )
            .subscribe((res) => {
              if (res) {
                return this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: ' New Salary details saved',
                });
              }
              this.empForm.reset();
            });
        }
      }
    }
  }
}
