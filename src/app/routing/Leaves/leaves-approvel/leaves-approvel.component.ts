import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import namesData from 'src/assets/data/names.json';
interface StatusType {
  name: string;
}
interface EmployeeName {
  Name: string

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
  statusTypes: StatusType[];
  constructor(private http: HttpClient,private _fb:FormBuilder, private empservice:EmployeeService) {
    this.names = namesData
    this.statusTypes = [
      { name: 'Pending' },
      { name: 'Approved' },
      { name: 'Declined' },
    
    ];
    this.empForm=this._fb.group({
      name:'',
      Salary:'',
      LastRevisedDate:'',
      NextRevisedDate:''
    })
  }
  ngOnInit() {

    this.empservice.appliedLeaves().subscribe((data) => {
      this.leavesApproved  = data;
      console.log(data);
    });
    // this.http.get('assets/data/employeeLeaves.json').subscribe((data) => {
    //   this.employeeLeavs = data;
    //   console.log(data);
    //   console.log(this.employeeLeavs);
    // });
  }
}
