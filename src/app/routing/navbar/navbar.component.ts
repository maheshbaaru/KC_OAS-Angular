import { Component,OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { AuthguardService } from '../../services/authguard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{


private roles: string[] = [];
isLoggedIn = false;
showAdminBoard = false;
showModeratorBoard = false;
username?: string;
trigger: any;
isHome: boolean;
name?:string;
errorMessage = '';
PendingLeaves : Int32Array;
UpComingRevision : Int32Array;
ActiveEmploye : Int32Array;


constructor(
  private router: Router,private storageService: StorageService, private authService: AuthguardService) { }

ngOnInit(): void {
  
  this.isLoggedIn = this.storageService.isLoggedIn();

  if (this.isLoggedIn) {
    const user = this.storageService.getUser();
    if(user.designationID==1||user.designationID==11)
    {
      this.roles=['ROLE_ADMIN'];
      this.authService.GetDashboarddetails().subscribe({
        next: (data: any) => {
          debugger
          this.PendingLeaves=data.approvalCount;
          this.UpComingRevision=data.revisedCount;
          this.ActiveEmploye=data.employeeCount;

        },
        error: (err: { error: { message: string; }; }) => {
          this.errorMessage = err.error.message;
        }
      });
    }
    else{
     this.roles=['ROLE_MODERATOR'] ;
    }
    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

    this.username = user.name;
    this.name=this.username
  }
  this.isHome = true;

}
openMyMenu() {
  this.trigger.toggleMenu();
} 
hideHome(){
  this.isHome = false;
}


logout(): void {
  this.storageService.clean();
  this.router.navigate(['/login']);
}
}

