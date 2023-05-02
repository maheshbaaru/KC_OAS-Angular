import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
//import { EmployeedDataService } from 'src/app/services/EmployeesDataService';
import namesData from 'src/assets/data/names.json';
interface EmployeeName {
  Name: string

}

@Component({
  selector: 'app-create-new-salary-details',
  templateUrl: './create-new-salary-details.component.html',
  styleUrls: ['./create-new-salary-details.component.css']
})
export class CreateNewSalaryDetailsComponent {
  names: EmployeeName[];
  empForm: FormGroup;

  constructor(private _fb: FormBuilder, 
    //private _service: EmployeedDataService
    ) {
    this.names = namesData
    this.empForm = this._fb.group({
      name: '',
      Salary: '',
      LastRevisedDate: '',
      NextRevisedDate: ''
    })

  }

  onFormSubmit() {
    if (this.empForm.valid) {
      console.log(this.empForm.value)
    }
  }
  // ngOnInit() {
  //   this._service.getEmployeeList().subscribe(data => {
  //     console.log(data);
  //     this.names = data.filter((item: any) => {
  //       return item.firstName + item.lastName;
  //       console.log(this.names);
  //     })
  //   });
  // }
}
