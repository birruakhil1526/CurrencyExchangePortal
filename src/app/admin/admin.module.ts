import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomersPageComponent } from './customers-page/customers-page.component';
import { AccountsPageComponent } from './accounts-page/accounts-page.component';
import { CustomerService } from '../service/customer.service';
import { NavigationTabsComponent } from './navigation-tabs/navigation-tabs.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    CustomerAccountsComponent,
    AddCustomerComponent,
    CustomersPageComponent,
    AccountsPageComponent,
    NavigationTabsComponent
  ],
  imports: [
    CommonModule,MatIconModule,FormsModule,ReactiveFormsModule,AdminRoutingModule,NgxPaginationModule
  ],
  providers: []
})
export class AdminModule { }
