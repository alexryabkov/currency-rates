import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { UiService } from 'src/app/services/ui.service';
import { CurrencyInfo } from 'src/app/types/currency-info';
import { FetchedCurrencyData } from 'src/app/types/fetched-currency-data';
import { CURRENCIES, MAIN_CURRENCIES } from 'src/app/currency-data';
import { CurrencyNames } from 'src/app/types/currency-names';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent implements OnInit {
  currencies: CurrencyInfo[] = CURRENCIES;
  mainCurrencies: CurrencyNames[] = MAIN_CURRENCIES;
  showExtraCurrencies: boolean = false;
  subscription: Subscription;

  constructor(
    private currencyService: CurrencyService,
    private uiService: UiService
  ) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showExtraCurrencies = value));
  }

  ngOnInit(): void {
    this.currencyService
      .getCurrencies()
      .subscribe(
        (currData) => (this.currencies = this.processCurrencyData(currData))
      );
  }

  processCurrencyData(currData: FetchedCurrencyData): CurrencyInfo[] {
    const sourceCurrency = currData.source;
    const rates: [string, number][] = Object.entries(currData.quotes);
    const processedData: CurrencyInfo[] = [];

    for (const [curr, exchRate] of rates) {
      const name = curr.replace(sourceCurrency, '') as CurrencyNames;
      processedData.push({
        name,
        exchangeRate: Math.round((1 / exchRate) * 1e2) / 1e2,
        rateChange: 0.0,
      });
    }
    return processedData;
  }
}
