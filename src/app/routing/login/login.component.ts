import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthguardService } from 'src/app/services/authguard.service';
// import { AuthguardService } from 'app/services/authguard.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private fb: FormBuilder,private authService: AuthguardService, private storageService: StorageService,private router: Router,) { }

    
    ngOnInit(): void {
      if (this.storageService.isLoggedIn()) {
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().designationID;
      }
    }
  
    onSubmit() {
  debugger

      const { username, password } = this.form;
      this.authService.login(username, password).subscribe({
        next: (data: any) => {
          this.storageService.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['navbar']);
        },
        error: (err: { error: { message: string; }; }) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      });
    }
    
  
    reloadPage(): void {
      window.location.reload();
    }
  }

