export const getApiHeaders = (includeContentType = false) => {
  const headers: Record<string, string> = {
    "x-currency-token": import.meta.env.VITE_CURRENCY_API_TOKEN,
    accept: "application/json",
  };

  if (includeContentType) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};
