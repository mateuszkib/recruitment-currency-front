import type { TransactionContext } from "../state/machines/transactionTypes";

export interface CurrencyHeaderProps {
  context: TransactionContext;
  styles: Record<string, string>;
}
