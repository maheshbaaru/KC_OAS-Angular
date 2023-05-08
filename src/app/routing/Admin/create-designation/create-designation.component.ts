import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeedDataService } from 'src/app/services/EmployeesDataService';
import { HttpClientService } from 'src/app/services/http-client.service';
import { SalarydeductionlistService } from 'src/app/services/salarydeductionlist.service';

@Component({
  selector: 'app-create-designation',
  templateUrl: './create-designation.component.html',
  styleUrls: ['./create-designation.component.css'],
})
export class CreateDesignationComponent {
  addDesination: any;
  constructor(
    fb: FormBuilder,
    private router: Router,
    private service: EmployeedDataService,
    private dgnservice: HttpClientService,
    private formBuilder: FormBuilder,
    private salDeductionServe: SalarydeductionlistService
  ) {
    this.form = fb.group({
      name: [null, Validators.required],
    });
  }

  submit() {}
  public form: FormGroup;
  addDesignation(name: any) {
    this.salDeductionServe.AddDesignation(name).subscribe((res) => {
      this.addDesination = res;
    });
  }
}
