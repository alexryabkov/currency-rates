import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

@Component({ selector: 'app-header', template: '' })
class HeaderStubComponent {}
@Component({ selector: 'app-date-time', template: '' })
class DateTimeStubComponent {}
@Component({ selector: 'app-currencies', template: '' })
class CurrenciesStubComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderStubComponent,
        DateTimeStubComponent,
        CurrenciesStubComponent,
      ],
    }).compileComponents();
  });

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [AppComponent] });
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'currency-rates'`, () => {
    expect(app.title).toEqual('currency-rates');
  });
});
