import type { TransactionContext } from "../state/machines/transactionTypes";
import type { ExchangeRate } from "./ExchangeRate";

export interface CurrencyListProps {
  rates: ExchangeRate[];
  error: string;
  onRefresh: () => void;
  onSelect: (rate: ExchangeRate) => void;
  context: TransactionContext;
  styles: Record<string, string>;
}
