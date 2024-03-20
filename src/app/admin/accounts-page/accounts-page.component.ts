import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Accounts } from 'src/app/model/accounts';
import { CustomerService } from 'src/app/service/customer.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-accounts-page',
  templateUrl: './accounts-page.component.html',
  styleUrls: ['./accounts-page.component.css']
})
export class AccountsPageComponent implements OnInit {
  
  customerAccounts!: Accounts[];
  loading:boolean=true;
  constructor(public customerservice: CustomerService, private route: Router, private ar: ActivatedRoute) { }
  getAccounts() {
    console.log(this.customerservice.customerId);
    
    if (this.customerservice.customerId != undefined) {
      this.customerservice.getAccounts(this.customerservice.customerId).subscribe((x:any) => {
        if(x==null){
          this.customerservice.datanotfoundforAccounts=true
        }
        this.loading=false;
        this.customerAccounts = x
        console.log(x);

      })
    }
  }
  accountedit(){
    this.customerservice.accountEdit=false
  }
  editAccount(data:any){
    localStorage.setItem('customerAccountObject',JSON.stringify(data))
    this.customerservice.accountEdit=true
  }

  deleteAccount(value: any) {
    Swal.fire({
      title: "Do you want to delete ?",
      icon: "warning",
      showConfirmButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Delete",
      showCancelButton:true,
    }).then((result) => {
      if (result.isConfirmed) {
        let id = this.customerservice.customerId;
        this.customerservice.deleteAccount(id, value).subscribe(x => {
          console.log("deleted bank account")
          this.getAccounts()
        })
      }
    })

  }
  ngOnInit(): void {

    this.getAccounts()
  }
}
