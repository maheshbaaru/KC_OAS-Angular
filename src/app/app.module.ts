import { HomeComponent } from './routing/home/home.component';
import { PrimengModule } from './primeng/primeng.module';
import { AppComponent } from './app.component';
import { SalarydisplyComponent } from './routing/salarydisply/salarydisply.component';
import { UpdateprofileComponent } from './profilecomponents/updateprofile/updateprofile.component';
import { LoginComponent } from './routing/login/login.component';

import { NavbarComponent } from './routing/navbar/navbar.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SalaryDetailsComponent } from './routing/Admin/salary-details/salary-details.component';
import { SalaryService } from './services/salary.service';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { CreateDesignationComponent } from './routing/Admin/create-designation/create-designation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTaxtypeComponent } from './routing/Admin/create-taxtype/create-taxtype.component';
import { CreateNewSalaryDetailsComponent } from './routing/create-new-salary-details/create-new-salary-details.component';
import { DropdownModule } from 'primeng/dropdown';
import { ProfilePhotoComponent } from './profilecomponents/profile-photo/profile-photo.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SalDeductionComponent } from './routing/Admin/sal-deduction/sal-deduction.component';
import { SalDeductionListComponent } from './routing/Admin/sal-deduction-list/sal-deduction-list.component';
import { LeavesApprovelComponent } from './routing/Leaves/leaves-approvel/leaves-approvel.component';
import { EmployeeAccessComponent } from './routing/Leaves/employee-access/employee-access.component';
import { ApplyLeavesComponent } from './routing/Leaves/apply-leaves/apply-leaves.component';
import { EmployeesComponent } from './routing/Admin/employees/employees.component';
import { PaySlipComponent } from './routing/pay-slip/pay-slip.component';
import { CreateNewEmployeeComponent } from './routing/Admin/create-new-employee/create-new-employee.component';
import { ChangepasswordComponent } from './profilecomponents/changepassword/changepassword.component';
import { UpdatephotoComponent } from './profilecomponents/updatephoto/updatephoto.component';
import { ForgotpasswordComponent } from './routing/forgotpassword/forgotpassword.component';

import { UpdateEmployeeComponent } from './routing/Admin/update-employee/update-employee.component';
import { EmployeeLeavesComponent } from './routing/Leaves/employee-leaves/employee-leaves.component';
import { BankDetailsComponent } from './routing/bank-details/bank-details.component';
import { CreateBankDetailsComponent } from './routing/bank-details/create-bank-details/create-bank-details.component';
import { EditBankDetailsComponent } from './routing/edit-bank-details/edit-bank-details.component';
import { EmployeService } from './services/employeBankService';
import { CreateLeaveComponent } from './routing/Leaves/create-leave/create-leave.component';
import { LeavesApprovalScreenComponent } from './routing/Leaves/leaves-approvel/leaves-approval-screen/leaves-approval-screen.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SalarydisplyComponent,
    UpdateprofileComponent,
    LoginComponent,
    NavbarComponent,
    ForgotpasswordComponent,
    SalaryDetailsComponent,
    CreateDesignationComponent,
    CreateTaxtypeComponent,
    CreateNewSalaryDetailsComponent,
    ProfilePhotoComponent,
    HomeComponent,

    SalDeductionComponent,
    SalDeductionListComponent,
    LeavesApprovelComponent,
    EmployeeAccessComponent,
    // Apply LeavesComponent,
    EmployeesComponent,
    PaySlipComponent,
    CreateNewEmployeeComponent,
    ApplyLeavesComponent,
    UpdatephotoComponent,
    ForgotpasswordComponent,
    ChangepasswordComponent,
    UpdateEmployeeComponent,
    EmployeeLeavesComponent,
    BankDetailsComponent,
    CreateBankDetailsComponent,
    EditBankDetailsComponent,
    CreateLeaveComponent,
    LeavesApprovalScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    ReactiveFormsModule,

    MaterialModule,
    HttpClientModule,
    TableModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    TableModule,
    DropdownModule,
    HttpClientModule,

    BrowserAnimationsModule,
    MaterialModule,
    PrimengModule,
    HttpClientModule,
  ],
  providers: [SalaryService, EmployeService,DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
