import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { LeavesService } from 'src/app/services/leaves.service';
import { MessageService } from 'primeng/api';

interface statustype {
  statusType: string;
}
interface leavetype {
  leaveTypeName: string;
}
export interface EmployeeInterFace{
  adminComments?:string,
  appliedOn ?:string,
  comments ?:string,
  empId ?:number,
  
  firstName?:string,
  fromDate?:string,
  id ?:number,
  
  lastName?:string,
  leaveTypeId ?:number,

  leaveTypeName?:string,
  numOfDays  ?:number,
  statusId  ?:number,

  statusTypeName?:string,
  toDate   ?:string,
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
  selector: 'leaves-approval-screen',
  templateUrl: './leaves-approval-screen.component.html',
  // styleUrls: ['./leaves-approval-screen.component.css']
  animations:[shakeAnimation,shakeAnimationPassword],
  styleUrls: ['./leaves-approval-screen.component.scss']
})
export class LeavesApprovalScreenComponent {
  
  constructor(
     private leaveSer: LeavesService,
     private empservice: EmployeeService,
     private route:ActivatedRoute,
     private messageService: MessageService
     ){ 
  }

  leaveTypeName="Sick";
  statusIdName="Approved";
  // isSubmited=true
  isSubmited=false
  
  leaveTypeName2: leavetype;
  statusTypeName2: statustype;
  // ngDoCheck(){
  //   console.log(this.leaveTypeName)
  // }
  

  ngOnInit() {

    const toast = document.getElementById("success-toast") as HTMLElement;
    if (toast) {
      toast.textContent = ""; 
      toast.style.display = "none";
    }

    this.activeRoutIdFunction()
      this.empservice.getSpecifiEmployeeLeavesDataById().subscribe((result1:any)=>{
        for (const result of result1){
          this.speficEmployeeLeaveData={
            adminComments  :result.adminComments,
            appliedOn :result.appliedOn,
            comments :result.comments,
            empId :result.empId,
            fromDate:result.fromDate,
            id :result.id,
            leaveTypeId:result.leaveTypeId,
            numOfDays :result.numOfDays,
            statusId :result.statusId,
            toDate :result.toDate,
            firstName:result.firstName,
            lastName:result.lastName,
            leaveTypeName:result.leaveTypeName,
            statusTypeName:result.statusTypeName,
            name:`${result.firstName} ${result.lastName}`
          };
        }
        
      })
   
     
    
  }
  activeRoutIdFunction(){
    const activatedRouteId = this.route.snapshot.paramMap.get('id')
     return this.empservice.id(activatedRouteId)
  }

  onSelectLeaveTye(event:any){
    this.leaveTypeName2 = event
    this.leaveTypeName = event.leaveTypeName
   
  }
  
  onSelectStatusType(event:any){
    this.statusTypeName2 = event
    this.statusIdName = event.statusType
  }


  isLeaveTypeRequired(): boolean {
    return true; 
  }

  speficEmployeeLeaveData={
    adminComments:"",
    appliedOn :"",
    comments :"",
    empId :null,
    fromDate:"",
    id :null,
    leaveTypeId :null,
    numOfDays  :null,
    statusId  :null,
    toDate   :"",
    firstName:"",
    lastName:"",
    leaveTypeName:"",
    statusTypeName:"",
    name:""
  } 
  
  statusId=[
    {statusType:"Approved"},
    {statusType:"New"},
    {statusType:"Rejected"},
    {statusType:"Forwarded"},
  ]
    
  // ngDoCheck(){
  //   console.log(this.speficEmployeeLeaveData)
  // }
  leaveType=[
    {leaveTypeName:"Casual"},
    {leaveTypeName:"Sick"},
    {leaveTypeName:"Earned"},
    {leaveTypeName:"Compansation"},
    {leaveTypeName:"Optional"},
  ]
  // showSuccessToast(event:any) {
  //   const toast = document.getElementById("success-toast") || null;
  //   if (toast) {
  //     toast.textContent = "Success!";
  //     toast.style.display = "block";
  //     toast.style.position = "fixed";
  //     toast.style.top = "10px";
  //     toast.style.right = "10px";
  //     toast.classList.add("toast-appear");
  //     setTimeout(() => {
  //       toast.classList.remove("toast-appear");
  //       toast.style.display = "none";
  //     }, 2000);
  //   }
  // }

  onSave(event:any){
    console.log("toast")
    if(event){
      this.isSubmited=true
      let leaveTypeid= null
      let statusId= null
  
        switch(this.leaveTypeName){
          case "Casual" :
            leaveTypeid=1
            break
          case "Sick":
            leaveTypeid=2
            break
          case "Earned":
            leaveTypeid=3
            break
          case "Compansation":
            leaveTypeid=4
            break
          case "Optional":
            leaveTypeid=5
            break
        }
  
  
        switch(this.statusIdName){
          case "Approved" :
            statusId=1
            break
          case "New":
            statusId=2
            break
          case "Rejected":
            statusId=3
            break
          case "Forwarded":
            statusId=4
            break
        }
  
        const postData={
          statusId:statusId,
          leaveTypeId:leaveTypeid,
          id:this.speficEmployeeLeaveData.id,
          
        }
        this.empservice.updateLeavesApprovalData(postData)
        console.log("error")
        this.messageService.add({
           severity: 'success',
            summary: 'Success',
             detail: 'SuccessFully changed Leave Type and Status Id'
           });
    }
    else{
      this.messageService.add({
        severity: 'error', 
        summary: 'Error', 
        detail: 'Please Select Required Fields'
        });
      this.isSubmited=false
      
      setTimeout(() => {
        this.isSubmited=true
      }, 400);

    }

    }
  }


