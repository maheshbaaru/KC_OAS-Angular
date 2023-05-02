import { Component } from '@angular/core';
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
  
  constructor(private messageService: MessageService , private service: EmployeedDataService) {}
  onUpload(event: any) {


    
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Basic Mode',
    });
  }




  ngOnInit(): void {
   this.updatephoto()
  }


  updatephoto(){
    this.service.getEmployeeList().subscribe((data1: any) => {
      console.log(data1);
            this.empdata = data1;

    });
  }

}
