import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Customers } from 'src/app/model/customers';
import { CustomerService } from 'src/app/service/customer.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  details!: any
  allcustomers!: any[]
  customerDetails!:FormGroup;
  updateCustomer:any
  get gender() {
    return this.customerDetails.get('gender')
  }
  get username() {
    return this.customerDetails.get('username')
  }
  get email() {
    return this.customerDetails.get('email')
  }
  get phoneNumber() {
    return this.customerDetails.get('phoneNumber')
  }
  get password() {
    return this.customerDetails.get('password')
  }
  get firstName() {
    return this.customerDetails.get('firstName')
  }
  get lastName() {
    return this.customerDetails.get('lastName')
  }
  get rolesENum() {
    return this.customerDetails.get('rolesENum')
  }
  constructor(private fbr: FormBuilder, public customerService: CustomerService, private route: Router, private ar: ActivatedRoute) {
    
 
    this.customerDetails = this.fbr.group({
      customerId: [''],
      firstName: ['', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]{0,}")]],
      lastName: ['', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]{0,}")]],
      username: ['', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]{0,}")]],
      rolesENum: ['CUSTOMER', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z]+\\.[a-z]{2,3}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    })
  }
  editCustomer(){
    
    this.route.navigateByUrl("/customers")
    this.customerService.customerEdit=false
  }


  submit() {
    this.ar.paramMap.subscribe(param => {
      var id = param.get('id');
      console.log(id);
      if (id == null) {
        
        this.customerService.postingCustomerdetails(this.customerDetails.value).pipe(catchError(err=>{
          if (err.status === 404) {
            Swal.fire({
              icon: 'error',
              text: err.error.errorMessgae,
              showConfirmButton: true,
              confirmButtonColor: 'red'
            })
          }
          return throwError(err)
        })).subscribe(() => {
          
          console.log("added");
          this.route.navigateByUrl("/customers")
        }
          ,err=>{
          console.log(err.error.errorMessgae);
          
        })
        //console.log(this.customerDetails.value);
      }
      else {
        this.customerService.editCustomer(this.customerDetails.value, id).pipe(catchError(err=>{
          if (err.status === 404) {
            Swal.fire({
              icon: 'error',
              text: err.error.errorMessgae,
              showConfirmButton: true,
              confirmButtonColor: 'red'
            })
          }
          return throwError(err)
        })).subscribe(() => {

          console.log("edited");
          this.route.navigateByUrl('/customers')
        },err=>{
          throw err
        }
        )
      }
    })


  }
  

  ngOnInit(): void {
    this.ar.paramMap.subscribe(param=>{
      var id = param.get('id');
      if(id!== null){
        this.details=localStorage.getItem('customerUpdateObject')
        this.updateCustomer=JSON.parse(this.details)
        this.customerDetails.patchValue({customerId: this.updateCustomer.customerId, rolesENum: this.updateCustomer.rolesENum, lastName: this.updateCustomer.lastName, firstName: this.updateCustomer.firstName, username: this.updateCustomer.username, email: this.updateCustomer.email, password: this.updateCustomer.password, phoneNumber: this.updateCustomer.phoneNumber, gender: this.updateCustomer.gender})    
      }
    })
   
    
    
  }

}
