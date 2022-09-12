import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { of, throwError } from 'rxjs';

import { CurrenciesComponent } from './currencies.component';
import { UiService } from 'src/app/services/ui.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { ALL_CURRENCIES, MAIN_CURRENCIES } from 'src/app/currency-data';
import { CurrencyInfo } from 'src/app/types/currency-info';
import { CurrencyNames } from 'src/app/types/currency-names';
import { FetchedCurrencyData } from 'src/app/types/fetched-currency-data';
@Component({
  selector: 'app-currency-item',
  template: `
    <div class="item">
      <div class="name">{{ currency.name }}</div>
      <div class="exchangeRate">{{ currency.exchangeRate }}</div>
      <div class="rateChange">{{ currency.rateChange }}</div>
    </div>
  `,
})
class CurrencyItemStubComponent {
  @Input() currency: CurrencyInfo = {
    name: CurrencyNames.NONE,
    exchangeRate: 0,
    rateChange: 0,
  };
}

function extractData(item: HTMLElement, finalData: CurrencyInfo[]) {
  const currName = item.querySelector('.name')?.textContent as CurrencyNames;
  const exchangeRate = item.querySelector('.exchangeRate')?.textContent;
  const rateChange = item.querySelector('.rateChange')?.textContent;
  const finalCurrData = finalData.filter((data) => data.name === currName)[0];

  return { currName, exchangeRate, rateChange, finalCurrData };
}

describe('CurrenciesComponent', () => {
  let component: CurrenciesComponent;
  let fixture: ComponentFixture<CurrenciesComponent>;
  const timestamp = Date.now();
  const rate = 0.02;
  const change = 0;
  const fetchedData: FetchedCurrencyData = {
    success: true,
    timestamp,
    date: new Date(timestamp).toISOString().split('T')[0],
    base: 'RUB',
    rates: { USD: rate, EUR: rate, GBP: rate, CNY: rate, JPY: rate, TRY: rate },
  };
  let finalData = ALL_CURRENCIES.map((name) => ({
    name,
    exchangeRate: 1 / rate,
    rateChange: change,
  }));

  // We have to replace "beforeEach" with custom "setUp" function to be able to
  // provide different return values via MockCurrencyService
  async function setUp(returnErrorStatusCode = 0) {
    const MockCurrencyService = jasmine.createSpyObj('CurrencyService', [
      'getCurrencies',
    ]);
    if (returnErrorStatusCode !== 0) {
      MockCurrencyService.getCurrencies.and.returnValue(
        throwError(() => ({ status: returnErrorStatusCode }))
      );
    } else {
      MockCurrencyService.getCurrencies.and.returnValue(of(fetchedData));
    }
    await TestBed.configureTestingModule({
      declarations: [CurrenciesComponent, CurrencyItemStubComponent],
      providers: [
        UiService,
        { provide: CurrencyService, useValue: MockCurrencyService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', async () => {
    await setUp();
    expect(component).toBeTruthy();
  });

  it('should get data after component initialized', async () => {
    await setUp();
    expect(component.currencies).toEqual(finalData);
  });

  it('should display all currencies if showExtraCurrencies=true', async () => {
    await setUp();
    component.showExtraCurrencies = true;
    fixture.detectChanges();
    const currencyItems = fixture.nativeElement.querySelectorAll('.item');

    expect(currencyItems.length).toEqual(ALL_CURRENCIES.length);
    for (let item of currencyItems) {
      const { currName, exchangeRate, rateChange, finalCurrData } = extractData(
        item,
        finalData
      );

      expect(ALL_CURRENCIES).toContain(currName);
      expect(exchangeRate).toEqual(finalCurrData.exchangeRate.toString());
      expect(rateChange).toEqual(finalCurrData.rateChange.toString());
    }
  });

  it('should display only "main" currencies if showExtraCurrencies=false', async () => {
    await setUp();
    component.showExtraCurrencies = false;
    fixture.detectChanges();
    const currencyItems = fixture.nativeElement.querySelectorAll('.item');
    const extraCurrencies = ALL_CURRENCIES.filter(
      (curr) => !MAIN_CURRENCIES.includes(curr)
    );

    expect(currencyItems.length).toEqual(MAIN_CURRENCIES.length);
    for (let item of currencyItems) {
      const { currName, exchangeRate, rateChange, finalCurrData } = extractData(
        item,
        finalData
      );

      expect(extraCurrencies).not.toContain(currName);
      expect(exchangeRate).toEqual(finalCurrData.exchangeRate.toString());
      expect(rateChange).toEqual(finalCurrData.rateChange.toString());
    }
  });

  it('should log error if fetched data contains unexpected currency', async () => {
    await setUp();
    const wrongCurr = 'NOK';
    spyOn(console, 'error').and.callFake((...args) =>
      expect(args[0]).toContain(
        `Currency ${wrongCurr} is not in the list of allowed currencies`
      )
    );
    let currentData: CurrencyInfo[] = [];
    const dataWithError = {
      ...fetchedData,
      rates: { USD: rate, [wrongCurr]: rate },
    };
    component.processCurrencyData(dataWithError, currentData);
    expect(console.error).toHaveBeenCalled();
  });

  it('should calculate new data based on the previous one if applicable', async () => {
    await setUp();
    let currentData: CurrencyInfo[] = [
      { name: CurrencyNames.USD, exchangeRate: 40, rateChange: 0 },
    ];
    const newData = { ...fetchedData, rates: { USD: 0.02 } };
    const calculatedData = component.processCurrencyData(newData, currentData);
    expect(calculatedData).toEqual([
      { name: CurrencyNames.USD, exchangeRate: 50, rateChange: 10 },
    ]);
  });

  describe('#makeSubscriptions', () => {
    it('should set correct #errorText in case of rate limit exceeded (status=429)', async () => {
      await setUp(429);
      fixture.detectChanges();
      expect(component.errorText).toEqual(
        'Request rate limit exceeded! Please contact development team'
      );
    });
    it('should set correct #errorText in case of data fetching error', async () => {
      await setUp(500);
      fixture.detectChanges();
      expect(component.errorText).toEqual(
        'Cannot get the data from the remote server! Please refresh the page'
      );
    });
  });
});
