import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Customer, Employee, Representative } from '../../Modesls/employeBankInterface';
import { EmployeService } from '../../services/employeBankService';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.scss']
})
export class BankDetailsComponent implements OnInit{
  employees: Employee[] | any;
  
  employees2: Employee[] | any;

  employeeSearchText:string
  
  selectedCustomers: Customer[] | any;

  representatives: Representative[] | any;

  statuses: any[] | any;

  

  @ViewChild('dt') table: Table | any;

  constructor(private employeeService: EmployeService,
       private primengConfig: PrimeNGConfig,
       private router:Router) { }

  ngOnInit() {
    //   this.employeeService.getEmployeeData().then(employees => {
    //       this.employees = employees;
    //       this.loading = false;
          
      //});

this.employeeService.getEmployeeData().subscribe((result:any)=>{
   
    // this.employees=result;
    this.employees2=result;

    const employeeData = this.employees2.map((person: any) => ({
        ...person,

        empId:
          person.empId < 10
            ? 'KC00' + person.empId
            : person.empId && person.empId < 100
            ? 'KC0' + person.empId
            : person.empId && person.empId >= 100
            ? 'KC' + person.empId
            : person.empId,
          }));
      this.employees = employeeData;






})
     

      this.statuses = [
          {label: 'Unqualified', value: 'unqualified'},
          {label: 'Qualified', value: 'qualified'},
          {label: 'New', value: 'new'},
          {label: 'Negotiation', value: 'negotiation'},
          {label: 'Renewal', value: 'renewal'},
          {label: 'Proposal', value: 'proposal'}
      ]
      this.primengConfig.ripple = true;
      
  }

  
  onActivityChange(event:any) {
      const value = event.target.value;
      if (value && value.trim().length) {
          const activity = parseInt(value);

          if (!isNaN(activity)) {
              this.table.filter(activity, 'activity', 'gte');
          }
      }
  }

  onDateSelect(value:any) {
      this.table.filter(this.formatDate(value), 'date', 'equals')
  }

  formatDate(date:any) {
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (month < 10) {
          month = '0' + month;
      }

      if (day < 10) {
          day = '0' + day;
      }

      return date.getFullYear() + '-' + month + '-' + day;
  }

  onRepresentativeChange(event:any) {
      this.table.filter(event.value, 'representative', 'in')
  }

  onCLickcreate(){
      
      //   this.router.navigate(['./create-bank-details'])
    //    this.router.navigateByUrl('/create-bank-details');
    }

    navigateToEditBankDetails(empId: number) {
        this.router.navigate(['../edit-bank-details', empId]);
      }
}
