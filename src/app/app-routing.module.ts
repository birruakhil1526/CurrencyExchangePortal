import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';

import { CustomersPageComponent } from './admin/customers-page/customers-page.component';
import { HeaderComponent } from './header/header.component';
import { customerAuthGuard } from './authenticator/customer-auth.guard';


const routes: Routes = [
  
  {
    path:'home',canActivate:[customerAuthGuard],
    component:CustomersPageComponent
  },
  {
    path:"",canActivate:[customerAuthGuard],
    component:HomePageComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'header',
    component:HeaderComponent
  },
  {path:'customers',loadChildren: ()=> import('../app/admin/admin.module').then(x=>x.AdminModule)},
  {path:'transactions',loadChildren:()=> import('../app/user/user.module').then(x=>x.UserModule)}
  
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
