import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeedDataService } from 'src/app/services/EmployeesDataService';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.css']
})
export class ProfilePhotoComponent {

  public updateform: FormGroup

  empdata: any;
  constructor(
  private router:Router,
    private service: EmployeedDataService,private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
   this.profilephoto()

   
   this.updateform = this.formBuilder.group({
    employeeID: new FormControl({
      value: '',
      disabled: false,
     
    }),
    firstName: new FormControl({
      value: '',
      disabled: false
    }),
    lastName: new FormControl({
      value: '',
      disabled: false
    }),
    email: new FormControl({
      value: '',
      disabled: false
    }),
    panNumber: new FormControl({
      value: '',
      disabled: false
    }),
    designationName: new FormControl({
      value: '',
      disabled: false
    }),
    shiftName: new FormControl({
      value: '',
      disabled: false
    }),
    isActive: new FormControl({
      value: '',
      disabled: false
    }),
    doj: new FormControl({
      value: '',
      disabled: false
    }),
    designationID: new FormControl({
      value: '',
      disabled: false
    }),
    id: new FormControl({
      value: '',
      disabled: false
    }),
    isLocked: new FormControl({
      value: '',
      disabled: false
    }),
    name: new FormControl({
      value: '',
      disabled: false
    }),
    password: new FormControl({
      value: '',
      disabled: false
    }),
    shiftId: new FormControl({
      value: '',
      disabled: false
    }),
  });
 
 this.formdataget()
  }


  formdataget(){
  
    let userdata :any= window.sessionStorage.getItem('loggedinUser') ;
    console.log(userdata)
    // this.service.getEmployeeList().subscribe((data1: any) => {
    //   console.log(data1);
           this.updateform.setValue(JSON.parse(userdata)) ;
            if(!userdata.isActive) this.updateform.controls['isActive'].disable()
    // });
  }

  profilephoto(){
    this.service.getEmployeeList().subscribe((data1: any) => {
      console.log(data1);
            this.empdata = data1;

    });
  }


}
