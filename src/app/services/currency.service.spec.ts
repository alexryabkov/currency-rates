import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpParams } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CurrencyService } from './currency.service';
import { environment } from 'src/environments/environment';
import { BASE_CURRENCY, ALL_CURRENCIES } from 'src/app/currency-data';
import { FetchedCurrencyData } from 'src/app/types/fetched-currency-data';

describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('CurrencyService#requestCurrencyData', () => {
  let service: CurrencyService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CurrencyService);
    backend = TestBed.inject(HttpTestingController);
  });

  afterEach(() => backend.verify());

  it('should send proper GET request', () => {
    service.requestCurrencyData().subscribe();

    const testRequest = backend.expectOne(
      (req: HttpRequest<any>) => req.url === environment.apiUrl
    );
    expect(testRequest.request.method).toBe('GET');
    expect(testRequest.request.params.get('base')).toBe(BASE_CURRENCY);
    expect(testRequest.request.params.get('symbols')).toBe(
      ALL_CURRENCIES.join(',')
    );
    testRequest.flush({});
  });

  it('should get proper data', () => {
    const timestamp = Date.now();
    const params = new HttpParams()
      .set('base', BASE_CURRENCY)
      .set('symbols', ALL_CURRENCIES.join(','));
    const url = `${environment.apiUrl}?${params.toString()}`;
    const rates = ALL_CURRENCIES.reduce(
      (obj, key) => Object.assign(obj, { [key]: 10 }),
      {}
    );
    const response: FetchedCurrencyData = {
      success: true,
      timestamp,
      date: new Date(timestamp).toISOString().split('T')[0],
      base: BASE_CURRENCY,
      rates,
    };

    service.requestCurrencyData().subscribe((next) => {
      expect(next).toEqual(response);
    });

    backend.match({ url, method: 'GET' })[0].flush(response);
  });
});
