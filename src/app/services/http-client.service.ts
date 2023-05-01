import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) {
    const API_CALL = 'https://localhost:7236';
   }



   postdesignation(){
    // return this.http.post('');
   }
}
