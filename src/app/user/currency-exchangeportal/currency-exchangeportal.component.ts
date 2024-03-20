import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CustomerService } from 'src/app/service/customer.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-currency-exchangeportal',
  templateUrl: './currency-exchangeportal.component.html',
  styleUrls: ['./currency-exchangeportal.component.css']
})
export class CurrencyExchangeportalComponent implements OnInit {

  exchangeDetails = this.fbr.group({
    customerId: [''],
    orderFromAccountId: ['', [Validators.required]],
    orderToAccountId: ['', [Validators.required]],
    orderToCurrencyType: [''],
    orderFromCurrencyType: [''],
    orderAmount: ['', [Validators.required, Validators.min(1)]],
    balance: [''],
    checkBox:['',[Validators.required,Validators.nullValidator]]

  }, { validators: this.checkAccountandAmount })
  get orderFromAccountId() {
    return this.exchangeDetails.get('orderFromAccountId')
  }
  get orderToAccountId() {
    return this.exchangeDetails.get('orderToAccountId')
  }
  get balance() {
    return this.exchangeDetails.get('balance')
  }
  get orderAmount() {
    return this.exchangeDetails.get('orderAmount')
  }
  get checkBox(){
    return this.exchangeDetails.get('checkBox')
  }
  public getColor(checkBox:any): string{
    return checkBox == '1' ? "green" : "red";
 }
 
  reset() {
    this.exchangeDetails.patchValue({ orderFromAccountId: '', orderToAccountId: '', balance: '', orderAmount: '' })
  }
  toggleCheckboxValue() {
    const currentVal = this.exchangeDetails.get('checkBox')?.value;
    const newValue = currentVal === '0' ? '1' : '0';
    this.exchangeDetails.get('checkBox')?.setValue(newValue);
  }

  checkAccountandAmount(ac: AbstractControl): ValidationErrors | boolean {
    var fromaccount = ac.get('orderFromAccountId')?.value
    var toaccount = ac.get('orderToAccountId')?.value
   
    var orderAmount = ac.get('orderAmount')?.value
    var balance = ac.get('balance')?.value
    if (orderAmount > balance) {
      return { amountcheck: true }
    }
    if (fromaccount == toaccount) {
      return { accountcheck: true }
    }

    return false

  }
  name:any
  userName:any
  constructor(public customerservice: CustomerService, private fbr: FormBuilder, private route: Router) { 
    const customer:any=localStorage.getItem('userName')
    this.name=JSON.parse(customer)
    this.userName=this.name.split("@")
  }
  accounts: any

  fromcurrency: any;
  tocurrency: any;
  id = localStorage.getItem('id')


  getCustomerAccount() {
    this.customerservice.getAccountsforCustomer(this.id).subscribe((x: any) => {
      console.log(x);
      this.accounts = x;
      console.log(this.accounts);
    })
  }
  getbalance() {
    if (this.balance?.value == "") {
      this.exchangeDetails.get('orderFromAccountId')?.valueChanges.pipe(debounceTime(300)).subscribe(() => {
        this.fromcurrency = this.accounts.find((x: any) => this.exchangeDetails.value.orderFromAccountId == x.id)
        console.log(this.fromcurrency.balance);
        this.exchangeDetails.patchValue({ balance: this.fromcurrency.balance })

      })
    }


  }

  ngOnInit(): void {
    this.getCustomerAccount()
    this.getbalance()
    console.log(this.checkBox?.value);
    
  }



  convert() {
    if (this.exchangeDetails.value.orderFromAccountId != '') {
      this.customerservice.getAccountsforCustomer(this.id).subscribe((x: any) => {
        this.fromcurrency = x.find((x: any) => this.exchangeDetails.value.orderFromAccountId == x.id)
        this.tocurrency = x.find((x: any) => this.exchangeDetails.value.orderToAccountId == x.id)
        console.log(this.fromcurrency);
        this.exchangeDetails.patchValue({ orderFromCurrencyType: this.fromcurrency.currencyType, orderToCurrencyType: this.tocurrency.currencyType, customerId: this.customerservice.customerIdforExchange })
        console.log(this.exchangeDetails.value);
        this.customerservice.currencyConversion(this.exchangeDetails.value).subscribe((x) => {
          this.reset()
          Swal.fire({
            icon: 'success',
            text: 'Converted',
            showConfirmButton: true,
            confirmButtonText: 'Success',
            confirmButtonColor: 'green'
          }).then((result) => {
            if (result.isConfirmed) {
              this.route.navigateByUrl('/transactions')
            }
          })

          console.log("converted");
          console.log(x);
        })

      })
    }


  }



}
