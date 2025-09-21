import { getApiHeaders } from "./getApiHeaders";

export const apiRequest = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const defaultHeaders = getApiHeaders(
    options.method === "POST" || options.method === "PUT"
  );

  return fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
};
