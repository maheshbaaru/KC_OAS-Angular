import { Component, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { LeavesService } from 'src/app/services/leaves.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
interface statustype {
  statusType: string;
}
interface leavetype {
  leaveTypeName: string;
}
export interface EmployeeInterFace {
  adminComments?: string;
  appliedOn?: string;
  comments?: string;
  empId?: number;

  firstName?: string;
  fromDate?: string;
  id?: number;

  lastName?: string;
  leaveTypeId?: object;

  leaveTypeName?: string;
  numOfDays?: number;
  statusId?: object;
name:string;
  statusTypeName?: string;
  toDate?: string;
}

@Component({
  selector: 'leaves-approval-screen',
  templateUrl: './leaves-approval-screen.component.html',
  styleUrls: ['./leaves-approval-screen.component.scss'],
})
export class LeavesApprovalScreenComponent {
  constructor(
    private leaveSer: LeavesService,
    private empservice: EmployeeService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    @Inject(LOCALE_ID) public local: string
  ) {}
  speficEmployeeLeaveData: EmployeeInterFace

  leaveTypeName = 'Sick';
  statusIdName = 'Approved';
  // isSubmited=true
  isSubmited = false;
  leaveType: any;
  statusId: any;
  leaveData:any

  ngOnInit() {
    this.leaveSer.getLeaveType().subscribe((resp) => {
      this.leaveData = resp;
      this.leaveSer.getStatus().subscribe((res) => {
        this.statusId = res;
        this.empservice
          .getSpecifiEmployeeLeavesDataById()
          .subscribe((result1: any) => {
            for (const result of result1) {
              this.speficEmployeeLeaveData = {
                adminComments: result.adminComments,
                appliedOn:formatDate( result.appliedOn, 'MM-dd-yyyy', this.local),
                comments: result.comments,
                empId: result.empId,
                fromDate: formatDate(result.fromDate, 'MM-dd-yyyy', this.local),
                id: result.id,
                leaveTypeId: {
                  id: result.leaveTypeId,
                  name: result.leaveTypeName,
                },
                numOfDays: result.numOfDays,
                statusId: { id: result.statusId, name: result.statusTypeName },
                toDate:   formatDate(result.toDate, 'MM-dd-yyyy', this.local),
                firstName: result.firstName,
                lastName: result.lastName,
                name: `${result.firstName} ${result.lastName}`,
              };
            }
          });
      });
    });
    const toast = document.getElementById('success-toast') as HTMLElement;
    if (toast) {
      toast.textContent = '';
      toast.style.display = 'none';
    }

    this.activeRoutIdFunction();
    
   
  }
  activeRoutIdFunction() {
    const activatedRouteId = this.route.snapshot.paramMap.get('id');
    return this.empservice.id(activatedRouteId);
  }

  onSelectLeaveTye(event: any) {
    this.leaveTypeName = event.id;
  }

  onSelectStatusType(event: any) {
    this.statusIdName = event.id;
  }

  isLeaveTypeRequired(): boolean {
    return true;
  }


  // statusId = [
  //   { statusType: 'Approved' },
  //   { statusType: 'New' },
  //   { statusType: 'Rejected' },
  //   { statusType: 'Forwarded' },
  // ];

  // ngDoCheck(){

  // }
  // leaveType = [
  //   { leaveTypeName: 'Casual' },
  //   { leaveTypeName: 'Sick' },
  //   { leaveTypeName: 'Earned' },
  //   { leaveTypeName: 'Compansation' },
  //   { leaveTypeName: 'Optional' },
  // ];

  onSave(event: any) {
    if (event) {
      this.isSubmited = true;
     
      const postData = {
        statusId: this.statusIdName,
        leaveTypeId: this.leaveTypeName,
        id: this.speficEmployeeLeaveData['id'],
      };
      this.empservice.updateLeavesApprovalData(postData);

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'SuccessFully changed Leave Type and Status Id',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please Select Required Fields',
      });
      this.isSubmited = false;

      setTimeout(() => {
        this.isSubmited = true;
      }, 200);
    }
  }
}
