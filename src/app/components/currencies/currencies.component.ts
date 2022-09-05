import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { Currency } from 'src/app/Currency';
@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent implements OnInit {
  currencies: Currency[] = [];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencies = this.currencyService.getCurrencies();
  }

  removeCurrency(currency: Currency): void {
    console.log(`Remove currency ${currency.name}`);
    this.currencyService.removeCurrency(currency);
  }
}
