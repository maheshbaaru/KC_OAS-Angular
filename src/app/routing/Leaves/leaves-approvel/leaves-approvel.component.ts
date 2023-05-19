
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { LeavesService } from 'src/app/services/leaves.service';
//import namesData from 'src/assets/data/names.json';
interface StatusType {
  name: string;
}
interface EmployeeName {
  Name: string;
}

interface employeName{
  firstName:string;
  lastName:string;
}
@Component({
  selector: 'app-leaves-approvel',
  templateUrl: './leaves-approvel.component.html',
  styleUrls: ['./leaves-approvel.component.css'],
})
export class LeavesApprovelComponent {
  leavesApproved: any;

  httpstoredData:any
  empForm: FormGroup;
  names: EmployeeName[];
  statusTypes: any;

  filterfromdate:any

  employeeSearchText:string;
  employees: any;
  employeeName: any;

  constructor(
    private http: HttpClient,
    private _fb: FormBuilder,
    private empservice: EmployeeService,
    private leaveSer: LeavesService
  ) {
     //this.names = namesData;
    // this.statusTypes = [
    //   { name: 'Pending' },
    //   { name: 'Approved' },
    //   { name: 'Declined' },

    // ];

    this.empForm = this._fb.group({
      name: '',
      Salary: '',
      LastRevisedDate: '',
      NextRevisedDate: '',
    });
  }

  ngOnInit() {
    this.empservice.appliedLeaves().subscribe((data) => {
       console.log(data)
      this.leavesApproved = data;
      this.httpstoredData = data;
    });

    this.empservice.getAllEmployees().subscribe((res)=>{
      this.employees= res
      // console.log(res)
      const employeeData = this.employees.map((emp:any)=>({
        ...emp,
        Name: `${emp.firstName}${emp.lastName}`,
      }))
      this.employeeName = employeeData
  })
  
  }

// ngDoCheck(){
//   console.log(this.filterfromdate)
// }

  ngAfterViewInit() {

    this.leaveSer.getStatus().subscribe((res) => (this.statusTypes = res));

  }

  empfilterTable(event:any){
    if(event === null){
      this.leavesApproved=this.httpstoredData

    }
    const empnameData = this.leavesApproved.filter((e:any)=>(
      e.empName==event.Name
    ))

    if(empnameData.length!==0){
      this.leavesApproved=empnameData
    }
    else{
      this.leavesApproved={}
    }
  }

  statusFilterTable(event:any){
    if(event === null){
      this.leavesApproved=this.httpstoredData

    }
      console.log(event)
      const statusData = this.leavesApproved.filter((e:any)=>(
        e.statusId==event.id
      ))

      if(statusData.length!==0){
        this.leavesApproved=statusData
      }
      else{
        this.leavesApproved={}
      }
  }

  fromcalenderFilterTable(event:any,date:any){

    if(date.inputFieldValue===""){
      this.leavesApproved=this.httpstoredData
    }

  var fromDateDataMap = this.leavesApproved.filter((e:any)=>{
   if(e.fromDate===null){
    return null;
   }
   else{
    return e.fromDate.split("T")[0] ===date.inputFieldValue
   }
  })

  if(fromDateDataMap.length> 0){
    this.leavesApproved=fromDateDataMap
   }
  else{
    this.leavesApproved=this.httpstoredData
    // this.leavesApproved={

    // }
  }

  }


  tocalenderFilterTable(event:any,toDate:any){

    if(toDate.inputFieldValue===""){
      this.leavesApproved=this.httpstoredData
    }

  var toDateData = this.leavesApproved.filter((e:any)=>{
        if(e.toDate===null){
          return null;
        }
        else{
          return e.toDate.split("T")[0] ===toDate.inputFieldValue
        }
  })

  if(toDateData.length> 0){
    this.leavesApproved=toDateData
    // console.log("it go failed")
  }else{
    this.leavesApproved=this.httpstoredData
  }
    
   
  }


  // const newDate = new Date(date.inputFieldValue);
    // const formattedDate = newDate.toISOString();
    // const FinalDate = formattedDate.replace(/Z$/, "").split('T')[0];
    
    // console.log(event);
    // console.log(FinalDate);
   
}
