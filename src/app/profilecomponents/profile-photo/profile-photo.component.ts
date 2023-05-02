import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeedDataService } from 'src/app/services/EmployeesDataService';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.css']
})
export class ProfilePhotoComponent {



  empdata: any;
  constructor(
  private router:Router,
    private service: EmployeedDataService
  ) { }

  ngOnInit(): void {
   this.profilephoto()
  }


  profilephoto(){
    this.service.getEmployeeList().subscribe((data1: any) => {
      console.log(data1);
            this.empdata = data1;

    });
  }


}
