import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LeavesService } from 'src/app/services/leaves.service';


interface LeaveType {
  name: string;
}

@Component({
  selector: 'app-create-leave',
  templateUrl: './create-leave.component.html',
  styleUrls: ['./create-leave.component.css']
})
export class CreateLeaveComponent {
  leaveTypes: LeaveType[];
  empForm:FormGroup;
  // empForm = new  FormGroup({
  //   empId: new FormControl('', [Validators.required]),
  //   leaveTypeId: new FormControl('', [Validators.required]),
  //   nOfLeaves: new FormControl('', [Validators.required]),
  //   year: new FormControl('', [Validators.required]),
  //   remainingLeaves: new FormControl('', [Validators.required]),

  // });

  
 constructor(private _fb:FormBuilder,private _leaveservice:LeavesService, private formBuilder: FormBuilder,){
  this.leaveTypes = [
    { name: 'Casual' },
    { name: 'Sick' },
    { name: 'Earned' },
    { name: 'Compensation' },
    { name: 'Optional' },
  ];
  
 }


 ngOnInit(): void {
  this.empForm = this.formBuilder.group({
    leaveTypeId: new FormControl({
      value: '',
      disabled: false,
    }),
    fromdate: new FormControl({
      value: '',
      disabled: false,
    }),
    todate: new FormControl({
      value: '',
      disabled: false,
    }),
    status: new FormControl({
      value: '',
      disabled: false,
    }),
    comments: new FormControl({
      value: '',
      disabled: false,
    }),
    
  });

 }

 onFormSubmit(data:any ){
  this._leaveservice.applyleave( data).subscribe((res:any)=>{
      console.log(res);
      if(this.empForm.valid){
        console.log(this.empForm.value)
      }
    })

 
}

}
