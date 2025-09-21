import type { CurrencyIcon } from "./CurrencyIcon";
import type { ExchangeRate } from "./ExchangeRate";

export interface CurrencyCardProps {
  rate: ExchangeRate;
  isSelected: boolean;
  onSelect: (rate: ExchangeRate) => void;
  styles: Record<string, string>;
  currencyIcons: CurrencyIcon[];
}
