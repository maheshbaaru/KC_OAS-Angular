import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { AuthguardService } from '../../services/authguard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  pendingLeaves : Int32Array;
  upComingRevision : Int32Array;
  ActiveEmploye : Int32Array;
  errorMessage ='';
  
  constructor(
    private  storageService: StorageService, private authService: AuthguardService) { }
  data = [
    { pendingLeaves: 24, upComingRevision: 0, ActiveEmploye: 36, profile: '' },
  ];

  ngOnInit(): void {
    debugger;
    this.authService.GetDashboarddetails().subscribe({
      next: (data: any) => {
        debugger
        this.pendingLeaves=data.approvalCount;
        this.upComingRevision=data.revisedCount;
        this.ActiveEmploye=data.employeeCount;

      },
      error: (err: { error: { message: string; }; }) => {
        this.errorMessage = err.error.message;
      }
    });

  }
}
