import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}
  getImages() {
    return this.http.get('https://localhost:7236/GetProfilePhotos');
  }
  getloggedInProfile() {
    let loogedUser: any = window.sessionStorage.getItem('auth-user')
    loogedUser = JSON.parse(loogedUser)
    return this.http.get(`https://localhost:7236/GetProfilePhoto?id=${loogedUser.id}`);
  }
  addprofilephoto(Photo:string,EmpId:number){


    // return this.http.post(`https://localhost:7236/AddProfilePhoto`)

  }
}
