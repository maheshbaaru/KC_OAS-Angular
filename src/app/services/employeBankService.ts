// saleem changes

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Modesls/employeBankInterface';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';




@Injectable()
export class EmployeService {

    //private baseUrl = '../assets/data/employeeBankData.json';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-type': 'application/json'
        })
    }
    currentid: any;

    constructor(
        private http: HttpClient,
        private route:ActivatedRoute,
        ) { }

    getEmployeeData(): Observable<any[]> {
        return new Observable((observer) => {
            this.http.get('https://localhost:7236/GetTblEmpBankDetails').subscribe((result) => {
                const resultData = Object.values(result);
                observer.next(resultData);
                observer.complete();
            })
        })
    }

    id(id:any){
        this.currentid=id
    }

    getSpecifiEmployeeDataById(): Observable<any[]>{
        return new Observable((observer) => {
            this.http.get(`https://localhost:7236/GetSpecificBankDetails?id=${this.currentid}`).subscribe((result) => {
                const resultData = Object.values(result);
                //  console.log(resultData);
                observer.next(resultData);
                observer.complete();
            })
        })
    }

    updateEmployeeBankData(updateData: any) {
        // debugger;
        
        const body = JSON.stringify(updateData);
        //  return this.http.put<any>('https://localhost:7236/UpdateBankDetails?', body,this.httpOptions)
         return this.http.put<any>(`https://localhost:7236/UpdateBankDetails?Id=${updateData.id}&EmpId=${updateData.empId}&Accno=${updateData.accno}&BankName=${updateData.bankName}&Accname=${updateData.accname}`,this.httpOptions)
         .subscribe((result)=>{
            const resultData = Object.values(result)
         })
         
    }

    PostEmployeeNewBankData(postData: any) {
        // debugger;
        
        const body = JSON.stringify(postData);
       
        //  return this.http.put<any>('https://localhost:7236/UpdateBankDetails?', body,this.httpOptions)
         return this.http.post<any>(`https://localhost:7236/CreateNewEmpBankDetails?EmpId=${postData.empId}&Accno=${postData.accno}&BankName=${postData.bankName}&Accname=${postData.Accname}`,this.httpOptions)
         .subscribe((result)=>{
            const resultData = Object.values(result)
         })
         // acc name adding ass a null
         
    }
    
  
}


// var bankDet={Id:1,EmpId:3,Accno:234,BankName:'SSB',Accname:'SA'};
// var bankDetJ=JSON.stringify(bankDet);


 // getEmployeeData() {
    //     return this.http.get<any>('../assets/data/employeeBankData.json')
    //         .toPromise()
    //         .then(res => <Employee[]>res.data)
    //         .then(data => { return data; console.log(data) });


    // }


        // creatEmployeDataAndPost(datas: any) {
    //     this.http.post('../assets/data/employeeBankData.json', datas, this.httpOptions)
    //     console.log('succesfullyAdded')
    //     console.log(datas)
    // }