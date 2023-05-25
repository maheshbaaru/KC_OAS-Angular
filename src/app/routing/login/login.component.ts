import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs';
import { EmployeedDataService } from 'src/app/services/EmployeesDataService';
import { AuthguardService } from 'src/app/services/authguard.service';
// import { AuthguardService } from 'app/services/authguard.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  rememberMe: boolean;
  f: any;
  show = false;
  password: string;
  myform: FormGroup;
  invalid = true;
  form: any = {
    username: null,
    password: null,
    rememberMe: false,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  loginForm: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthguardService,
    private storageService: StorageService,
    private router: Router,
    private service: EmployeedDataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().designationID;
    }
    this.rememberMe = false;
    this.invalid;
    this.f = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null),
      rememberMe: new FormControl(null),
    });
  }

  onSubmit() {
    this.password = 'password';
    const { username, password, rememberMe } = this.form;
    if (!this.form.username || this.form.username == null || !this.form.password || this.form.password ==null) {
      // for (const control of Object.keys(this.form.controls)) {
      //   // this.form.controls[control].markAsTouched();
      //   // this.form.controls[control].markAsDirty();
      //   this.loginForm=false
      
      // }

      
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill the required fields',
        sticky: true,
      });
 
     
    } else {
      this.authService.login(username, password).subscribe({
        next: (data: any) => {
          if (data) {
            this.service.getEmployeeList().subscribe((data1: any) => {
              window.sessionStorage.setItem(
                'loggedinUser',
                JSON.stringify(data1.find((x: any) => x.id == data.id))
              );
              window.sessionStorage.setItem(
                'EmployeeList',
                JSON.stringify(data1)
              );
            });
            if (data != '' && data != null) {
              this.storageService.saveUser(data);
              this.isLoginFailed = false;
              this.isLoggedIn = false;
              this.router.navigate(['navbar']);
            } else {
              this.errorMessage = 'Username/Password is incorrect';
              this.isLoginFailed = true;
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please fill the required fields',
                sticky: true,
              });
            }
          } else {
            this.messageService.clear();
            // this.errorMessage = 'Username/Password is incorrect';
            this.isLoginFailed = true;
            this.messageService.add({   
              severity: 'error',
              summary: 'Error',
              detail: 'Username/Password is incorrect ',
              sticky: true,
            });
          }
        },

        error: (err: { error: { message: string } }) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        },
      });
      if (rememberMe) {
        sessionStorage.setItem('rememberMe', 'yes');
      }
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
