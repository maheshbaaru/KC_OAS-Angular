

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Modesls/employeBankInterface';
import { EmployeService } from 'src/app/services/employeBankService';

@Component({
  selector: 'app-create-bank-details',
  templateUrl: './create-bank-details.component.html',
  styleUrls: ['./create-bank-details.component.css']
})
export class CreateBankDetailsComponent implements OnInit {
  

  constructor(private employeesService: EmployeService,
    private router: Router) { }


    ngOnInit() {
      this.employeesService.getEmployeeData().subscribe(result => {
        this.employeess = result
      })

    }

  
  employeess: Employee[] | any;

  employeDetails = {
    EmpNameById: '',
    ACCNO: '',
    ACCNAME: '',
    BankName: "Kotak Bank",
    EmpId: ''
  }
  
  accno: string = ''
  idArray: Employee[] | any
  newArray: Employee[] | any
  firstname: string[];

  resetingCreatForm() {
    this.employeDetails = {
      EmpNameById: 'SELECT EMPLOYEE',
      ACCNO: '',
      ACCNAME: '',
      BankName: "Kotak Bank",
      EmpId: ''
    }
  }

  savingForm() {
  
    this.firstname=this.employeDetails.EmpNameById.split(" ")
   
    this.idArray = this.employeess.find(
        (e:any)=>
        e.lastName ===this.firstname.reverse()[0]
        )
    this.newArray = {
      "id":this.idArray.id,
      "empId": this.idArray.empId?this.idArray.empId:"",
      "accno": this.employeDetails.ACCNO,
      "bankName": "Kotak Bank",
      "accname": this.employeDetails.ACCNAME,
    }
    alert("Are You Sure You Want To Create New Employee Bank Details")
    this.employeesService.PostEmployeeNewBankData(this.newArray)
    this.resetingCreatForm()
  }

 

  // onClickBack(){
  //   this.router.navigate(['../bankDetails'])
  // }
}

