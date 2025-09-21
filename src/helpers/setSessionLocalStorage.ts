export function setSessionStorage<T extends object>(data: T) {
  const session = JSON.parse(sessionStorage.getItem("session") || "{}");

  sessionStorage.setItem("session", JSON.stringify({ ...session, ...data }));
}
