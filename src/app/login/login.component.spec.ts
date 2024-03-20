import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';
import { CustomerService } from '../service/customer.service';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import Swal from 'sweetalert2';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let yourService: CustomerService;
  const setItemSpy = jest.fn();
  const getItemSpy = jest.fn();
  beforeEach(async () => {
      window.localStorage.clear()
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [ CustomerService,
        // Provide custom spy functions for localStorage
        { provide: Window, useValue: window },
        {
          provide: 'LOCAL_STORAGE',
          useValue: {
            getItem: getItemSpy,
            setItem: setItemSpy,
          },
        },],
    }).compileComponents();
  });
  

  beforeEach(() => {
    const setLocalStorage = (id:any, data:any) => {  window.localStorage.setItem(id, JSON.stringify(data));};
    // test("data is added into local storage", () => { 
    //      const mockId = "111";
    //     const mockJson = { data: "json data" };  
    //       setLocalStorage(mockId, mockJson);  
    //   expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
    //   });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    yourService = TestBed.inject(CustomerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should handle login error when status is not 403', () => {
    const mockFormData = {
      email: 'test@example.com',
      password: 'password',
    };
  
    const mockError = {
      status: 500, 
      error: {
        errorMessgae: 'Internal Server Error',
      },
      statusText: 'Internal Server Error',
    };
   
  
    const loginSpy = jest
      .spyOn(yourService, 'login')
      .mockReturnValue(throwError(mockError));
      getItemSpy.mockReturnValue('mockvalue');
      setItemSpy.mockReturnValue(undefined);
      const routeNavigateByUrlSpy = jest
      .spyOn(component.route, 'navigateByUrl');
  
    const consoleErrorSpy = jest.spyOn(console, 'error');
  
    component.loginDetails.setValue(mockFormData);
  
    component.submit();
  
    expect(loginSpy).toHaveBeenCalledWith(mockFormData);
   // expect(routeNavigateByUrlSpy).toHaveBeenCalledWith('/transactions'); 
    expect(consoleErrorSpy).toHaveBeenCalledWith('An error occurred:', 'Internal Server Error');
  });
  it('should handle successful login for a non-SUPERUSER role', () => {
    const mockFormData = {
      email: 'test@example.com',
      password: 'password',
    };
  
    const mockResponse = {
      accessToken: 'mockAccessToken',
      role: 'CUSTOMER', 
      customerId: 'mockCustomerId',
    };
  
    const loginSpy = jest
      .spyOn(yourService, 'login')
      .mockReturnValue(of(mockResponse));
      getItemSpy.mockReturnValue('mockvalue');
      setItemSpy.mockReturnValue(undefined);
  
    const localStorageSetItemSpy = jest
      .spyOn(window.localStorage, 'setItem');
  
    const routeNavigateByUrlSpy = jest
      .spyOn(component.route, 'navigateByUrl');
  
    component.loginDetails.setValue(mockFormData);
  
    component.submit();
  
    expect(loginSpy).toHaveBeenCalledWith(mockFormData);
    // expect(localStorageSetItemSpy).toHaveBeenCalledWith('loggedIn', '1');
    expect(localStorageSetItemSpy).toHaveBeenCalledWith(
      'token',
      'mockAccessToken'
    );
  
    expect(yourService.loggedIn).toBeTruthy();
    expect(localStorageSetItemSpy).toHaveBeenCalledWith('id', 'mockCustomerId');
    expect(localStorageSetItemSpy).toHaveBeenCalledWith('customerLoggedIn', '1');
    expect(localStorageSetItemSpy).not.toHaveBeenCalledWith('adminLoggedIn', '1');
    expect(yourService.customerLoggedIn).toBeTruthy();
    expect(yourService.adminLoggedIn).toBeFalsy(); 
    expect(routeNavigateByUrlSpy).toHaveBeenCalledWith('/transactions'); 
  });

  it('should handle successful login', () => {
    
    const mockFormData = {
      email: 'test@example.com',
      password: 'password',
    };

    const mockResponse = {
      accessToken: 'mockAccessToken',
      role: 'SUPERUSER',
      customerId: 'mockCustomerId',
      
    };

    const loginSpy = jest
      .spyOn(yourService, 'login')
      .mockReturnValue(of(mockResponse));
      getItemSpy.mockReturnValue('mockvalue');
      setItemSpy.mockReturnValue(undefined);

    const localStorageSetItemSpy = jest
      .spyOn(window.localStorage, 'setItem');

    
    const routeNavigateByUrlSpy = jest
      .spyOn(component.route, 'navigateByUrl');

   
    component.loginDetails.setValue(mockFormData);

    
    component.submit();

    
    expect(loginSpy).toHaveBeenCalledWith(mockFormData);
    expect(localStorageSetItemSpy).toHaveBeenCalledWith('loggedIn', '1');
    expect(localStorageSetItemSpy).toHaveBeenCalledWith(
      'token',
      'mockAccessToken'
    );

    expect(yourService.loggedIn).toBeTruthy();
    expect(localStorageSetItemSpy).toHaveBeenCalledWith('id', '123');
    expect(localStorageSetItemSpy).toHaveBeenCalledWith('adminLoggedIn', '1');
    expect(localStorageSetItemSpy).toHaveBeenCalledWith('customerLoggedIn', '1');
    expect(yourService.customerLoggedIn).toBeTruthy();
    expect(yourService.adminLoggedIn).toBeTruthy();
    expect(routeNavigateByUrlSpy).toHaveBeenCalledWith('/customers');
    expect(routeNavigateByUrlSpy).toHaveBeenCalledWith('/transactions');
    
  });
  it('should handle successful login for SUPERUSER role with Swal error', async () => {
    const mockFormData = {
      email: 'test@example.com',
      password: 'password',
    };
  
    const mockResponse = {
      accessToken: 'mockAccessToken',
      role: 'SUPERUSER',
      customerId: 'mockCustomerId',
      error: {
        errorMessgae: 'Access Denied', 
      },
    };
    
    const loginSpy = jest
      .spyOn(yourService, 'login')
      .mockReturnValue(of(mockResponse));
  
    const localStorageSetItemSpy = jest
      .spyOn(window.localStorage, 'setItem');
  
    const routeNavigateByUrlSpy = jest
      .spyOn(component.route, 'navigateByUrl');
  
    const swalFireSpy = jest.spyOn(Swal, 'fire').mockImplementation((options:any) => {
      return Promise.reject(new Error(options.text || 'Swal Error'));
    });
  
    component.loginDetails.setValue(mockFormData);
  
    component.submit();
  
    expect(loginSpy).toHaveBeenCalledWith(mockFormData);
    expect(localStorageSetItemSpy).toHaveBeenCalledWith('loggedIn', 'mockvalue');
    expect(localStorageSetItemSpy).toHaveBeenCalledWith(
      'token',
      'mockAccessToken'
    );
  
    expect(yourService.loggedIn).toBeTruthy();
    expect(localStorageSetItemSpy).toHaveBeenCalledWith('id', 'mockCustomerId');
    expect(localStorageSetItemSpy).toHaveBeenCalledWith('adminLoggedIn', 'mockvalue');
    expect(localStorageSetItemSpy).toHaveBeenCalledWith('customerLoggedIn', 'mockvalue');
    expect(yourService.customerLoggedIn).toBeTruthy();
    expect(yourService.adminLoggedIn).toBeTruthy();
    expect(routeNavigateByUrlSpy).toHaveBeenCalledWith('/customers');
    
    await expect(swalFireSpy).toHaveBeenCalledWith({
      icon: 'error',
      text: 'Access Denied', 
      showConfirmButton: true,
      confirmButtonColor: 'red',
    });
  });

  it('should handle login error', () => {
   
    const mockFormData = {
      email: 'test@example.com',
      password: 'password',
    };

    const mockError = {
      status: 403,
      error: {
        errorMessgae: 'Access Denied',
      },
      statusText: 'Forbidden',
    };

    const loginSpy = jest
      .spyOn(yourService, 'login')
      .mockReturnValue(throwError(mockError));

   
    const consoleErrorSpy = jest.spyOn(console, 'error');

  
    component.loginDetails.setValue(mockFormData);

   
    component.submit();

   
    expect(loginSpy).toHaveBeenCalledWith(mockFormData);
    expect(consoleErrorSpy).toHaveBeenCalledWith('An error occurred:', 'Internal Server Error');
   
  });
});
