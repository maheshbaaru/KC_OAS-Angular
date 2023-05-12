

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, first } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { EmployeService } from 'src/app/services/employeBankService';
import Swal from 'sweetalert2';

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

 
  ngOnInit(): void {
  
    this.activeRoutIdFunction()
      this.employeeService.getSpecifiEmployeeDataById().subscribe((result:any)=>{
        this.speficEmployeeDat={
          id:result[0],
          empId:result[1],
          accNo:result[2],
          accName:result[4],
          BankName:result[3],
          firstName:result[5],
          lastName:result[6]
        };
         
    })

  }
  activedRouteId: string | null;
  // employees: any;
  speficEmployeeDat={
    id:null,
    empId:null,
    accNo:null,
    BankName:"",
    accName:"",
    firstName:"",
    lastName:""
  } 

  activeRoutIdFunction(){
    const activatedRouteId = this.route.snapshot.paramMap.get('id')
    return this.employeeService.id(activatedRouteId)
  }

  onClickSave(){
    const postData={
      id:this.speficEmployeeDat.id,
      empId:this.speficEmployeeDat.empId,
      accno:this.speficEmployeeDat.accNo,
      bankName:this.speficEmployeeDat.BankName,
      accname:this.speficEmployeeDat.accName,
      
    }
    // console.log(postData)
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
        
        this.employeeService.updateEmployeeBankData(postData)
        Swal.fire(
          'Saved',
          'Your Changes Are Saved',
          'success'
        )
      }
    })
  }
}


 // this.route.params.subscribe(
  //   (params: Params) => {
  //     console.log(params['id']);
  //   }
  // );
// const id: Observable<string> = this.route.params.pipe(map(p => p['id']));




// onClickback(){
// this.router.navigate(['/BankDetails'])
// }