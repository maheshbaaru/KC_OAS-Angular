import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { LeavesService } from 'src/app/services/leaves.service';
import { DatePipe } from '@angular/common';
//import namesData from 'src/assets/data/names.json';
interface StatusType {
  name: string;
}
interface EmployeeName {
  Name: string;
}

interface nameType {
  Name: string;
}

interface employeName {
  firstName: string;
  lastName: string;
}
@Component({
  selector: 'app-leaves-approvel',
  templateUrl: './leaves-approvel.component.html',
  styleUrls: ['./leaves-approvel.component.css'],
})
export class LeavesApprovelComponent {
  leavesApproved: any;

  httpstoredData: any;
  empForm: FormGroup;
  names: EmployeeName[];
  statusTypes: any;

  filterfromdate: any;

  employeeSearchText: string;
  employees: any;
  employeeName: any;
  date: Date;

  minDate: Date;

  maxDate: Date;

  constructor(
    private http: HttpClient,
    private _fb: FormBuilder,
    private empservice: EmployeeService,
    private leaveSer: LeavesService,
    public datepipe: DatePipe
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
      this.leavesApproved = data;
      this.httpstoredData = data;
    });

    this.empservice.getAllEmployees().subscribe((res) => {
      this.employees = res;
      const employeeData = this.employees.map((emp: any) => ({
        ...emp,
        Name: `${emp.firstName}${emp.lastName}`,
      }));
      this.employeeName = employeeData;
    });
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 1;
    let prevYear = prevMonth === 11 ? year - 1 : year;
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextYear = nextMonth === 0 ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);
  }

  // ngDoCheck(){

  // }

  ngAfterViewInit() {
    this.leaveSer.getStatus().subscribe((res) => (this.statusTypes = res));
  }

  empfilterTable(event: any, data: any) {
    if (event === null) {
      this.leavesApproved = this.httpstoredData;
    }
    const empnameData = this.leavesApproved.filter(
      (e: any) => e.empName == event.Name
    );

    if (empnameData.length !== 0) {
      this.leavesApproved = empnameData;
    } else {
      this.leavesApproved = {};
    }
  }

  statusFilterTable(event: any) {
    if (event === null) {
      this.leavesApproved = this.httpstoredData;
    }

    const statusData = this.leavesApproved.filter(
      (e: any) => e.statusId == event.id
    );

    if (statusData.length !== 0) {
      this.leavesApproved = statusData;
    } else {
      this.leavesApproved = {};
    }
  }

  fromcalenderFilterTable(event: any, date: any) {
    if (event.detail === 2) {
      if (date.inputFieldValue === '') {
        this.leavesApproved = this.httpstoredData;
      }
    }
    let latest_date: any;
    try {
      let newdate2 = new Date(date.inputFieldValue);
      latest_date = this.datepipe.transform(newdate2, 'yyyy-MM-dd');
    } catch (error: any) {}

    var fromDateDataMap = this.leavesApproved.filter((e: any) => {
      if (e.fromDate === null) {
        return null;
      } else {
        return e.fromDate.split('T')[0] === latest_date;
      }
    });

    if (fromDateDataMap.length > 0) {
      this.leavesApproved = fromDateDataMap;
    }
  }

  tocalenderFilterTable(event: any, toDate: any) {
    if (event.detail === 2) {
      if (toDate.inputFieldValue === '') {
        this.leavesApproved = this.httpstoredData;
      }
    }

    let latest_date: any;
    try {
      let newdate2 = new Date(toDate.inputFieldValue);
      latest_date = this.datepipe.transform(newdate2, 'yyyy-MM-dd');
    } catch (error: any) {}

    var toDateData = this.leavesApproved.filter((e: any) => {
      if (e.toDate === null) {
        return null;
      } else {
        return e.toDate.split('T')[0] === latest_date;
      }
    });

    if (toDateData.length > 0) {
      this.leavesApproved = toDateData;
    }
  }
}
