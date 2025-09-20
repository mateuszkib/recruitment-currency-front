import { assign, createMachine } from "xstate";
import type { Rate } from "../../interfaces/Rate";

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
    amount: null as number | null,
    paymentInfo: null as {
      cardNumber: string;
      expiryDate: string;
      cvv: string;
    } | null,
    transactionId: null as number | null,
  },
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
    enterAmount: {
      on: {
        ENTER_AMOUNT: {
          actions: assign({
            amount: (_ctx, event: any) => event.amount,
          }),
        },
      },
    },
  },
});

export { transactionMachine };
