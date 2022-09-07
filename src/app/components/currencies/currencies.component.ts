import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { UiService } from 'src/app/services/ui.service';
import { CurrencyInfo } from 'src/app/types/currency-info';
import { FetchedCurrencyData } from 'src/app/types/fetched-currency-data';
import { MAIN_CURRENCIES } from 'src/app/currency-data';
import { CurrencyNames } from 'src/app/types/currency-names';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent implements OnDestroy {
  currencies: CurrencyInfo[] = [];
  mainCurrencies: CurrencyNames[] = MAIN_CURRENCIES;
  showExtraCurrencies: Observable<boolean>;
  currSubscription: Subscription;

  constructor(
    private currencyService: CurrencyService,
    private uiService: UiService
  ) {
    this.showExtraCurrencies = this.uiService.onToggle();
    this.currSubscription = this.currencyService
      .getCurrencies()
      .subscribe(
        (currData) => (this.currencies = this.processCurrencyData(currData))
      );
  }

  processCurrencyData(currData: FetchedCurrencyData): CurrencyInfo[] {
    const sourceCurrency = currData.source;
    const rates: [string, number][] = Object.entries(currData.quotes);
    const processedData: CurrencyInfo[] = [];

    console.log(this.currencies);

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

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.currSubscription.unsubscribe();
  }
}
