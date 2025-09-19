import { createActor } from "xstate";
import { transactionMachine } from "../machines/transactionMachine";

export const transactionActor = createActor(transactionMachine);
transactionActor.start();

export const sendTransactionEvent = (event: any) => {
  transactionActor.send(event);
};

export const getTransactionState = () => transactionActor.getSnapshot();
