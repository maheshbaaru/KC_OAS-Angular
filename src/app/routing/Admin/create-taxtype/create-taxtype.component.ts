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
    fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.form = fb.group({
      tax: [null, Validators.required],
    });
  }
  AddTaxType() {
    this.taxType = this.form.value;
    this.httpClient.AddTaxType(this.taxType.tax).subscribe((res) => {
      console.log(res);
    });
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'TaxType saved',
    });
    if (this.taxType === '' && this.taxType === null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please gave a TaxType',
      });
    }

    this.form.reset();
  }
}
