import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
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
  myImage!: Observable<any>;
  base64code!: any;
  selectedFiles?: FileList;
  data: any;
  imageInfos: any;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  empdata: any;
  image: string = '';
  EmpId: number;

  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    if (file) {
      this.image = target.value;

      this.convertToBase64(file);
    } else {
      return console.log('error');
    }
  };
  fileupload: any;

  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe((d) => {
      this.preview = d;
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();

    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    };
  }

  public updateform: FormGroup;

  constructor(
    private messageService: MessageService,
    private service: EmployeedDataService,
    private formBuilder: FormBuilder,
    private profileServ: ProfileService,
    private storageService: StorageService,
    private route: Router
  ) {}

  ngOnInit(): void {
    let emp: any = window.sessionStorage.getItem('loggedinUser');
    this.empdata = JSON.parse(emp);

    // this.profileServ.addprofilephoto(EmpId,Id).subscribe((data:any)=>{
    //   this.preview= 'data:image/jpg;base64,'+data.photo});
  }

  upload() {
    let profilepic = window.sessionStorage.getItem('profilePic') || '';
    profilepic = JSON.parse(profilepic);

    if (!profilepic) {
      this.image = this.image.replace('fakepath\\', '');

      let loogedUser: any = window.sessionStorage.getItem('auth-user');

      loogedUser = JSON.parse(loogedUser);
      this.profileServ
        .addprofilephoto(this.image, loogedUser.employeeID * 1)
        .subscribe((res: any) => {
          this.profileServ.userPhoto.next(this.preview);

          console.log(res);
        });
    } else {
      this.image = this.image.replace('fakepath\\', '');

      let loogedUser: any = window.sessionStorage.getItem('auth-user');

      loogedUser = JSON.parse(loogedUser);
      this.profileServ
        .updatePhoto(this.image, loogedUser.employeeID * 1)
        .subscribe((res) => {
          this.profileServ.userPhoto.next(this.preview);
          res;
        });
      this.messageService.add({
        severity: 'info',
        summary: 'Success',
        detail: 'File Uploaded with Basic Mode',
      });
    }

    this.route.navigate(['/navbar']);
  }
}
