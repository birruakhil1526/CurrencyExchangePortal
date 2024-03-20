import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { UserRoutingModule } from './user-routing.module';
import { CurrencyExchangeportalComponent } from './currency-exchangeportal/currency-exchangeportal.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { CustomerHomepageComponent } from './customer-homepage/customer-homepage.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    CurrencyExchangeportalComponent,
            CustomerOrdersComponent,
            CustomerHomepageComponent,
            TransactionsComponent
  ],
  imports: [
    CommonModule,FormsModule, UserRoutingModule,ReactiveFormsModule,NgxPaginationModule
  ],
  providers:[]
})
export class UserModule { 

}
