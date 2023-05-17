import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}
  getImages() {
    return this.http.get('https://localhost:7236/GetProfilePhotos');
  }
  getloggedInProfile() {
    let loogedUser: any = window.sessionStorage.getItem('auth-user');
    loogedUser = JSON.parse(loogedUser);
    return this.http.get(
      `https://localhost:7236/GetProfilePhoto?id=${loogedUser.id}`
    );
  }
  addprofilephoto(data: any) {
    let loogedUser: any = window.sessionStorage.getItem('auth-user');
    loogedUser = JSON.parse(loogedUser);
    return this.http.post(`https://localhost:7236/AddProfilePhoto`, data);
  }
  updatePhoto(image: string, EmpId: number) {
    return this.http.put(
      `https://localhost:7236/UpdateProfilePhoto?EmpId=${EmpId}&image=${image}`,
      this.httpOptions
    );
  }
}
