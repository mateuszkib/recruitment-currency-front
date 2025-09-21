import { apiRequest } from "../helpers/apiRequest";
import type { ExchangeRate } from "../interfaces/ExchangeRate";

export async function fetchCurrencies(
  signal?: AbortSignal
): Promise<ExchangeRate[]> {
  const response = await apiRequest("/api/currencies", {
    method: "GET",
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
