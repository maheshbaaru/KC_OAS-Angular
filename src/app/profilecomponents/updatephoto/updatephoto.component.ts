import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EmployeedDataService } from 'src/app/services/EmployeesDataService';
import { ProfileService } from 'src/app/services/profile.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-updatephoto',
  templateUrl: './updatephoto.component.html',
  styleUrls: ['./updatephoto.component.css'],
  providers: [MessageService],
})
export class UpdatephotoComponent {
  selectedFiles?: FileList;
data:any 
  imageInfos:any;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  empdata: any;
  public updateform: FormGroup;
 
  constructor(private messageService: MessageService ,
     private service: EmployeedDataService ,
     private formBuilder: FormBuilder,
     private profileServ: ProfileService,
     private storageService: StorageService,) {}

  ngOnInit(): void {
    let emp: any = window.sessionStorage.getItem('loggedinUser');
    this.empdata = JSON.parse(emp)
    // this.profileServ.addprofilephoto(EmpId,Id).subscribe((data:any)=>{
    //   this.preview= 'data:image/jpg;base64,'+data.photo});

   }
  
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
        this.data = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };
        reader.readAsDataURL(this.data);
      }
    }
  }

  upload( ): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
      
      console.log(this.currentFile)

     this.profileServ.addprofilephoto({'EmpId': this.empdata.employeeID, 'Photo': this.preview }).subscribe({
      next: (event: any) => {
            // if (event.type === HttpEventType.UploadProgress) {
            //   this.progress = Math.round((100 * event.loaded) / event.total);
            // } else if (event instanceof HttpResponse) {
            //   this.message = event.body.message;
            //   this.imageInfos = this.profileServ.addprofilephoto(EmpId,Id);
            // }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the image!';
            }

            this.currentFile = undefined;
          },
        });
      }

      this.selectedFiles = undefined;
    }
  }
}
