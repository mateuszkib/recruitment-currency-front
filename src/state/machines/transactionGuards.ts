export const transactionGuards = {
  termsAreAccepted: ({ context }: any) => context.termsAccepted,

  hasCurrencySelected: ({ context }: any) =>
    context.rate?.currency !== null && context.rate?.currency !== undefined,

  hasValidAmount: ({ context }: any) => {
    const amount = parseFloat(context.amount);

    return (
      context.amount !== "" && !isNaN(amount) && amount > 0 && amount <= 1000
    );
  },
};
