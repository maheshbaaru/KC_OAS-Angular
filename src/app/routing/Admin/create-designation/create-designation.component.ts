import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EmployeedDataService } from 'src/app/services/EmployeesDataService';
import { HttpClientService } from 'src/app/services/http-client.service';
import { SalarydeductionlistService } from 'src/app/services/salarydeductionlist.service';

@Component({
  selector: 'app-create-designation',
  templateUrl: './create-designation.component.html',
  styleUrls: ['./create-designation.component.css'],
})
export class CreateDesignationComponent implements OnInit {
  addDesinations: any;
  DsgForm: FormGroup;
  submitted = false;
  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private service: EmployeedDataService,
    private dgnservice: HttpClientService,
    private formBuilder: FormBuilder,
    private salDeductionServe: SalarydeductionlistService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.DsgForm = this._fb.group({
      name: [null, Validators.required],
    });
  }
  get d() {
    return this.DsgForm.controls;
  }

  submit() {}
  public form: FormGroup;
  addDesignation() {
    if (this.DsgForm.invalid) {
      for (const control of Object.keys(this.DsgForm.controls)) {
        this.DsgForm.controls[control].markAsTouched();
        this.DsgForm.controls[control].markAsDirty();
      }
      return;
    } else if (this.DsgForm.valid) {
      this.addDesinations = this.DsgForm.value;

      this.salDeductionServe
        .AddDesignation(this.addDesinations.name)
        .subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Designation saved',
            });
          }
        });
    }

    this.DsgForm.reset();
    this.router.navigate(['/navbar']);
  }
}
