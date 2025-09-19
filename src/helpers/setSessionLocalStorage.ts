const setSessionLocalStorage = <T extends object>(data: T) => {
  const session = JSON.parse(localStorage.getItem("session") || "{}");

  localStorage.setItem("session", JSON.stringify({ ...session, ...data }));
};

export { setSessionLocalStorage };