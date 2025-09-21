import { apiRequest } from "../../helpers/apiRequest";
import type { TransactionContext } from "../machines/transactionTypes";

type PaymentContext = Pick<TransactionContext, "amount" | "direction" | "rate">;

export async function submitPayment(
  context: PaymentContext
): Promise<{ transactionId: number }> {
  try {
    const payRes = await apiRequest("/api/pay", {
      method: "POST",
      body: JSON.stringify({
        amount: context.amount,
      }),
    });

    if (!payRes.ok) {
      const errorText = await payRes.text();

      throw new Error(`Błąd płatności: ${payRes.status} ${errorText}`);
    }

    const payData = await payRes.json();

    try {
      const transactionRes = await apiRequest("/api/transaction", {
        method: "POST",
        body: JSON.stringify({
          type: context.direction,
          currency: context.rate.currency,
          amount: context.amount,
          transactionId: payData.transactionId,
        }),
      });

      const responseText = await transactionRes.text();

      if (!transactionRes.ok) {
        throw new Error(
          `Błąd transakcji: ${transactionRes.status} ${responseText}`
        );
      }
    } catch (error) {
      throw error;
    }

    return { transactionId: payData.transactionId };
  } catch (error) {
    throw error;
  }
}
