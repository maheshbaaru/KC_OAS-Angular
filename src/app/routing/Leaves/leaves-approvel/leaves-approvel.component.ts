import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { LeavesService } from 'src/app/services/leaves.service';
import namesData from 'src/assets/data/names.json';
interface StatusType {
  name: string;
}
interface EmployeeName {
  Name: string;
}
@Component({
  selector: 'app-leaves-approvel',
  templateUrl: './leaves-approvel.component.html',
  styleUrls: ['./leaves-approvel.component.css'],
})
export class LeavesApprovelComponent {
  leavesApproved: any;
  empForm: FormGroup;
  names: EmployeeName[];
  statusTypes: any;
  constructor(
    private http: HttpClient,
    private _fb: FormBuilder,
    private empservice: EmployeeService,
    private leaveSer: LeavesService
  ) {
    this.names = namesData;
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
      // console.log(data)
      this.leavesApproved = data;
    });
  }
  ngAfterViewInit() {
    this.leaveSer.getStatus().subscribe((res) => (this.statusTypes = res));
  }
}
