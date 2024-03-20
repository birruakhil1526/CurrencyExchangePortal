import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyExchangeportalComponent } from './currency-exchangeportal/currency-exchangeportal.component';
import { CustomerHomepageComponent } from './customer-homepage/customer-homepage.component';
import { TransactionsComponent } from './transactions/transactions.component';

import { customerAuthGuard } from '../authenticator/customer-auth.guard';


const routes : Routes=[
  {path:'exchange',component:CurrencyExchangeportalComponent,canActivate:[customerAuthGuard]},
  {path:'user-home',component:CustomerHomepageComponent},
  {path:'',component:TransactionsComponent,canActivate:[customerAuthGuard]}
  
]
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
