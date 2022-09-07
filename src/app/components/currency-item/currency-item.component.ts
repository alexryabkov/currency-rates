import { Component, OnInit, Input } from '@angular/core';
import { CurrencyInfo } from 'src/app/types/currency-info';
import { CurrencyNames } from 'src/app/types/currency-names';
@Component({
  selector: 'app-currency-item',
  templateUrl: './currency-item.component.html',
  styleUrls: ['./currency-item.component.scss'],
})
export class CurrencyItemComponent implements OnInit {
  @Input() currency: CurrencyInfo = {
    name: CurrencyNames.NONE,
    exchangeRate: 0.0,
    rateChange: 0.0,
  };

  constructor() {}

  ngOnInit(): void {}
}
