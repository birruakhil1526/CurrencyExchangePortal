import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  adminLogin:any;
  customerLogin:any;
  loggedIn:any;
  name:any

  constructor(public customerservice:CustomerService,private route:Router){

    
    
    
   }
   
  add(){
    this.customerservice.customerEdit=false
  }
  
  

  logout(){
    Swal.fire({
      icon: 'warning',
      text: 'Do you really want to logout?',
      showConfirmButton: true,
      confirmButtonText: 'Logout',
      confirmButtonColor: 'red',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigateByUrl('/login')
        this.customerservice.loggedIn=false;
        this.customerservice.adminLoggedIn=false;
        this.customerservice.customerLoggedIn=false
        localStorage.setItem('adminLoggedIn','0')
        localStorage.removeItem('loggedIn')
        localStorage.removeItem('name')
        localStorage.setItem('customerLoggedIn','0')
        localStorage.setItem('customerLogin','0')
        localStorage.clear()
      }
    })
  
  }
  

}
