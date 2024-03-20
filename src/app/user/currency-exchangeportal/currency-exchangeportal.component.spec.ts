import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyExchangeportalComponent } from './currency-exchangeportal.component';

describe('CurrencyExchangeportalComponent', () => {
  let component: CurrencyExchangeportalComponent;
  let fixture: ComponentFixture<CurrencyExchangeportalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyExchangeportalComponent]
    });
    fixture = TestBed.createComponent(CurrencyExchangeportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
