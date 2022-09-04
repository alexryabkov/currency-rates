import { Component, OnInit, Input, Output } from '@angular/core';
import { Currency } from 'src/app/Currency';

@Component({
  selector: 'app-currency-item',
  templateUrl: './currency-item.component.html',
  styleUrls: ['./currency-item.component.scss'],
})
export class CurrencyItemComponent implements OnInit {
  @Input() currency: Currency = { name: '', visible: false };

  constructor() {}

  ngOnInit(): void {}
}
