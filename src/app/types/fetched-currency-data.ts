export interface FetchedCurrencyData {
  success: boolean;
  timestamp: number;
  date: string;
  base: string;
  rates: {
    [key: string]: number;
  };
}
