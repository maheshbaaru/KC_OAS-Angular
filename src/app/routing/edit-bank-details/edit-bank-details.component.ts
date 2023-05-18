

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from 'src/app/services/employeBankService';


export interface EmployeeInterFace{
  accname?:string,
  accno?:string,
  bankName?:string,
  empId?:null,
  firstName?:string,
  id?:null,
  lastName?:string
}


@Component({
  selector: 'edit-bank-details',
  templateUrl: './edit-bank-details.component.html',
  styleUrls: ['./edit-bank-details.component.css']
})
export class EditBankDetailsComponent implements OnInit{
  
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private employeeService: EmployeService
    ){}

    employeess: EmployeeInterFace[] | any;
    employeeNameArray:any

  ngOnInit(): void {
  
    this.activeRoutIdFunction()
      this.employeeService.getSpecifiEmployeeDataById().subscribe((result:any)=>{
        this.employeess=result

        const newEmpData= this.employeess.map((e:any)=>({
          ...e,
          Name:`${e.firstName} ${e.lastName}`
        }))
        this.employeeNameArray=newEmpData[0]
  
    })

  }
  activedRouteId: string | null;
  employees: any;
  activeRoutIdFunction(){
    const activatedRouteId = this.route.snapshot.paramMap.get('id')
    return this.employeeService.id(activatedRouteId)
  }

  onClickSave(){
    const postData={
      id:this.employeeNameArray.id,
      empId:this.employeeNameArray.empId,
      accno:this.employeeNameArray.accno,
      bankName:this.employeeNameArray.bankName,
      accname:this.employeeNameArray.accname,
      
    }
   this.employeeService.updateEmployeeBankData(postData)
  }
}