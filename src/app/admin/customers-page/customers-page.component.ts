import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginComponent } from 'src/app/login/login.component';
import { Customers } from 'src/app/model/customers';

import { CustomerService } from 'src/app/service/customer.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-customers-page',
  templateUrl: './customers-page.component.html',
  styleUrls: ['./customers-page.component.css']
})

export class CustomersPageComponent implements OnInit {

  customersD!: Customers[];
  customerAccounts: any;
  editcust: any
  loading: boolean = true;
  totalRecords:any
  pageNumber:any=1

  constructor(private customerservice: CustomerService, private route: Router, private ar: ActivatedRoute) { }

  ngOnInit() {
    this.get()
    this.accounts(this.customerservice.customerId)
    //this.deleteCustomer(this.customerservice.customerId)
  }
  addCustomer() {
    this.customerservice.customerEdit = false;
  }

  get() {
    this.customerservice.getCustomers().subscribe((x: any) => {
      this.customersD = x.filter((x: any) => x.rolesENum == "CUSTOMER")
      this.totalRecords=this.customersD.length
      this.loading = false;
    })
  }
  editCustomer(id:any,customer:any) {
    console.log(customer);
    
      localStorage.setItem('customerUpdateObject',JSON.stringify(customer))
  
    this.customerservice.customerEdit = true;
  }

  accounts(value: any) {
    this.customerservice.customerId=value

  }
  deleteCustomer(value: any) {
    Swal.fire({
      title: "Do you want to delete ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Delete",
      showConfirmButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerservice.customerId = value;
        this.customerservice.deleteCustomer(value).subscribe(() => {

          this.route.navigateByUrl("/delete")
          this.get()
          console.log("deleted");
        }
        )
      }
    })


  }


}
