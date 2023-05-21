import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
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

  get f() {
    return this.empForm.controls;
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.empForm.invalid) {
      for (const control of Object.keys(this.empForm.controls)) {
        this.empForm.controls[control].markAsTouched();
        this.empForm.controls[control].markAsDirty();
      }
      return;
    } else if (this.empForm.valid) {
      this.EmpId = this.empForm.value.EmpId.employeeID;
      this.Eid = this.EmpId.replace('KC0', '');

      this.Salary = this.empForm.value.Salary;
      (this.LastRevisedDate = formatDate(
        this.empForm.value.LastRevisedDate,
        'YYYY-MM-dd',
        this.local
      )),
        (this.NextRevisedDate = formatDate(
          this.empForm.value.NextRevisedDate,
          'YYYY-MM-dd',
          this.local
        ));

      this._service
        .CreatenewSalaryDetails(
          this.Eid,
          this.Salary,
          this.LastRevisedDate,
          this.NextRevisedDate
        )
        .subscribe((res) => {
          if (res) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'TaxType saved',
            });
          }
        });
    }
    this.empForm.reset();
  }
}
