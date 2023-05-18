import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, Subscriber } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';

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

  constructor(
    private messageService: MessageService,
    private profileServ: ProfileService
  ) {}

  ngOnInit(): void {}

  upload() {
    this.image = this.image.replace('fakepath\\', '');
    let loogedUser: any = window.sessionStorage.getItem('auth-user');
    loogedUser = JSON.parse(loogedUser);
    this.profileServ
      .updatePhoto(this.image, loogedUser.employeeID * 1)
      .subscribe((res) => console.log(res));
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Basic Mode',
    });
  }
  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    this.image = target.value;

    this.convertToBase64(file);
  };

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
}
