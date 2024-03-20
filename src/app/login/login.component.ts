import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginDetails = this.fbr.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })
 
  customer:any
  constructor(private fbr: FormBuilder, public route: Router, private service: CustomerService) {
   
    
   }
  get email() {
    return this.loginDetails.get('email')
  }
  get password() {
    return this.loginDetails.get('password')
  }
  submit() {
    console.log(this.loginDetails.value);
    this.customer=this.loginDetails.value.email
    localStorage.setItem('userName',JSON.stringify(this.customer))
   
    this.service.login(this.loginDetails.value).pipe(catchError((error) => {
      if (error.status === 403) {
        Swal.fire({
          icon: 'error',
          text: error.error.errorMessgae,
          showConfirmButton: true,
          confirmButtonColor: 'red'
        })
      }
       else {
        console.error('An error occurred:', error.statusText);
      }
      return throwError(error);
    })).subscribe((x: any) => {
      Swal.fire({
        icon: 'success',
        text: 'Login Successful',
        timer:1000,
        showConfirmButton: false,
      })
        localStorage.setItem('loggedIn', '1')
        
        console.log(localStorage.getItem('name'));
        
        this.service.loggedIn = true;
        localStorage.setItem("token", x.accessToken);
        if (x.role == "SUPERUSER") {
          localStorage.setItem('adminLoggedIn', '1')
          

          this.service.adminLoggedIn = true
          this.route.navigateByUrl('/customers');
        }
        else {
          localStorage.setItem('id', x.customerId)
          localStorage.setItem('customerLoggedIn', '1')
          this.service.customerLoggedIn = true
          this.service.customerIdforExchange = x.customerId
          this.route.navigateByUrl("/transactions")
        }
     
    }, err => {
      console.log(err.error.errorMessgae);

    })
  }
}
