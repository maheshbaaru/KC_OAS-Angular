

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Modesls/employeBankInterface';
import { EmployeService } from 'src/app/services/employeBankService';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Save'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeesService.PostEmployeeNewBankData(this.newArray)
        this.resetingCreatForm()
        Swal.fire(
          'Saved',
          'Your Changes Are Saved',
          'success'
        )
      }
    })
  }

 

  // onClickBack(){
  //   this.router.navigate(['../bankDetails'])
  // }
}

