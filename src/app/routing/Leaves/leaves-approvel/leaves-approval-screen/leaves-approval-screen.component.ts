import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { LeavesService } from 'src/app/services/leaves.service';

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


@Component({
  selector: 'leaves-approval-screen',
  templateUrl: './leaves-approval-screen.component.html',
  // styleUrls: ['./leaves-approval-screen.component.css']
  styleUrls: ['./leaves-approval-screen.component.scss']
})
export class LeavesApprovalScreenComponent {
  
  constructor(
     private leaveSer: LeavesService,
     private empservice: EmployeeService,
     private route:ActivatedRoute,
     ){ 
  }

  ngOnInit() {
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
          };
        }
        
      })
   
     
    
  }
  activeRoutIdFunction(){
    const activatedRouteId = this.route.snapshot.paramMap.get('id')
     return this.empservice.id(activatedRouteId)
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
  } 
  
  statusId=[
    {statusType:"Pending"},
    {statusType:"Approved"},
    {statusType:"Declined"},
  ]
    
  leaveType=[
    {leaveTypeName:"Sick"},
    {leaveTypeName:"Casual"},
    {leaveTypeName:"Earned"},
    {leaveTypeName:"Compansation"},
    {leaveTypeName:"Optional"},
  ]
  
  onSave(){
    const postData={
      // adminComments:this.speficEmployeeLeaveData.,
      // appliedOn:this.speficEmployeeLeaveData.,
      // comments:this.speficEmployeeLeaveData.,
      // empId:this.speficEmployeeLeaveData.,
      // fromDate:this.speficEmployeeLeaveData.,
      // id:this.speficEmployeeLeaveData.,
      // leaveTypeId:this.speficEmployeeLeaveData.,
      // numOfDays:this.speficEmployeeLeaveData.,
      // statusId:this.speficEmployeeLeaveData.,
      // toDate:this.speficEmployeeLeaveData.,
    }

    console.log(this.speficEmployeeLeaveData)
  }
}

