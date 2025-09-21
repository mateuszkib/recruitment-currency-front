import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { transactionActor } from "./state/actors/transactionActor.ts";

window.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(sessionStorage.getItem("session") || "{}");

  if (savedData.rate || savedData.amount || savedData.exchangeResult) {
    transactionActor.send({
      type: "RESTORE_STATE",
      rate: savedData.rate,
      amount: savedData.amount || "",
      direction: savedData.direction || "buy",
      exchangeResult: savedData.exchangeResult,
      resultCurrency: savedData.resultCurrency,
    });
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
