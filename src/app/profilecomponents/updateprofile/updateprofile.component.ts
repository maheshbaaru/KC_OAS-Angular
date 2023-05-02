import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeedDataService } from 'src/app/services/EmployeesDataService';
import { HttpClientService } from 'src/app/services/http-client.service';


@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent {
  empdata: any;
  dendata:any
  constructor(
  private router:Router,
    private service: EmployeedDataService,private designatonservice:HttpClientService
  ) { }

  ngOnInit(): void {
   this.formdataget()
  }


  formdataget(){
    this.service.getEmployeeList().subscribe((data1: any) => {
      console.log(data1);
            this.empdata = data1;

    });
  }


  formdatpost(){
 this.designatonservice.postdesignation((data:any) =>{
      console.log(data)
      this. dendata= data;
    });
  }

}
