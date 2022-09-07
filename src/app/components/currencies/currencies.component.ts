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
  showExtraCurrencies: boolean = false;
  subscriptions: Subscription = new Subscription();

  constructor(
    private currencyService: CurrencyService,
    private uiService: UiService
  ) {
    this.subscriptions.add(
      this.currencyService
        .getCurrencies()
        .subscribe(
          (currData) => (this.currencies = this.processCurrencyData(currData))
        )
    );

    this.subscriptions.add(
      this.uiService
        .onToggle()
        .subscribe((value) => (this.showExtraCurrencies = value))
    );
  }

  processCurrencyData(currData: FetchedCurrencyData): CurrencyInfo[] {
    const rates: [string, number][] = Object.entries(currData.result);
    const processedData: CurrencyInfo[] = [];

    for (const [curr, exchRate] of rates) {
      const name = curr as CurrencyNames;
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
    this.subscriptions.unsubscribe();
  }
}
