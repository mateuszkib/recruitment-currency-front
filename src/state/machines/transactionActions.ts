import { assign } from "xstate";

export const transactionActions = {
  toggleTerms: assign({
    termsAccepted: ({ context }) => !context.termsAccepted,
  }),

  setRate: assign({
    rate: ({ event }) => {
      if (event.type !== "SELECT_CURRENCY") return null;
      const [from, to] = event.rate.currency?.split("/") || [];
      return {
        currency: event.rate.currency,
        from,
        to,
        buy: event.rate.buy,
        sell: event.rate.sell,
      };
    },
  }),

  setAmount: assign({
    amount: ({ event }) => (event.type === "SET_AMOUNT" ? event.amount : ""),
  }),

  setDirection: assign({
    direction: ({ event }) =>
      event.type === "SET_DIRECTION" ? event.direction : "buy",
  }),

  setExchangeResult: assign({
    exchangeResult: ({ event }) => {
      if (event.type !== "CONFIRM_EXCHANGE") return null;
      return {
        total: event.result,
        currency: event.resultCurrency,
      };
    },
  }),

  setTransactionId: assign({
    transactionId: ({ event }: any) => event.output.transactionId,
  }),

  validateAmount: assign({
    errors: ({ context }) => {
      const errors = [];
      const amount = parseFloat(context.amount);

      if (!context.amount || context.amount.trim() === "") {
        errors.push("Kwota jest wymagana");
      } else if (isNaN(amount) || amount <= 0) {
        errors.push("Kwota musi być większa od 0");
      } else if (amount > 10000) {
        errors.push("Maksymalna kwota to 10,000");
      }

      return errors;
    },
  }),

  resetContext: assign({
    termsAccepted: false,
    rate: {
      currency: null,
      from: null,
      to: null,
      buy: null,
      sell: null,
    },
    amount: "",
    direction: "buy",
    exchangeResult: null,
    transactionId: null,
    errors: [],
  }),

  restoreState: assign({
    rate: ({ event }) =>
      event.type === "RESTORE_STATE"
        ? event.rate || {
            currency: null,
            from: null,
            to: null,
            buy: null,
            sell: null,
          }
        : null,
    amount: ({ event }) =>
      event.type === "RESTORE_STATE" ? event.amount || "" : "",
    direction: ({ event }) =>
      event.type === "RESTORE_STATE" ? event.direction || "buy" : "buy",
    exchangeResult: ({ event }) =>
      event.type === "RESTORE_STATE" ? event.exchangeResult || null : null,
    transactionId: ({ event }) =>
      event.type === "RESTORE_STATE" ? event.transactionId || null : null,
    termsAccepted: ({ event }) =>
      event.type === "RESTORE_STATE" ? event.termsAccepted || false : false,
    errors: [],
  }),

  syncExchangeData: assign({
    rate: ({ event }) =>
      event.type === "SYNC_EXCHANGE_DATA" ? event.rate || null : null,
    amount: ({ event }) =>
      event.type === "SYNC_EXCHANGE_DATA" ? event.amount || "" : "",
    direction: ({ event }) =>
      event.type === "SYNC_EXCHANGE_DATA" ? event.direction || "buy" : "buy",
  }),

  syncCurrency: assign({
    rate: ({ event }) =>
      event.type === "SYNC_CURRENCY" ? event.rate || null : null,
  }),

  syncStart: assign({
    termsAccepted: ({ event }) =>
      event.type === "SYNC_START" ? event.termsAccepted || false : false,
  }),
};
