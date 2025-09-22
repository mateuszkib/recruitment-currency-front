import { transactionActor } from "../state/actors/transactionActor";

export default function restoreState() {
  try {
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
  } catch (error) {
    console.error("Błąd przywracania stanu:", error);
    sessionStorage.removeItem("session");
  }
}
