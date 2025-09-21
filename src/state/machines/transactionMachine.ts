import { createMachine, fromPromise } from "xstate";
import { submitPayment } from "../services/submitPayment";
import { transactionActions } from "./transactionActions";
import { transactionGuards } from "./transactionGuards";
import type { TransactionContext } from "./transactionTypes";

const paymentActor = fromPromise(
  async ({ input }: { input: TransactionContext }) => {
    return submitPayment(input);
  }
);

const transactionMachine = createMachine({
  id: "transaction",
  initial: "start",
  context: {
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
    exchangeResult: {
      total: 0,
      currency: "",
    },
    transactionId: null,
    errors: [],
  } as TransactionContext,
  on: {
    RESTORE_STATE: {
      actions: "restoreState",
    },
    SYNC_EXCHANGE_DATA: {
      target: ".enterAmount",
      actions: "syncExchangeData",
    },
    SYNC_CURRENCY: {
      target: ".selectCurrency",
      actions: "syncCurrency",
    },
    SYNC_START: {
      target: ".start",
      actions: "syncStart",
    },
    RESET: {
      target: ".start",
      actions: "resetContext",
    },
    SET_AMOUNT: {
      actions: ["setAmount", "validateAmount"],
    },
    SET_DIRECTION: {
      actions: "setDirection",
    },
  },
  states: {
    start: {
      on: {
        ACCEPT_TERMS: {
          actions: "toggleTerms",
        },
        START_EXCHANGE: {
          target: "selectCurrency",
          guard: "termsAreAccepted",
        },
      },
    },
    selectCurrency: {
      on: {
        SELECT_CURRENCY: {
          actions: "setRate",
        },
        CONTINUE_TO_EXCHANGE: {
          target: "enterAmount",
          guard: "hasCurrencySelected",
        },
      },
    },
    enterAmount: {
      on: {
        CONFIRM_EXCHANGE: {
          actions: "setExchangeResult",
          target: "confirmExchange",
          guard: "hasValidAmount",
        },
      },
    },
    confirmExchange: {
      on: {
        FINAL_CONFIRM: {
          target: "payment",
        },
        CANCEL: {
          target: "enterAmount",
        },
      },
    },
    payment: {
      on: {
        SUBMIT_PAYMENT: {
          target: "processingPayment",
        },
      },
    },
    processingPayment: {
      invoke: {
        src: paymentActor,
        input: ({ context }) => context,
        onDone: {
          actions: "setTransactionId",
          target: "paymentSuccess",
        },
        onError: {
          target: "paymentError",
        },
      },
    },
    paymentSuccess: {},
    paymentError: {
      on: {
        RETRY_PAYMENT: {
          target: "payment",
        },
        CANCEL: {
          target: "enterAmount",
        },
      },
    },
  },
}).provide({
  actions: transactionActions as any,
  guards: transactionGuards as any,
});

export { transactionMachine };
