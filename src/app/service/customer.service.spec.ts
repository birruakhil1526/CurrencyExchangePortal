import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerService } from './customer.service';

import { Customers } from '../model/customers';
import { Constants } from '../model/constants';
import { Accounts } from '../model/accounts';
import { CurrencyConversion } from '../model/currencyconversion';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      
    });
    service = TestBed.inject(CustomerService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('postingCustomerdetails',()=>{
    it('return observable',()=>{
      const mockCustomerData: Customers = {
        customerId: 123,
        firstName: 'Akhil',
        lastName: 'Birru',
        username: 'AkhilBirru',
        rolesENum: 'Customer',
        gender: 'Male',
        email: 'birruakhil123@gmail.com',
        phoneNumber: 9887788878,
        password: 'Bunny@3681'
      };
      const errorMessage = 'Email already exists';
      const mockResponse={}
      service.postingCustomerdetails(mockCustomerData).subscribe((response) => {
        expect(response).toEqual(mockResponse); 
      });
      const url=Constants.customerUrl
      const expectedUrl=url+"create"
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toBe('POST'); 
      expect(req.request.headers.get('Authorization')).toBe('Bearer ' + localStorage.getItem('token'));
  
      req.flush(mockResponse);
    })
    it('should handle HTTP error', () => {
      const mockCustomerData: Customers = { 
        customerId: 123,
        firstName: 'Akhil',
        lastName: 'Birru',
        username: 'AkhilBirru',
        rolesENum: 'Customer',
        gender: 'Male',
        email: 'birruakhil123@gmail.com',
        phoneNumber: 9887788878,
        password: 'Bunny@3681'
       };
      const errorMessage = 'Internal Server Error';
      service.postingCustomerdetails(mockCustomerData).subscribe(
        (response) => {
     
          fail('Expected an error, but got a response.');
        },
        (error) => {
          expect(error.status).toBe(500); 
          expect(error.error).toBe(errorMessage);
        }
      );
      const url = Constants.customerUrl + 'create';
      const expectedUrl = url;
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toBe('POST');
      req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
    });
  })
  describe('deleteCustomer',()=>{
    it('should delete a customer with authorization header', () => {
      const customerIdToDelete = 123; 
      const mockResponse: Customers[] = [];
      service.deleteCustomer(customerIdToDelete).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });
  
      
      const expectedUrl = `${service.customerUrl}delete/${customerIdToDelete}`;
  
     
      const req = httpTestingController.expectOne(expectedUrl);
  
      
      expect(req.request.method).toBe('DELETE');
  
      expect(req.request.headers.get('Authorization')).toBe('Bearer ' + localStorage.getItem('token'));
  
      
      req.flush(mockResponse);
    });
    it('should handle HTTP error', () => {
      const customerIdToDelete = 123; // Replace with the customer ID you want to delete
      const errorMessage = 'Internal Server Error';
  
      // Simulate an HTTP error response
      service.deleteCustomer(customerIdToDelete).subscribe(
        (response) => {
          fail('Expected an error, but got a response.');
        },
        (error) => {
          expect(error.status).toBe(500);
          expect(error.error).toBe(errorMessage);
        }
      );
  
      const expectedUrl = `${service.customerUrl}delete/${customerIdToDelete}`;
      const req = httpTestingController.expectOne(expectedUrl);
  
      expect(req.request.method).toBe('DELETE');
  
      req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
    });
  })
 
 
  describe('getCustomers',()=>{
    it('should retrieve customers with authorization header', (done) => {
      const mockCustomers: Customers[] = [
        { customerId: 123,
          firstName: 'Akhil',
          lastName: 'Birru',
          username: 'AkhilBirru',
          rolesENum: 'Customer',
          gender: 'Male',
          email: 'birruakhil123@gmail.com',
          phoneNumber: 9887788878,
          password: 'Bunny@3681' }
      ];
  
      service.getCustomers().subscribe((customers) => {
        expect(customers).toEqual(mockCustomers);
        done(); 
      });
      const url=Constants.customerUrl
      const expectedUrl=url+"fetchAll"
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET'); 
      expect(req.request.headers.get('Authorization')).toBe('Bearer ' + localStorage.getItem('token'));
      expect(req.request.headers.get('Authorization')).toBe('Bearer ' + localStorage.getItem('token'));
  
      req.flush(mockCustomers);
      });
      it('should handle HTTP error', () => {
        const errorMessage = 'Internal Server Error';
    
        // Simulate an HTTP error response
        service.getCustomers().subscribe(
          (response) => {
            fail('Expected an error, but got a response.');
          },
          (error) => {
            expect(error.status).toBe(500);
            expect(error.error).toBe(errorMessage);
          }
        );
    
        const expectedUrl = `${Constants.customerUrl}fetchAll`;
        const req = httpTestingController.expectOne(expectedUrl);
    
        expect(req.request.method).toBe('GET');
    
        req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
      });
  })

 describe('savingAccountsToCustomer',()=>{
  it('should save accounts to a customer with authorization header', () => {
    const customerId = 123; // Replace with the customer ID
    const mockAccountData: Accounts = {
      accountNumber: 12,
      currencyType: 'USD',
      balance: 1200,
      accHolderName: 'Akhil',
      accCreatedAt: '23-03-2022'
    };
    const mockResponse: Accounts[] = []; 
    service.savingAccountsToCustomer(mockAccountData, customerId).subscribe((response) => {
      expect(response).toEqual(mockResponse); 
    });   
    const expectedUrl = `${service.accountsUrl}create/${customerId}`;    
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer ' + localStorage.getItem('token'));

    req.flush(mockResponse);
  });
  it('should handle HTTP error', () => {
    const customerId = 123; // Replace with the customer ID
    const mockAccountData: Accounts = {
      accountNumber: 12,
      currencyType: 'USD',
      balance: 1200,
      accHolderName: 'Akhil',
      accCreatedAt: '23-03-2022',
    };
    const errorMessage = 'Internal Server Error';

    // Simulate an HTTP error response
    service.savingAccountsToCustomer(mockAccountData, customerId).subscribe(
      (response) => {
        fail('Expected an error, but got a response.');
      },
      (error) => {
        expect(error.status).toBe(500);
        expect(error.error).toBe(errorMessage);
      }
    );

    const expectedUrl = `${service.accountsUrl}create/${customerId}`;
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toBe('POST');

    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
 })
    describe('getAccounts',()=>{
      it('should retrieve accounts with authorization header', () => {
        const mockAccountData=123
        const mockResponse: Accounts = {
          accountNumber: 12,
          currencyType: 'USD',
          balance: 1200,
          accHolderName: 'Akhil',
          accCreatedAt: '23-03-2022'
        }
        service.getAccounts(mockAccountData).subscribe((response) => {
          expect(response).toEqual(mockResponse); 
        });    
        const expectedUrl = `${service.accountsUrl}fetchAll/${mockAccountData}`;
        const req = httpTestingController.expectOne(expectedUrl);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.get('Authorization')).toBe('Bearer ' + localStorage.getItem('token'));
        req.flush(mockResponse);
      });
      it('should handle HTTP error', () => {
        const customerId = 123; // Replace with the customer ID
        const mockAccountData = 123; // Replace with the expected account data
        const errorMessage = 'Internal Server Error';
    
        // Simulate an HTTP error response
        service.getAccounts(mockAccountData).subscribe(
          (response) => {
            fail('Expected an error, but got a response.');
          },
          (error) => {
            expect(error.status).toBe(500);
            expect(error.error).toBe(errorMessage);
          }
        );
    
        const expectedUrl = `${service.accountsUrl}fetchAll/${mockAccountData}`;
        const req = httpTestingController.expectOne(expectedUrl);
    
        expect(req.request.method).toBe('GET');
    
        req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
      });
  
    })
    describe('getAccountsforCustomer',()=>{
      it('should retrieve accounts with authorization header', () => {
        const mockAccountData=123
        const mockResponse: Accounts = {
          accountNumber: 12,
          currencyType: 'USD',
          balance: 1200,
          accHolderName: 'Akhil',
          accCreatedAt: '23-03-2022'
        }
        service.getAccountsforCustomer(mockAccountData).subscribe((response) => {
          expect(response).toEqual(mockResponse); 
        });    
        const expectedUrl = `${service.accountsUrl}getAll/${mockAccountData}`;
        const req = httpTestingController.expectOne(expectedUrl);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.get('Authorization')).toBe('Bearer ' + localStorage.getItem('token'));
        req.flush(mockResponse);
      });
      it('should handle HTTP error', () => {
        const customerId = 123; // Replace with the customer ID
        const mockAccountData = customerId; // Replace with the expected account data
        const errorMessage = 'Internal Server Error';
    
        // Simulate an HTTP error response
        service.getAccountsforCustomer(mockAccountData).subscribe(
          (response) => {
            fail('Expected an error, but got a response.');
          },
          (error) => {
            expect(error.status).toBe(500);
            expect(error.error).toBe(errorMessage);
          }
        );
    
        const expectedUrl = `${service.accountsUrl}getAll/${mockAccountData}`;
        const req = httpTestingController.expectOne(expectedUrl);
    
        expect(req.request.method).toBe('GET');
    
        req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
      });
    })
   
    describe('deleteAccount',()=>{
      it('should delete an account with authorization header', () => {
        const accountIdToDelete = 12; 
        const customerId = 123; 
        const mockResponse: Accounts[] = [];
    
        
        service.deleteAccount(accountIdToDelete, customerId).subscribe((response) => {
          expect(response).toEqual(mockResponse); 
        });
    
        const expectedUrl = `${service.accountsUrl}delete/${accountIdToDelete}/${customerId}`;
  
        const req = httpTestingController.expectOne(expectedUrl);
  
        expect(req.request.method).toBe('DELETE');
  
        expect(req.request.headers.get('Authorization')).toBe('Bearer ' + localStorage.getItem('token'));
  
        req.flush(mockResponse);
      })
      it('should handle HTTP error', () => {
        const accountIdToDelete = 12; // Replace with the account ID to delete
        const customerId = 123; // Replace with the customer ID
        const errorMessage = 'Internal Server Error';
    
        // Simulate an HTTP error response
        service.deleteAccount(accountIdToDelete, customerId).subscribe(
          (response) => {
            fail('Expected an error, but got a response.');
          },
          (error) => {
            expect(error.status).toBe(500);
            expect(error.error).toBe(errorMessage);
          }
        );
    
        const expectedUrl = `${service.accountsUrl}delete/${accountIdToDelete}/${customerId}`;
        const req = httpTestingController.expectOne(expectedUrl);
    
        expect(req.request.method).toBe('DELETE');
    
        req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
      });
    })
    describe('editCustomer',()=>{
      it('should edit a customer with authorization header', () => {
        const customerId = 123; 
        const mockCustomerData: Customers = {
          customerId: 123,
          firstName: 'Abhi',
          lastName: 'Birru',
          username: 'AkhilBirru',
          rolesENum: 'Customer',
          gender: 'Male',
          email: 'birruakhil123@gmail.com',
          phoneNumber: 9887788878,
          password: 'Bunny@3681'
        };
        const mockResponse: Customers = { ...mockCustomerData };
        service.editCustomer(mockCustomerData, customerId).subscribe((response) => {
          expect(response).toEqual(mockResponse); 
        });
        const expectedUrl = `${service.customerUrl}update/${customerId}`;
        const req = httpTestingController.expectOne(expectedUrl);
        expect(req.request.method).toBe('PUT');
        expect(req.request.headers.get('Authorization')).toBe('Bearer ' + localStorage.getItem('token'));
        req.flush(mockResponse);
      });
      it('should handle HTTP error', () => {
        const customerId = 123; // Replace with the customer ID
        const mockCustomerData: Customers = {
          customerId: 123,
          firstName: 'UpdatedFirstName',
          lastName: 'UpdatedLastName',
          username: 'UpdatedUsername',
          rolesENum: 'Customer',
          gender: 'Male',
          email: 'updatedemail@example.com',
          phoneNumber: 1234567890,
          password: 'UpdatedPassword'
        };
        const errorMessage = 'Internal Server Error';
    
        // Simulate an HTTP error response
        service.editCustomer(mockCustomerData, customerId).subscribe(
          (response) => {
            fail('Expected an error, but got a response.');
          },
          (error) => {
            expect(error.status).toBe(500);
            expect(error.error).toBe(errorMessage);
          }
        );
    
        const expectedUrl = `${service.customerUrl}update/${customerId}`;
        const req = httpTestingController.expectOne(expectedUrl);
    
        expect(req.request.method).toBe('PUT');
    
        req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
      });
    })
    describe('editAccount',()=>{
      it('should edit an account with authorization header', () => {
        const customerId = '123'; // Replace with the customer ID
        const accountId = '456'; // Replace with the account ID to edit
        const mockAccountData: Accounts = {
          accountNumber: 12,
          currencyType: 'INR',
          balance: 1200,
          accHolderName: 'Akhil',
          accCreatedAt: '23-03-2022'
        };
  
        const mockResponse: Accounts = {...mockAccountData}; 
        service.editAccount(mockAccountData, customerId, accountId).subscribe((response) => {
          expect(response).toEqual(mockResponse);
        });
        const expectedUrl = `${service.accountsUrl}update/${customerId}/${accountId}`;
        const req = httpTestingController.expectOne(expectedUrl);
        expect(req.request.method).toBe('PUT');
        expect(req.request.headers.get('Authorization')).toBe('Bearer ' + localStorage.getItem('token'));
        req.flush(mockResponse);
      });
      it('should handle HTTP error', () => {
        const customerId = 'customer123'; // Replace with the customer ID
        const accountId = 'account456'; // Replace with the account ID to edit
        const mockAccountData: Accounts = {
          accountNumber: 12,
          currencyType: 'UpdatedCurrency',
          balance: 1500, // Updated balance
          accHolderName: 'UpdatedName',
          accCreatedAt: '23-03-2022'
        };
        const errorMessage = 'Internal Server Error';
    
        // Simulate an HTTP error response
        service.editAccount(mockAccountData, customerId, accountId).subscribe(
          (response) => {
            fail('Expected an error, but got a response.');
          },
          (error) => {
            expect(error.status).toBe(500);
            expect(error.error).toBe(errorMessage);
          }
        );
    
        const expectedUrl = `${service.accountsUrl}update/${customerId}/${accountId}`;
        const req = httpTestingController.expectOne(expectedUrl);
    
        expect(req.request.method).toBe('PUT');
    
        req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
      });
    })
   
    describe('login',()=>{
      it('should perform a login with the provided data', () => {
        const mockLoginData = {
          username: 'testuser',
          password: 'testpassword',
        };
        const mockResponse = { 
          accessToken:"sdcn.adwfwewsdncbsnbcnbncnnnsdbdss",
          refreshToken:'sdcn.adwfwewsdncbsnbcnbncnnnsdbdss',
          role:'CUSTOMER',
          customerId:123
         };
  
        service.login(mockLoginData).subscribe((response) => {
          expect(response).toEqual(mockResponse); 
        });
    
        const expectedUrl = service.LoginUrl;
        const req = httpTestingController.expectOne(expectedUrl);
        expect(req.request.method).toBe('POST'); 
        req.flush(mockResponse);
      });
      it('should handle HTTP error', () => {
        const mockLoginData = {
          username: 'testuser',
          password: 'testpassword',
        };
        const errorMessage = 'Unauthorized';
    
        // Simulate an HTTP error response
        service.login(mockLoginData).subscribe(
          (response) => {
            fail('Expected an error, but got a response.');
          },
          (error) => {
            expect(error.status).toBe(401);
            expect(error.error).toBe(errorMessage);
          }
        );
    
        const expectedUrl = service.LoginUrl;
        const req = httpTestingController.expectOne(expectedUrl);
    
        expect(req.request.method).toBe('POST');
    
        req.flush(errorMessage, { status: 401, statusText: 'Unauthorized' });
      });
    })
    describe('currencyConversion',()=>{
      it('should perform a currency conversion with authorization header', () => {
        const mockConversionData: CurrencyConversion = {
          customerId:123,
          orderFromAccountId:'12233',
          orderToAccountId:'12444',
          orderToCurrencyType:'USD',
          orderFromCurrencyType:'INR',
          orderAmount:123,
          balance:12345
        };
        const mockResponse: CurrencyConversion = {  };
    
        service.currencyConversion(mockConversionData).subscribe((response) => {
          expect(response).toEqual(mockResponse); 
        });
    
        const expectedUrl = `${service.ordersUrl}placeorder`;
   
        const req = httpTestingController.expectOne(expectedUrl);
   
        expect(req.request.method).toBe('POST');
    
        expect(req.request.headers.get('Authorization')).toBe('Bearer ' + localStorage.getItem('token'));
    
       
        req.flush(mockResponse);
      });
      
    })
    
    describe('',()=>{
      it('should retrieve watchlist orders with authorization header', () => {
        const mockResponse = {
          customerId:123,
          orderFromAccountId:'12233',
          orderToAccountId:'12444',
          orderToCurrencyType:'USD',
          orderFromCurrencyType:'INR',
          orderAmount:123,
          balance:12345
         };
        service.orderWatchlist().subscribe((response) => {
          expect(response).toEqual(mockResponse); 
        });
    
        const expectedUrl = `${service.ordersUrl}watchlist`;
    
        const req = httpTestingController.expectOne(expectedUrl);
  
        expect(req.request.method).toBe('GET');
  
        expect(req.request.headers.get('Authorization')).toBe('Bearer ' + localStorage.getItem('token'));
    
        req.flush(mockResponse);
      });
    })
    


    it('should be created', () => {
  expect(service).toBeTruthy();
    });
})
