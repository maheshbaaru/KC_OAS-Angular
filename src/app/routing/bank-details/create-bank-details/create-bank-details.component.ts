import { map } from 'rxjs';
import { employees } from './../../../Modesls/Employees';


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Modesls/employeBankInterface';
import { EmployeService } from 'src/app/services/employeBankService';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-create-bank-details',
  templateUrl: './create-bank-details.component.html',
  styleUrls: ['./create-bank-details.component.css']
})
export class CreateBankDetailsComponent implements OnInit {
  employeDetails:FormGroup
  employeess: Employee[] | any;
  employeNameArray:any
  accno: string = ''
  idArray: Employee[] | any
  newArray: Employee[] | any
  firstname: string[];

  constructor(
    private _fb: FormBuilder,
    private employeesService: EmployeService,
    private router: Router,
    ) { 
      this.form()
    }

    form() {
      this.employeDetails = this._fb.group({
        EmpNameById:new FormControl('') ,
        ACCNO: new FormControl(''),
        ACCNAME: new FormControl(''),
        BankName: "Kotak Bank",
        EmpId: new FormControl('')
      })
    }

    ngOnInit() {
      this.employeesService.getEmployeeData().subscribe(result => {
        this.employeess = result
        const employeeresponse = this.employeess.map((e:any)=>({
          ...e,
          Name:`${(e.firstName).trimEnd()} ${e.lastName}`
        }))
        this.employeNameArray= employeeresponse
      })
     
    }

  onFormSubmit() {
    if(this.employeDetails.valid){

      this.firstname=this.employeDetails.value.EmpNameById.Name.split(" ")
      
      this.idArray = this.employeNameArray.find(
            (e:any)=>
            e.lastName ===this.firstname.reverse()[0]
            )

    this.newArray = {
       "id":this.idArray.id,
      "empId": this.idArray.empId,
      "accno": this.employeDetails.value.ACCNO,
      "bankName": "Kotak Bank",
      "accname": this.employeDetails.value.ACCNAME,
    }
    alert("Are You Sure You Want To Create New Employee Bank Details")

    this.employeesService.PostEmployeeNewBankData(this.newArray)
    this.form()
    }
    
  }
}

