import { Component, OnInit } from '@angular/core';
import { CURRENCIES } from 'src/app/currencies';
import { Currency } from 'src/app/Currency';
@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent implements OnInit {
  currencies: Currency[] = CURRENCIES;

  constructor() {}

  ngOnInit(): void {}
}
