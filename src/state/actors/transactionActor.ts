import {
  createActor,
  type ActorRefFrom,
  type EventFrom,
  type SnapshotFrom,
} from "xstate";
import { transactionMachine } from "../machines/transactionMachine";

type TransactionActor = ActorRefFrom<typeof transactionMachine>;
type TransactionEvent = EventFrom<typeof transactionMachine>;
type TransactionSnapshot = SnapshotFrom<typeof transactionMachine>;

const g = globalThis as any;
if (!g.__transactionActor) {
  const actor = createActor(transactionMachine);
  actor.start();
  g.__transactionActor = actor;
}

export const transactionActor: TransactionActor = g.__transactionActor;
export const sendTransactionEvent = (event: TransactionEvent) =>
  transactionActor.send(event);
export const getTransactionState = (): TransactionSnapshot =>
  transactionActor.getSnapshot();
