import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-create-taxtype',
  templateUrl: './create-taxtype.component.html',
  styleUrls: ['./create-taxtype.component.css'],
})
export class CreateTaxtypeComponent {
  taxType: any;
  public form: FormGroup;
  constructor(
    private httpClient: HttpClientService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.form = fb.group({
      tax: [null, Validators.required],
    });
  }
  AddTaxType() {
    if (this.form.invalid) {
      for (const control of Object.keys(this.form.controls)) {
        this.form.controls[control].markAsTouched();
        this.form.controls[control].markAsDirty();
      }
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill the required fields',
        sticky: true,
      });
      return;
    } else if (this.form.valid) {
      this.taxType = this.form.value;
      this.httpClient.AddTaxType(this.taxType.tax).subscribe((res: any) => {
        if (res) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'TaxType saved',
          });
        }
        this.form.reset();
      });
    }
  }
}
