import { Component } from '@angular/core';

@Component({
  selector: 'app-create-designation',
  templateUrl: './create-designation.component.html',
  styleUrls: ['./create-designation.component.css']
})
export class CreateDesignationComponent {
  designationService: any;



  submit(){
   
    this.designationService.createDesignation(this.designation);



  }
  designation(designation: any) {
    throw new Error('Method not implemented.');
  }

}
