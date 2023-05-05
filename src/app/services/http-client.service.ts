import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { environment } from './environment';





const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) {
    const API_CALL = 'https://localhost:7236';
   }



   postdesignation(data:any){
    this.http.post('https://localhost:7236/GetTblEmpBankDetails', data)
   }

   profilephoto(id:any){
    this.http.put('https://localhost:7236/AddProfilePhoto',id)
   }



   getUpdateform( ){
    return this.http.get<any>(environment.API_URL+environment.BASE_URL+'Login?id='+'',  httpOptions);
  }
}
