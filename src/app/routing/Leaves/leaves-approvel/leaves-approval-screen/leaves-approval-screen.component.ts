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

  leaveTypeName="Sick";
  statusIdName="Approved";
  
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

  onSelectLeaveTye(event:any){
    this.leaveTypeName = event.value
  }

  onSelectStatusType(event:any){
    this.statusIdName = event.value
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
    {statusType:"Approved"},
    {statusType:"New"},
    {statusType:"Rejected"},
    {statusType:"Forwarded"},
  ]
    
  leaveType=[
    {leaveTypeName:"Sick"},
    {leaveTypeName:"Casual"},
    {leaveTypeName:"Earned"},
    {leaveTypeName:"Compansation"},
    {leaveTypeName:"Optional"},
  ]
  
  onSave(){

    
    let leaveTypeid= 2
    let statusId= 1

      switch(this.leaveTypeName){
        case "Sick":
          leaveTypeid=2
          break
        case "Casual" :
          leaveTypeid=1
          break
        case "Earned":
          leaveTypeid=3
          break
        case "Compensation":
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
        // adminComments:this.speficEmployeeLeaveData.adminComments,
        // appliedOn:this.speficEmployeeLeaveData.,
        // comments:this.speficEmployeeLeaveData.,
        // empId:this.speficEmployeeLeaveData.,
        // fromDate:this.speficEmployeeLeaveData.,
        // numOfDays:this.speficEmployeeLeaveData.,
        // toDate:this.speficEmployeeLeaveData.,
      }
      // console.log(postData)
        this.empservice.updateLeavesApprovalData(postData)
      // this.empservice.updateLeavesApprovalData(postData)
    }
  }


