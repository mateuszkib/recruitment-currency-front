import type { ExchangeRate } from "../../interfaces/ExchangeRate";

export type TransactionEvent =
  | { type: "ACCEPT_TERMS" }
  | { type: "START_EXCHANGE" }
  | { type: "SELECT_CURRENCY"; rate: ExchangeRate }
  | { type: "SET_AMOUNT"; amount: string }
  | { type: "SET_DIRECTION"; direction: "buy" | "sell" }
  | { type: "CONFIRM_EXCHANGE"; result: number; resultCurrency: string }
  | { type: "FINAL_CONFIRM" }
  | { type: "SUBMIT_PAYMENT"; amount?: number }
  | { type: "RETRY_PAYMENT" }
  | { type: "CANCEL" }
  | { type: "RESET" }
  | { type: "CONTINUE_TO_EXCHANGE" }
  | {
      type: "RESTORE_STATE";
      rate?: ExchangeRate;
      amount?: string;
      direction?: "buy" | "sell";
      exchangeResult?: { total: number; currency: string };
      transactionId?: number;
      termsAccepted?: boolean;
    }
  | {
      type: "SYNC_EXCHANGE_DATA";
      rate?: ExchangeRate;
      amount?: string;
      direction?: "buy" | "sell";
    }
  | {
      type: "SYNC_CURRENCY";
      rate?: ExchangeRate;
    }
  | {
      type: "SYNC_START";
      termsAccepted?: boolean;
    };

export interface TransactionContext {
  termsAccepted: boolean;
  rate: ExchangeRate;
  amount: string;
  direction: "buy" | "sell";
  exchangeResult: {
    total: number;
    currency: string;
  } | null;
  transactionId: number | null;
  errors: string[];
}
