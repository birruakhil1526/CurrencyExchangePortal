import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2'
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {
  accounts!: any;
  accountObject: any
  accountJsonObject: any

  customerAccounts = this.fbr.group({
    accountNumber: [''],
    currencyType: ['', [Validators.required]],
    balance: ['', [Validators.required, Validators.min(1)]]
  })
  get balance() {
    return this.customerAccounts.get('balance')
  }
  constructor(private fbr: FormBuilder, public customerService: CustomerService, private ar: ActivatedRoute, private router: Router) {


  }
  ngOnInit() {
    this.ar.paramMap.subscribe(param => {
      var id = param.get('id');
      if (id !== null) {
        this.accountJsonObject = localStorage.getItem('customerAccountObject')
        this.accountObject = JSON.parse(this.accountJsonObject)
        this.customerAccounts.patchValue({ accountNumber: this.accountObject.accountNumber, balance: this.accountObject.balance, currencyType: this.accountObject.currencyType })
      }
    }
    )
  }
  
  back() {
    this.customerService.accountEdit = false;
    this.router.navigateByUrl("/accounts")
  }
  submit() {

    this.ar.paramMap.subscribe(param => {
      var id = param.get('id');
      this.customerAccounts.value.accountNumber = id;
      console.log(id);

      if (id == null) {
        this.customerService.savingAccountsToCustomer(this.customerAccounts.value, this.customerService.customerId).pipe(catchError((error) => {
          if (error.status == 409) {
            Swal.fire({
              icon: 'error',
              text: error.error.errorMessgae,
              showConfirmButton: true,
              confirmButtonColor: 'red'
            })
          }
          return throwError(error)
        })).subscribe((x: any) => {
          console.log("added");
          this.router.navigateByUrl("/accounts")
        })

      }
      else {
        this.customerService.edit = true;
        this.customerService.editAccount(this.customerAccounts.value, this.customerService.customerId, id).subscribe(() => {
          console.log("edited account");
          this.customerService.accountEdit = false
          this.router.navigateByUrl("/accounts")
        })

      }
    })

  }

}
