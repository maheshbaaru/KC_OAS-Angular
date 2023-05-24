


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Modesls/employeBankInterface';
import { EmployeService } from 'src/app/services/employeBankService';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-create-bank-details',
  templateUrl: './create-bank-details.component.html',
  styleUrls: ['./create-bank-details.component.css']
})
export class CreateBankDetailsComponent implements OnInit {
  employeDetails: FormGroup
  employeess: Employee[] | any;
  employeNameArray: any
  accno: string = ''
  idArray: Employee[] | any
  newArray: Employee[] | any
  firstname: string[];

  submitted = false;
  integerRegex = /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/

  constructor(
    private _fb: FormBuilder,
    private employeesService: EmployeService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.form()
  }

  form() {
    this.employeDetails = this._fb.group({
      EmpNameById: [null, Validators.required],
      ACCNO: [null, [Validators.required, Validators.maxLength(15), Validators.minLength(5), this.numberValidator()]],
      ACCNAME: [null, [Validators.required, this.wordValidator()]],
      BankName: "Kotak Bank",
      // EmpId: [null, Validators.required],
    })
  }


  numberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const valid = /^\d+$/.test(value);

      return valid ? null : { number: { value: control.value } };
    };
  }

  wordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const valid = /^[A-Za-z\s]+$/.test(value);

      return valid ? null : { word: { value: control.value } };
    };
  }


  get f() { return this.employeDetails.controls; }

  ngOnInit() {
    this.employeesService.getEmployeeData().subscribe(result => {
      this.employeess = result
      const employeeresponse = this.employeess.map((e: any) => ({
        ...e,
        Name: `${(e.firstName).trimStart()} ${e.lastName}`
      }))
      this.employeNameArray = employeeresponse
    })

  }

  onFormSubmit() {

    if (this.employeDetails.valid) {
      this.submitted = true

      this.firstname = this.employeDetails.value.EmpNameById.Name.split(" ")
      const [first, second] = this.firstname
      this.idArray = this.employeNameArray.find(
        (e: any) =>

          e.lastName === second

      )
      console.log(this.idArray)
      this.newArray = {
        "id": this.idArray.id,
        "empId": this.idArray.empId,
        "accno": this.employeDetails.value.ACCNO,
        "bankName": "Kotak Bank",
        "accname": this.employeDetails.value.ACCNAME,
      }
      console.log(this.newArray)
      this.employeesService.PostEmployeeNewBankData(this.newArray)
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Successfully Created Bank Details'
      });
      // this.form()
    }
    else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please Fill The Required Fields'
      });
      this.submitted = false
      setTimeout(() => {
        this.submitted = true
      }, 200);
    }



  }
}

