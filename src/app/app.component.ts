import { Component } from '@angular/core';
import { CustomerService } from './service/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn:any;
  constructor(public service:CustomerService,public router:Router){
    this.loggedIn=localStorage.getItem('LoggedIn')
  }
  title = 'metrobank-currecyXC';
}
