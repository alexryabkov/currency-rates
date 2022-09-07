export interface FetchedCurrencyData {
  success: boolean;
  timestamp: number;
  date: string;
  base: string;
  result: {
    [key: string]: number;
  };
}
