import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pay-slip',
  templateUrl: './pay-slip.component.html',
  styleUrls: ['./pay-slip.component.css'],
})
export class PaySlipComponent {
  myReactiveForm: FormGroup;
  date!: Date;
  paySlip: any;
  constructor(@Inject(LOCALE_ID) public local: string, private messageService: MessageService) {}
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
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill the required fields',sticky: true  });
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
