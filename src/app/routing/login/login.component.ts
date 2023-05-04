import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  show = false;
  password: string;


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
    private service: EmployeedDataService
  ) {}




  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().designationID;
    }
    this.rememberMe = false;
  }


  

 

  onSubmit() {

    this.password = 'password'
 const { username, password,rememberMe} = this.form;
    this.authService.login(username, password).subscribe({
      next: (data: any) => {
        this.service.getEmployeeList().subscribe((data1: any) => {
          window.sessionStorage.setItem('loggedinUser', JSON.stringify(data1.find((x:any)=>
          x.id==data.id)));
          window.sessionStorage.setItem('EmployeeList',JSON.stringify(data1));
        });
        console.log('data',data)
        if (data != '' && data != null) {

          this.storageService.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['navbar']);
        } else {
          this.errorMessage = 'Invalid user email or password entered';
          this.isLoginFailed = true;
        }
      },
      error: (err: { error: { message: string } }) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
      
    });
    if(rememberMe) {
      sessionStorage.setItem('rememberMe', 'yes')
    }
  }

 
  reloadPage(): void {
    window.location.reload();
  }
}
