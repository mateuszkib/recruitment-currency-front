export async function submitPayment(
  context: any
): Promise<{ transactionId: number }> {
  try {
    const headers = {
      "x-currency-token": "dasdiubasiob1=231231238913y4-n432r2nby83rt29",
      accept: "application/json",
      "Content-Type": "application/json",
    };

    const payRes = await fetch("/api/pay", {
      method: "POST",
      headers,
      body: JSON.stringify({ amount: context.exchangeResult.total }),
    });

    if (!payRes.ok) {
      const errorText = await payRes.text();

      throw new Error(`Błąd płatności: ${payRes.status} ${errorText}`);
    }

    const payData = await payRes.json();

    try {
      const transactionRes = await fetch("/api/transaction", {
        method: "POST",
        headers,
        body: JSON.stringify({
          type: context.direction,
          currency: context.rate.currency,
          amount: context.exchangeResult.total,
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
