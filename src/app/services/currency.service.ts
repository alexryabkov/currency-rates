import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, timer, retry, share } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { FetchedCurrencyData } from 'src/app/types/fetched-currency-data';
import { ALL_CURRENCIES, BASE_CURRENCY } from '../currency-data';
import { environment } from 'src/environments/environment';

const INTERVAL = 5000;
const httpOptions = {
  params: new HttpParams()
    .set('base', BASE_CURRENCY)
    .set('currencies', ALL_CURRENCIES.join(',')),
  headers: new HttpHeaders({
    'X-RapidAPI-Key': environment.apiKey,
    'X-RapidAPI-Host': environment.apiHost,
  }),
};
@Injectable({
  providedIn: 'root',
})
export class CurrencyService implements OnDestroy {
  private currencies: Observable<FetchedCurrencyData>;
  private stopPolling = new Subject<void>();
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.currencies = timer(0, INTERVAL).pipe(
      switchMap(this.requestCurrencyData),
      retry(),
      share(),
      takeUntil(this.stopPolling)
    );
  }

  requestCurrencyData(): Observable<FetchedCurrencyData> {
    return this.http.get<FetchedCurrencyData>(this.apiUrl, httpOptions);
  }

  getCurrencies(): Observable<FetchedCurrencyData> {
    return this.currencies;
  }

  ngOnDestroy() {
    this.stopPolling.next();
  }
}
