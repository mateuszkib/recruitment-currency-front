export function getValueFromSessionLocalStorage<T extends unknown>(
  key: string
): T | undefined {
  const session = JSON.parse(localStorage.getItem("session") || "{}");

  return session[key] || undefined;
}
