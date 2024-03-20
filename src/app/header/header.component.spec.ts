import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { CustomerService } from '../service/customer.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockCustomerService: Partial<CustomerService>;
  let mockRouter: Partial<Router>;
  const setLocalStorage = (id:any, data:any) => {  window.localStorage.setItem(id, JSON.stringify(data));};
  beforeEach(() => {
    mockCustomerService = {
      loggedIn: true,
      adminLoggedIn: true,
      customerLoggedIn: true,
    };

    mockRouter = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: CustomerService, useValue: mockCustomerService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });
  test("data is added into local storage", () => {  
    const mockId = "111"; 
   const mockJson = { data: "json data" }; 
   setLocalStorage(mockId, mockJson); 
   expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));  });

  describe("Set local storage item", () => { 
     beforeEach(() => { 
         window.localStorage.clear(); 
         });
 

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should logout the user and navigate to login page', () => {
   
    component.logout();

    expect(mockCustomerService.loggedIn).toBe(false);
    expect(mockCustomerService.adminLoggedIn).toBe(false);
    expect(mockCustomerService.customerLoggedIn).toBe(false);
    expect(localStorage.getItem('adminLoggedIn')).toBe('0');
    expect(localStorage.getItem('loggedIn')).toBeNull();
    expect(localStorage.getItem('customerLoggedIn')).toBe('0');
    expect(localStorage.getItem('customerLogin')).toBe('0');
    expect(localStorage.length).toBe(0);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should properly clear localStorage when not logged in', () => {
 
    component.logout();

   
    expect(localStorage.getItem('adminLoggedIn')).toBeNull();
    expect(localStorage.getItem('loggedIn')).toBeNull();
    expect(localStorage.getItem('customerLoggedIn')).toBeNull();
    expect(localStorage.getItem('customerLogin')).toBeNull();
    expect(localStorage.length).toBe(0);
  });
});
describe("localStorage Methods", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("setItem and getItem", () => {
    const key = "myKey";
    const value = "myValue";

  
    window.localStorage.setItem(key, value);

 
    const retrievedValue = window.localStorage.getItem(key);

    expect(retrievedValue).toEqual(value);
  });

  test("removeItem", () => {
    const key = "myKey";
    const value = "myValue";

   
    window.localStorage.setItem(key, value);

 
    window.localStorage.removeItem(key);

 
    const retrievedValue = window.localStorage.getItem(key);

    expect(retrievedValue).toBeNull();
  });

  test("clear", () => {
    const key1 = "key1";
    const key2 = "key2";

    
    window.localStorage.setItem(key1, "value1");
    window.localStorage.setItem(key2, "value2");

    
    window.localStorage.clear();

    
    const retrievedValue1 = window.localStorage.getItem(key1);
    const retrievedValue2 = window.localStorage.getItem(key2);

    expect(retrievedValue1).toBeNull();
    expect(retrievedValue2).toBeNull();
  });
});
 
})
