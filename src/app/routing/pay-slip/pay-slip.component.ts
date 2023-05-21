import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pay-slip',
  templateUrl: './pay-slip.component.html',
  styleUrls: ['./pay-slip.component.css'],
})
export class PaySlipComponent {
  myReactiveForm: FormGroup;
  date!: Date;
  paySlip: any;
  constructor(@Inject(LOCALE_ID) public local: string) {}
  ngOnInit() {
    this.myReactiveForm = new FormGroup({
      payslip: new FormControl(null, Validators.required),
    });
  }
  Alert() {
    if (this.myReactiveForm.invalid) {
      for (const control of Object.keys(this.myReactiveForm.controls)) {
        this.myReactiveForm.controls[control].markAsTouched();
        this.myReactiveForm.controls[control].markAsDirty();
      }
      return;
    } else if (this.myReactiveForm.valid) {
      this.paySlip = formatDate(
        this.myReactiveForm.value.payslip,
        'YYYY-MM',
        this.local
      );
      //api call here
      alert('Employee does not have bank account or salary');
    }

    this.myReactiveForm.reset();
  }
}
