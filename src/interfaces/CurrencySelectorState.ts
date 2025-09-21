import type { ExchangeRate } from "./ExchangeRate";

export interface CurrencySelectorState {
  rates: ExchangeRate[];
  error: string;
}
