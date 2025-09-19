import { Component } from "react";
import type { ActorRef, EventObject, Snapshot, Subscription } from "xstate";

export class XStateConnectedComponent<P, S> extends Component<P, S> {
  private subscription?: Subscription;

  subscribeToActor<
    TSnapshot extends Snapshot<unknown>,
    TEvent extends EventObject = EventObject,
    TEmitted extends EventObject = EventObject
  >(
    actor: ActorRef<TSnapshot, TEvent, TEmitted>,
    onChange: (state: TSnapshot) => void
  ) {
    this.subscription = actor.subscribe(onChange);
  }

  componentWillUnmount() {
    this.subscription?.unsubscribe();
  }
}
