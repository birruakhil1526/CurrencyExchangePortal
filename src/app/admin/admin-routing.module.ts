import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomersPageComponent } from './customers-page/customers-page.component';
import { AccountsPageComponent } from './accounts-page/accounts-page.component';
import { customerAuthGuard } from '../authenticator/customer-auth.guard';


const routes : Routes=[
  
  {path:'',component:CustomersPageComponent,canActivate:[customerAuthGuard]},
  {path:'accounts',component:AccountsPageComponent,canActivate:[customerAuthGuard]},
  {path:'add-accounts',component:CustomerAccountsComponent,canActivate:[customerAuthGuard]},
  {path:"add-customer",component:AddCustomerComponent},
  {path:'delete',component:CustomersPageComponent,canActivate:[customerAuthGuard]},
  {path:'add-customer/:customer',component:AddCustomerComponent,canActivate:[customerAuthGuard]},
  {path:"edit-customer/:id",component:AddCustomerComponent,canActivate:[customerAuthGuard]},
  {path:'add-accounts/:id',component:CustomerAccountsComponent,canActivate:[customerAuthGuard]},


  

]
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
