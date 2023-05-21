

import { trigger, state, style, transition, animate } from '@angular/animations';
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

const shakeAnimation = trigger('shakeAnimation', [
  state('invalid', style({
    transform: 'translateX(0px)',
    borderColor: 'red'
  })),
  state('invalid', style({
    transform: 'translateX(0px)',
  })),
  transition('* => invalid', [
    animate('0.1s', style({ transform: 'translateX(10px)', borderColor: 'red' })),
    animate('0.1s', style({ transform: 'translateX(-10px)', borderColor: 'red' })),
    animate('0.1s', style({ transform: 'translateX(10px)', borderColor: 'red' })),
    animate('0.1s', style({ transform: 'translateX(-10px)', borderColor: 'red' })),
    animate('0.1s', style({ transform: 'translateX(10px)', borderColor: 'red' })),
    animate('0.1s', style({ transform: 'translateX(-10px)', borderColor: 'red' })),
    animate('0.1s', style({ transform: 'translateX(10px)', borderColor: 'red' })),
    animate('0.1s', style({ transform: 'translateX(-10px)', borderColor: 'red' })),
    animate('0.1s', style({ transform: 'translateX(10px)', borderColor: 'red' })),
    animate('0.1s', style({ transform: 'translateX(0px)', borderColor: 'red' })),
  ]),
  transition('invalid => *', [
    animate('0.1s', style({ transform: 'translateX(0px)'})),
  ])
]);


const shakeAnimationPassword =trigger('shakeAnimationPassword',[
  state('invalid',style({
    transform:'translateX(0px)',
    borderColor:'red'
  })),
  
  
  transition('* => invalid', [
    animate('0.1s', style({ transform: 'translateX(10px)' , borderColor:'red'})),
    animate('0.1s', style({ transform: 'translateX(-10px)', borderColor:'red' })),
    animate('0.1s', style({ transform: 'translateX(0px)', borderColor:'red' }))
  ]),
])

@Component({
  selector: 'edit-bank-details',
  templateUrl: './edit-bank-details.component.html',
  animations:[shakeAnimation,shakeAnimationPassword],
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
    activedRouteId: string | null;
    employees: any;

    submited=false

    integerRegex=/^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/
  ngOnInit(): void {
    const toast = document.getElementById("success-toast") as HTMLElement;
    if (toast) {
      toast.textContent = ""; 
      toast.style.display = "none";
    }

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
  activeRoutIdFunction(){
    const activatedRouteId = this.route.snapshot.paramMap.get('id')
    return this.employeeService.id(activatedRouteId)
  }


  showSuccessToast(event:any) {
    const toast = document.getElementById("success-toast") || null;
    if (toast) {
      toast.textContent = "Success!";
      toast.style.display = "block";
      toast.style.position = "fixed";
      toast.style.top = "10px";
      toast.style.right = "10px";
      toast.classList.add("toast-appear");
      setTimeout(() => {
        toast.classList.remove("toast-appear");
        toast.style.display = "none";
      }, 2000);
    }
  }
  
  onClickSave(event:any){
    if(event){
      this.submited=true
      console.log("this valid")
      const postData={
        id:this.employeeNameArray.id,
        empId:this.employeeNameArray.empId,
        accno:this.employeeNameArray.accno,
        bankName:this.employeeNameArray.bankName,
        accname:this.employeeNameArray.accname,
        
      }
     this.employeeService.updateEmployeeBankData(postData)
    
     if(event){
      this.showSuccessToast(event);
      }else{
      const successToast = document.getElementById("success-toast");
      if (successToast) {
        successToast.style.display = "none";
        successToast.style.backgroundColor = "none";
      }
    }

    }else{
      console.log("valid")
      this.submited=false
      setTimeout(() => {
        this.submited=true
      }, 400);
    }
   
  }
}