import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from 'src/app/services/employeBankService';
import { MessageService } from 'primeng/api';

export interface EmployeeInterFace {
  accname?: string;
  accno?: string;
  bankName?: string;
  empId?: null;
  firstName?: string;
  id?: null;
  lastName?: string;
}

@Component({
  selector: 'edit-bank-details',
  templateUrl: './edit-bank-details.component.html',

  styleUrls: ['./edit-bank-details.component.css'],
})
export class EditBankDetailsComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeService,
    private messageService: MessageService
  ) {}

  employeess: EmployeeInterFace[] | any;
  // employeeNameArray: any;
  employeeNameArray={
      "id": null,
      "empId": null,
      "accno": "",
      "bankName": "",
      "accname": "",
      "firstName": "",
      "lastName": "",
      "Name": ""
  }
  activedRouteId: string | null;
  employees: any;

  submited = false;

  integerRegex =
    /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/;
  ngOnInit(): void {
    this.activeRoutIdFunction();
    this.employeeService
      .getSpecifiEmployeeDataById()
      .subscribe((result: any) => {
        this.employeess = result;

        const newEmpData = this.employeess.map((e: any) => ({
          ...e,
          Name: `${e.firstName} ${e.lastName}`,
        }));
        this.employeeNameArray = newEmpData[0];
      });
      console.log(this.employeeNameArray)
  }
  activeRoutIdFunction() {
    const activatedRouteId = this.route.snapshot.paramMap.get('id');
    return this.employeeService.id(activatedRouteId);
  }
  
  // ngDoCheck(){
  //   console.log(this.employeeNameArray)
  // }
  onClickSave(event: any) {
    console.log(this.employeeNameArray)
    if (event) {
      this.submited = true;

      const postData = {
        id: this.employeeNameArray.id,
        empId: this.employeeNameArray.empId,
        accno: this.employeeNameArray.accno,
        bankName: this.employeeNameArray.bankName,
        accname: this.employeeNameArray.accname,
      };
      this.employeeService.updateEmployeeBankData(postData);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Successfully Updated Bank Accno',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please Fill The Required Fields',
      });

      this.submited = false;
      setTimeout(() => {
        this.submited = true;
      }, 200);
    }
  }
}
