import { Component } from '@angular/core';
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
export class CreateDesignationComponent {
  addDesinations: any;
  constructor(
    fb: FormBuilder,
    private router: Router,
    private service: EmployeedDataService,
    private dgnservice: HttpClientService,
    private formBuilder: FormBuilder,
    private salDeductionServe: SalarydeductionlistService,
    private messageService: MessageService
  ) {
    this.form = fb.group({
      name: [null, Validators.required],
    });
  }

  submit() {}
  public form: FormGroup;
  addDesignation() {
    debugger;
    this.addDesinations = this.form.value;

    this.salDeductionServe
      .AddDesignation(this.addDesinations.name)
      .subscribe((res: any) => {
        console.log(res);

        if (res.status !== null && this.addDesinations.name !== '') {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Designation saved',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Please gave a Designation',
          });
        }
      });

    this.form.reset();
  }
}
