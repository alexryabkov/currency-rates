import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpParams } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, tick } from '@angular/core/testing';

import { CurrencyService } from './currency.service';
import { environment } from 'src/environments/environment';
import { BASE_CURRENCY, ALL_CURRENCIES } from 'src/app/currency-data';
import { FetchedCurrencyData } from 'src/app/types/fetched-currency-data';
import { Subscription, of, throwError } from 'rxjs';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let subscription: Subscription;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(CurrencyService);
    backend = TestBed.inject(HttpTestingController);
  });
  afterEach(() => backend.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#requestCurrencyData', () => {
    it('should send proper GET request', () => {
      subscription = service.requestCurrencyData().subscribe();

      const testRequest = backend.expectOne(
        (req: HttpRequest<any>) => req.url === environment.apiUrl
      );
      expect(testRequest.request.method).toBe('GET');
      expect(testRequest.request.params.get('base')).toBe(BASE_CURRENCY);
      expect(testRequest.request.params.get('symbols')).toBe(
        ALL_CURRENCIES.join(',')
      );
      testRequest.flush({});
      subscription.unsubscribe();
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

      subscription = service.requestCurrencyData().subscribe((data) => {
        expect(data).toEqual(response);
      });

      backend.match({ url, method: 'GET' })[0].flush(response);
      subscription.unsubscribe();
    });
  });
  describe('#startPolling', () => {
    it('should return an Observable of type FetchedCurrencyData', fakeAsync(() => {
      const timestamp = Date.now();
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

      spyOn(service, 'requestCurrencyData').and.returnValue(of(response));
      subscription = service
        .startPolling()
        .subscribe((data) => expect(data).toEqual(response));

      subscription.unsubscribe();
    }));

    it('should propagate an error in case of return data failure', fakeAsync(() => {
      let result: string = '';
      const errorMsg = 'Testing error';

      spyOn(service, 'requestCurrencyData').and.returnValue(
        throwError(() => new Error(errorMsg))
      );

      subscription = service
        .startPolling()
        .subscribe({ error: (e) => (result = e.toString()) });

      tick(5000);
      expect(result).toContain(errorMsg);
      subscription.unsubscribe();
    }));
  });
});
