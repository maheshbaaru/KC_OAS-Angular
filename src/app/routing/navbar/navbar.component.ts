import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { AuthguardService } from '../../services/authguard.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  trigger: any;
  isHome: boolean;
  name?: string;
  errorMessage = '';
  PendingLeaves: Int32Array;
  UpComingRevision: Int32Array;
  ActiveEmploye: Int32Array;
  profilePic: any;
  constructor(
    private router: Router,
    private storageService: StorageService,
    private authService: AuthguardService,
    private profileServ: ProfileService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.profileServ.getloggedInProfile().subscribe((blob: any) => {
      this.profilePic = 'data:image/jpg;base64,' + blob.photo;

      if (blob.photo) {
        window.sessionStorage.setItem('profilePic', 'true');
      } else {
        window.sessionStorage.setItem('profilePic', 'false');
      }
    });
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      if (user.designationID == 1 || user.designationID == 11) {
        this.roles = ['ROLE_ADMIN'];
        this.authService.GetDashboarddetails().subscribe({
          next: (data: any) => {
            this.PendingLeaves = data.approvalCount;
            this.UpComingRevision = data.revisedCount;
            this.ActiveEmploye = data.employeeCount;
          },
          error: (err: { error: { message: string } }) => {
            this.errorMessage = err.error.message;
          },
        });
      } else {
        this.roles = ['ROLE_MODERATOR'];
      }
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      window.sessionStorage.setItem('isAdmin', this.showAdminBoard + '');
      this.username = user.name;
      this.name = this.username;
    }
    this.isHome = true;
  }
  openMyMenu() {
    this.trigger.toggleMenu();
  }
  hideHome() {
    this.isHome = false;
  }

  logout(): void {
    this.storageService.clean();
    this.router.navigate(['/login']);
  }
  ngAfterViewInit() {
    this.profileServ.userPhoto.subscribe((res) => {
      this.profilePic = res;
    });
  }
}
