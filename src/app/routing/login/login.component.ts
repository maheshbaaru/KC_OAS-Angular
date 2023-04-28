import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthguardService } from 'src/app/services/authguard.service';
// import { AuthguardService } from 'app/services/authguard.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  // const togglePassword = document.querySelector('#togglePassword');
  // const password = document.querySelector('#id_password');

//   togglePassword.addEventListener('click', function (e) {
//     // toggle the type attribute
//     const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
//     password.setAttribute('type', type);
//     // toggle the eye slash icon
//     this.classList.toggle('fa-eye-slash');
// });



  ṣshow = false;
  password: string;



  form: any = {
    username: null,
    password: null,
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
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().designationID;
    }
  }

  onSubmit() {
 const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: (data: any) => {
        if (!!data.email) {
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
  }

  reloadPage(): void {
    window.location.reload();
  }
}
