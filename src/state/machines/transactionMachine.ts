import { assign, createMachine, fromPromise } from "xstate";
import type { Rate } from "../../interfaces/Rate";
import { submitPayment } from "../services/submitPayment";

const paymentActor = fromPromise(async ({ input }) => {
  return submitPayment(input);
});

const transactionMachine = createMachine({
  id: "transaction",
  initial: "start",
  context: {
    termsAccepted: false,
    rate: {
      currency: null as string | null,
      from: null as string | null,
      to: null as string | null,
      buy: null as string | null,
      sell: null as string | null,
    } as Rate,
    amount: "",
    direction: "buy" as "buy" | "sell",
    exchangeResult: null as {
      total: number;
      currency: string;
    } | null,
    confirmExchange: false,
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
        START_EXCHANGE: {
          target: "selectCurrency",
        },
      },
    },
    selectCurrency: {
      on: {
        SELECT_CURRENCY: {
          actions: assign({
            rate: ({ event }) => {
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
        },
        CONTINUE_TO_EXCHANGE: { target: "enterAmount" },
      },
    },
    enterAmount: {
      on: {
        CONFIRM_EXCHANGE: {
          actions: assign({
            exchangeResult: ({ event }) => ({
              total: event.result,
              currency: event.resultCurrency,
            }),
          }),
          target: "confirmExchange",
        },
        SET_AMOUNT: {
          actions: assign({
            amount: ({ event }) => event.amount,
          }),
        },
        SET_DIRECTION: {
          actions: assign({
            direction: ({ event }) => event.direction,
          }),
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
          actions: assign({
            transactionId: ({ event }: any) => {
              return event.output.transactionId;
            },
          }),
          target: "paymentSuccess",
        },
        onError: {
          target: "paymentError",
        },
      },
    },
    paymentSuccess: {
      type: "final",
    },
    paymentError: {
      on: {
        RESET: {
          target: "start",
          actions: assign({
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
            confirmExchange: false,
            paymentInfo: null,
            transactionId: null,
          }),
        },
      },
    },
  },
});

export { transactionMachine };
