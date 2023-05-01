import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}
  canActivate(): boolean {
    if (this.storageService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('/login')
      return false;
    }
  }
}
