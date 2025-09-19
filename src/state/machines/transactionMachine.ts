import { assign, createMachine } from "xstate";

const transactionMachine = createMachine({
  id: "transaction",
  initial: "start",
  context: {
    termsAccepted: false,
    fromCurrency: null as string | null,
    toCurrency: null as string | null,
    amount: null as number | null,
    paymentInfo: null as {
      cardNumber: string;
      expiryDate: string;
      cvv: string;
    } | null,
    transactionId: null as number | null,
  },
  states: {
    start: {
      on: {
        ACCEPT_TERMS: {
          actions: assign({
            termsAccepted: ({ context }) => !context.termsAccepted,
          }),
        },
      },
    },
    selectCurrency: {
      on: {
        SELECT_CURRENCY: {
          actions: assign({
            fromCurrency: (_ctx, event: any) => event.fromCurrency,
            toCurrency: (_ctx, event: any) => event.toCurrency,
          }),
          target: "enterAmount",
        },
      },
    },
    enterAmount: {
      on: {
        ENTER_AMOUNT: {
          actions: assign({
            amount: (_ctx, event: any) => event.amount,
          }),
          target: "enterPaymentInfo",
        },
      },
    },
    enterPaymentInfo: {
      on: {
        ENTER_PAYMENT_INFO: {
          actions: assign({
            paymentInfo: (_ctx, event: any) => event.paymentInfo,
          }),
          target: "confirmTransaction",
        },
      },
    },
    confirmTransaction: {
      on: {
        CONFIRM_TRANSACTION: {
          actions: assign({
            transactionId: (_ctx, event: any) => event.transactionId,
          }),
          target: "transactionComplete",
        },
      },
    },
    transactionComplete: {
      type: "final",
    },
  },
});

export { transactionMachine };
