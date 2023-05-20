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
export class CreateDesignationComponent implements OnInit{
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
  ) {
    
  }


 ngOnInit() {
    this.DsgForm = this._fb.group({
      name: [null, Validators.required],
    });  
  }
  get d() { return this.DsgForm.controls; }
  

  submit() {}
  public form: FormGroup;
  addDesignation() {
    this.submitted=true;
    debugger;
    this.addDesinations = this.form.value;

    this.salDeductionServe
      .AddDesignation(this.addDesinations.name)
      .subscribe((res: any) => {

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
    this.router.navigate(['/navbar'])
  }
}
