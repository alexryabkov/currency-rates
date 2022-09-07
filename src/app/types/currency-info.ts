import { CurrencyNames } from './currency-names';

export interface CurrencyInfo {
  name: CurrencyNames;
  exchangeRate: number;
  rateChange: number;
}
