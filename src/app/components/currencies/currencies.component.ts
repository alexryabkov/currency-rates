import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { UiService } from 'src/app/services/ui.service';
import { CurrencyInfo } from 'src/app/types/currency-info';
import { FetchedCurrencyData } from 'src/app/types/fetched-currency-data';
import { ALL_CURRENCIES, MAIN_CURRENCIES } from 'src/app/currency-data';
import { CurrencyNames } from 'src/app/types/currency-names';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent implements OnDestroy {
  currencies: CurrencyInfo[] = [];
  allCurrencies: CurrencyNames[] = ALL_CURRENCIES;
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
          (data) =>
            (this.currencies = this.processCurrencyData(data, this.currencies))
        )
    );

    this.subscriptions.add(
      this.uiService
        .onToggle()
        .subscribe((value) => (this.showExtraCurrencies = value))
    );
  }

  processCurrencyData(
    fetchedData: FetchedCurrencyData,
    currentData: CurrencyInfo[]
  ): CurrencyInfo[] {
    console.log('- Fetched Data:', fetchedData);
    console.log('- Current Data:', currentData);

    const rates: [string, number][] = Object.entries(fetchedData.result);
    const processedData: CurrencyInfo[] = [];

    for (const [curr, newRate] of rates) {
      const name = curr as CurrencyNames;

      if (!this.allCurrencies.includes(name)) {
        console.error(
          `- Data Fetching Error: Currency ${name} in not in the list ` +
            `of allowed currencies (${this.allCurrencies.join(', ')})`
        );
        continue;
      }

      const exchangeRate = Math.round((1 / newRate) * 1e2) / 1e2;

      let rateChange = 0;
      if (currentData.length > 0) {
        const currency = currentData.filter((curr) => curr.name === name)[0];
        rateChange = exchangeRate - currency.exchangeRate;
      }

      processedData.push({ name, exchangeRate, rateChange });
    }
    return processedData;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
