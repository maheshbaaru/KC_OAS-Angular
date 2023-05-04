import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EmployeedDataService } from 'src/app/services/EmployeesDataService';
import { ProfileService } from 'src/app/services/profile.service';
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
 
  constructor(private messageService: MessageService , private service: EmployeedDataService ,private formBuilder: FormBuilder,private profileServ: ProfileService) {}
  ngOnInit(): void {
    this.profileServ.getloggedInProfile().subscribe((blob:any)=>{
      this.preview= 'data:image/jpg;base64,'+blob.photo});

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
}
