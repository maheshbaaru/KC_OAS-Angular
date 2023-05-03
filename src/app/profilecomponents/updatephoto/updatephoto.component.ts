import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EmployeedDataService } from 'src/app/services/EmployeesDataService';
@Component({
  selector: 'app-updatephoto',
  templateUrl: './updatephoto.component.html',
  styleUrls: ['./updatephoto.component.css'],
  providers: [MessageService],
})
export class UpdatephotoComponent {

  empdata: any;
  public updateform: FormGroup;
 
  constructor(private messageService: MessageService , private service: EmployeedDataService ,private formBuilder: FormBuilder) {}
  onUpload(event: any) {


    
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Basic Mode',
    });
  }




  ngOnInit(): void {
   this.updatephoto()

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


  updatephoto(){
    this.service.getEmployeeList().subscribe((data1: any) => {
      console.log(data1);
            this.empdata = data1;

    });
  }

}
