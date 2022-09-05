import { Injectable } from '@angular/core';
import { CURRENCIES } from 'src/app/currencies';
import { Currency } from 'src/app/Currency';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  currencies: Currency[] = CURRENCIES;

  constructor() {}

  getCurrencies(): Currency[] {
    return this.currencies;
  }

  removeCurrency(currency: Currency): void {
    this.currencies = this.currencies.map((curr) => {
      if (curr.name === currency.name) {
        curr.visible = false;
      }
      return curr;
    });
  }
}
