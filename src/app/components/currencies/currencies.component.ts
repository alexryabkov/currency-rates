import { Component, OnDestroy } from '@angular/core';
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
  storageKey = 'currencyData';
  storedData: string | null = localStorage.getItem(this.storageKey);
  currencies: CurrencyInfo[] = this.storedData
    ? JSON.parse(this.storedData)
    : [];
  allCurrencies: CurrencyNames[] = ALL_CURRENCIES;
  mainCurrencies: CurrencyNames[] = MAIN_CURRENCIES;
  showExtraCurrencies = false;
  subscriptions = new Subscription();
  errorText = '';

  constructor(
    private currencyService: CurrencyService,
    private uiService: UiService
  ) {
    this.makeSubscriptions();
  }

  private makeSubscriptions() {
    this.subscriptions.add(
      this.currencyService.getCurrencies().subscribe({
        next: (data) => {
          {
            this.errorText = '';
            this.currencies = this.processCurrencyData(data, this.currencies);
            localStorage.setItem(
              this.storageKey,
              JSON.stringify(this.currencies)
            );
          }
        },
        error: (error) => {
          this.errorText =
            error.status === 429
              ? 'Request rate limit exceeded! Please contact development team'
              : 'Cannot get the data from the remote server! Please refresh the page';
        },
      })
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

    const rates: [string, number][] = Object.entries(fetchedData.rates);
    const processedData: CurrencyInfo[] = [];

    for (const [curr, newRate] of rates) {
      const name = curr as CurrencyNames;

      if (!this.allCurrencies.includes(name)) {
        console.error(
          `- Data Fetching Error: Currency ${name} is not in the list ` +
            `of allowed currencies (${this.allCurrencies.join(', ')})`
        );
        continue;
      }

      const exchangeRate = Math.round((1 / newRate) * 1e2) / 1e2;

      let rateChange = 0;
      if (currentData.length > 0) {
        const currency: CurrencyInfo = currentData.filter(
          (curr) => curr.name === name
        )[0];
        rateChange =
          Math.round((exchangeRate - currency.exchangeRate) * 1e2) / 1e2;
      }

      processedData.push({ name, exchangeRate, rateChange });
    }

    console.log('- New Data:', processedData);
    return processedData;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
