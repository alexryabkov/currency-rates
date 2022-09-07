import { CurrencyInfo } from './types/currency-info';
import { CurrencyNames } from './types/currency-names';

export const MAIN_CURRENCIES = [
  CurrencyNames.USD,
  CurrencyNames.EUR,
  CurrencyNames.GBP,
];

export const CURRENCIES: CurrencyInfo[] = [
  {
    name: CurrencyNames.USD,
    exchangeRate: 0,
    rateChange: 0,
  },
  {
    name: CurrencyNames.EUR,
    exchangeRate: 0,
    rateChange: 0,
  },
  {
    name: CurrencyNames.GBP,
    exchangeRate: 0,
    rateChange: 0,
  },
  {
    name: CurrencyNames.CNY,
    exchangeRate: 0,
    rateChange: 0,
  },
  {
    name: CurrencyNames.JPY,
    exchangeRate: 0,
    rateChange: 0,
  },
  {
    name: CurrencyNames.TRY,
    exchangeRate: 0,
    rateChange: 0,
  },
];
