export interface FetchedCurrencyData {
  success: boolean;
  timestamp: number;
  source: string;
  quotes: {
    [key: string]: number;
  };
}
