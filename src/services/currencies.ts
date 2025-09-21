import type { ExchangeRate } from "../interfaces/ExchangeRate";

export async function fetchCurrencies(
  signal?: AbortSignal
): Promise<ExchangeRate[]> {
  const response = await fetch("/api/currencies", {
    method: "GET",
    headers: {
      "x-currency-token": "dasdiubasiob1=231231238913y4-n432r2nby83rt29",
      accept: "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error("Wystąpił błąd podczas pobierania walut");
  }

  const exchangeRates: ExchangeRate[] = await response.json();

  // Filter duplicate currency pairs (sometimes API returns duplicates)
  return exchangeRates.filter(
    (rate, index, self) =>
      index === self.findIndex((r) => r.currency === rate.currency)
  );
}
