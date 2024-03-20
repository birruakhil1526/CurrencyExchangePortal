import { inject } from '@angular/core';
import { CanActivateFn, NavigationEnd, Router } from '@angular/router';
import { CustomerService } from '../service/customer.service';

export const customerAuthGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const service=inject(CustomerService)
  if(service.loggedIn){
    return true
  }
  router.navigateByUrl('/login')
  return false
};
