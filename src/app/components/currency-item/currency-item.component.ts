import { Component, Input } from '@angular/core';
import { CurrencyInfo } from 'src/app/types/currency-info';
import { CurrencyNames } from 'src/app/types/currency-names';
@Component({
  selector: 'app-currency-item',
  templateUrl: './currency-item.component.html',
  styleUrls: ['./currency-item.component.scss'],
})
export class CurrencyItemComponent {
  @Input() currency: CurrencyInfo = {
    name: CurrencyNames.NONE,
    exchangeRate: 0,
    rateChange: 0,
  };

  constructor() {}
}
