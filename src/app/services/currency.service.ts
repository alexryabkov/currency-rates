import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, timer, retry, share } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { FetchedCurrencyData } from 'src/app/types/fetched-currency-data';
import { ALL_CURRENCIES } from '../currency-data';

const INTERVAL = 5000;

@Injectable({
  providedIn: 'root',
})
export class CurrencyService implements OnDestroy {
  private currencies: Observable<FetchedCurrencyData>;
  private stopPolling = new Subject<void>();

  constructor(private http: HttpClient) {
    this.currencies = timer(0, INTERVAL).pipe(
      switchMap(() =>
        this.http.get<FetchedCurrencyData>('http://localhost:5000/currencies')
      ),
      retry(),
      share(),
      takeUntil(this.stopPolling)
    );
  }

  getCurrencies(): Observable<FetchedCurrencyData> {
    return this.currencies;
  }

  ngOnDestroy() {
    this.stopPolling.next();
  }
}
