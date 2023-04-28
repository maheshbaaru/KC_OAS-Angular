import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}
  getImage() {
    return this.http.get('https://localhost:7236/GetProfilePhotos');
  }
}
