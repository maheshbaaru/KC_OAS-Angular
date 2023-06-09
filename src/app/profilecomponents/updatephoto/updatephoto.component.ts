import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, Subscriber } from 'rxjs';

import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-updatephoto',
  templateUrl: './updatephoto.component.html',
  styleUrls: ['./updatephoto.component.css'],
})
export class UpdatephotoComponent {
  myReactiveForm: FormGroup;
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
    this.image = target.value;
    this.convertToBase64(file);
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
    private profileServ: ProfileService,
    private route: Router
  ) {}

  ngOnInit(): void {
    let emp: any = window.sessionStorage.getItem('loggedinUser');
    this.empdata = JSON.parse(emp);
    this.myReactiveForm = new FormGroup({
      photo: new FormControl(null, Validators.required),
    });
  }

  upload() {
    let profilepic = window.sessionStorage.getItem('profilePic') || '';
    profilepic = JSON.parse(profilepic);
    if (this.myReactiveForm.invalid) {
      for (const control of Object.keys(this.myReactiveForm.controls)) {
        this.myReactiveForm.controls[control].markAsTouched();
        this.myReactiveForm.controls[control].markAsDirty();
      }
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill the required fields',
        sticky: true,
      });
      return;
    } else if (this.myReactiveForm.valid) {
      if (!profilepic) {
        this.image = this.image.replace('fakepath\\', '');

        let loogedUser: any = window.sessionStorage.getItem('auth-user');

        loogedUser = JSON.parse(loogedUser);
        this.profileServ
          .addprofilephoto(this.image, loogedUser.employeeID * 1)
          .subscribe((res: any) => {
            this.profileServ.userPhoto.next(this.preview);
          });
      } else {
        this.image = this.image.replace('fakepath\\', '');

        let loogedUser: any = window.sessionStorage.getItem('auth-user');

        loogedUser = JSON.parse(loogedUser);
        this.profileServ
          .updatePhoto(this.image, loogedUser.employeeID * 1)
          .subscribe((res) => {
            this.profileServ.userPhoto.next(this.preview);
            if (res) {
              return this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Photo Uploaded.',
              });
            }
            this.myReactiveForm.reset();
          });
      }
    }
  }
}
