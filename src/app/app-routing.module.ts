import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateprofileComponent } from './profilecomponents/updateprofile/updateprofile.component';
import { LoginComponent } from './routing/login/login.component';
import { NavbarComponent } from './routing/navbar/navbar.component';
import { SalaryDetailsComponent } from './routing/salary-details/salary-details.component';
// import { SalaryDetailsComponent } from './salary-details/salary-details.component';
import { CreateDesignationComponent } from './routing/create-designation/create-designation.component';
import { CreateTaxtypeComponent } from './routing/create-taxtype/create-taxtype.component';
import { CreateNewSalaryDetailsComponent } from './routing/create-new-salary-details/create-new-salary-details.component';
import { ProfilePhotoComponent } from './profilecomponents/profile-photo/profile-photo.component';

import { SalDeductionComponent } from './routing/sal-deduction/sal-deduction.component';
import { HomeComponent } from './routing/home/home.component';

import { SalDeductionListComponent } from './routing/sal-deduction-list/sal-deduction-list.component';
import { LeavesApprovelComponent } from './routing/leaves-approvel/leaves-approvel.component';
import { EmployeeAccessComponent } from './routing/employee-access/employee-access.component';
import { ApppledLeavesComponent } from './routing/apppled-leaves/apppled-leaves.component';
import { EmployeesComponent } from './routing/employees/employees.component';
import { PaySlipComponent } from './routing/pay-slip/pay-slip.component';
import { ChangepasswordComponent } from './profilecomponents/changepassword/changepassword.component';
import { CreateNewEmployeeComponent } from './routing/create-new-employee/create-new-employee.component';
import { UpdatephotoComponent } from './profilecomponents/updatephoto/updatephoto.component';
import { ForgotpasswordComponent } from './routing/forgotpassword/forgotpassword.component';
import { UpdateEmployeeComponent } from './routing/update-employee/update-employee.component';
import { EmployeeLeavesComponent } from './routing/employee-leaves/employee-leaves.component';
import { BankDetailsComponent } from './routing/bank-details/bank-details.component';
import { CreateBankDetailsComponent } from './routing/create-bank-details/create-bank-details.component';
import { EditBankDetailsComponent } from './routing/edit-bank-details/edit-bank-details.component';
import { CreateLeaveComponent } from './routing/create-leave/create-leave.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },

  { path: '** ', redirectTo: '/login' },

  {
    path: 'navbar',
    component: NavbarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'updateprofile', component: UpdateprofileComponent },
      { path: 'salary-details', component: SalaryDetailsComponent },
      {path: 'create-new-salary-details',component: CreateNewSalaryDetailsComponent,},
      { path: 'create-designation', component: CreateDesignationComponent },
      { path: 'changepassword', component: ChangepasswordComponent },
      { path: 'create-taxtype', component: CreateTaxtypeComponent },
      { path: 'profile-photo', component: ProfilePhotoComponent },
      { path: 'salDeduction', component: SalDeductionComponent },
      { path: 'salary-details', component: SalaryDetailsComponent },
      { path: 'create-designation', component: CreateDesignationComponent },
      { path: 'create-taxtype', component: CreateTaxtypeComponent },
      { path: 'profile-photo', component: ProfilePhotoComponent },
      { path: 'DeductionList/:id', component: SalDeductionListComponent },
      { path: 'leavesApprov', component: LeavesApprovelComponent },
      { path: 'access', component: EmployeeAccessComponent },
      { path: 'apply', component: ApppledLeavesComponent },
      { path: 'Employees', component: EmployeesComponent },
      { path: 'paySlip', component: PaySlipComponent },
      { path: 'create-new-salary-details',component: CreateNewSalaryDetailsComponent,},
      { path: 'create-leave', component: CreateLeaveComponent },
      { path: 'cretenewemployee', component: CreateNewEmployeeComponent },
      { path: 'updatephoto', component: UpdatephotoComponent },
      { path: 'updateemployee', component: UpdateEmployeeComponent },
      { path: 'employee-leaves', component: EmployeeLeavesComponent },
      { path: 'bankDetails', component: BankDetailsComponent },
      { path: 'create-bank-details', component: CreateBankDetailsComponent },
      { path: 'edit-bank-details/:id', component: EditBankDetailsComponent },
    ],
  },

  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}