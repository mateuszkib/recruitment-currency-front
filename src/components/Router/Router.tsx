import { Component } from "react";
import {
  Actor,
  createActor,
  type AnyActorRef,
  type AnyEventObject,
  type MachineContext,
  type MachineSnapshot,
  type MetaObject,
  type NonReducibleUnknown,
  type StateValue,
} from "xstate";
import { routerMachine } from "../../state/machines/routerMachine";
import { pathToState } from "../../helpers/pathToState";
import { routes } from "./constants/routes";
import { Box, Typography } from "@mui/material";
import { NotFound } from "../NotFound";

interface RouterState {
  currentState: MachineSnapshot<
    MachineContext,
    AnyEventObject,
    Record<string, AnyActorRef>,
    StateValue,
    string,
    NonReducibleUnknown,
    MetaObject,
    any
  > | null;
}

class Router extends Component<{}, RouterState> {
  private actor: Actor<typeof routerMachine>;

  constructor(props: {}) {
    super(props);

    this.actor = createActor(routerMachine);
    this.state = {
      currentState: null,
    };
  }

  componentDidMount() {
    this.actor.subscribe((state) => {
      this.setState({ currentState: state });
    });
    this.actor.start();
    this.setState({ currentState: this.actor.getSnapshot() });

    window.addEventListener("navigate", this.handlePopState as EventListener);
    window.addEventListener("popstate", this.handlePopState as EventListener);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "navigate",
      this.handlePopState as EventListener
    );
    window.removeEventListener(
      "popstate",
      this.handlePopState as EventListener
    );
    this.actor.stop();
  }

  handlePopState = (event: Event) => {
    let targetState: string;

    if (event.type === "navigate" && (event as CustomEvent).detail?.path) {
      targetState = pathToState((event as CustomEvent).detail.path);
    } else {
      targetState = pathToState(window.location.pathname);
    }

    this.actor.send({ type: `NAVIGATE.${targetState}` });
    this.setState({ currentState: this.actor.getSnapshot() });
  };

  render() {
    const { currentState } = this.state;

    if (!currentState) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Typography>Ładowanie...</Typography>
        </Box>
      );
    }

    const component = routes.find((route) =>
      currentState.matches(pathToState(route.path))
    )?.component;

    if (component) {
      const Component = component;
      return <Component />;
    }

    return <NotFound />;
  }
}

export default Router;
