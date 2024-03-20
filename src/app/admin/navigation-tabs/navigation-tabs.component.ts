import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-navigation-tabs',
  templateUrl: './navigation-tabs.component.html',
  styleUrls: ['./navigation-tabs.component.css']
})
export class NavigationTabsComponent {
  constructor(private customerservice:CustomerService,private route :Router){}
  addCustomer(){
    this.customerservice.customerEdit=false;
    this.route.navigateByUrl("/add-customer")
  }

}
