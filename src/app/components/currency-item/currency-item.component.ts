import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Currency } from 'src/app/Currency';

@Component({
  selector: 'app-currency-item',
  templateUrl: './currency-item.component.html',
  styleUrls: ['./currency-item.component.scss'],
})
export class CurrencyItemComponent implements OnInit {
  @Input() currency: Currency = { name: '', visible: false };
  @Output() onRemoveCurrency: EventEmitter<Currency> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onRemove(currency: Currency): void {
    this.onRemoveCurrency.emit(currency);
  }
}
