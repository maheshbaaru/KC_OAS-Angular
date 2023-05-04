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
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
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

  

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  upload(): void {
    this.progress = 0;

    // if (this.selectedFiles) {
    //   const file: File | null = this.selectedFiles.item(0);

    //   if (file) {
    //     this.currentFile = file;

    //     // this.uploadService.upload(this.currentFile).subscribe({
    //     //   next: (event: any) => {
    //     //     if (event.type === HttpEventType.UploadProgress) {
    //     //       this.progress = Math.round((100 * event.loaded) / event.total);
    //     //     } else if (event instanceof HttpResponse) {
    //     //       this.message = event.body.message;
    //     //       this.imageInfos = this.uploadService.getFiles();
    //     //     }
    //       },
    //       error: (err: any) => {
    //         console.log(err);
    //         this.progress = 0;

    //         if (err.error && err.error.message) {
    //           this.message = err.error.message;
    //         } else {
    //           this.message = 'Could not upload the image!';
    //         }

    //         this.currentFile = undefined;
    //       },
    //     });
    //   }

    //   this.selectedFiles = undefined;
    // }
  }
  ngOnInit(): void {
   this.updatephoto()

   
 
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
