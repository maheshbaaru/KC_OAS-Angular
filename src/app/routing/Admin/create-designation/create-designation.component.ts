import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeedDataService } from 'src/app/services/EmployeesDataService';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-create-designation',
  templateUrl: './create-designation.component.html',
  styleUrls: ['./create-designation.component.css']
})
export class CreateDesignationComponent {

  constructor(
    private router:Router,
    private service: EmployeedDataService,
    private dgnservice:HttpClientService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(data:any){
    this.submit(data)
  }

  submit(data:any ){

    // this.router.navigate['/navbar']
//  this.dgnservice.postdesignation(data).subscribe(
//   data => {
//     console.log(data);
// }
//  )

 }
  
 
}
