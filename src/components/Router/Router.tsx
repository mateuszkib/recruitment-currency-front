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
import { routerMachine } from "./routerMachine";
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

    window.addEventListener("popstate", this.handlePopState);
  }
  componentWillUnmount() {
    window.removeEventListener("popstate", this.handlePopState);
    this.actor.stop();
  }

  handlePopState = () => {
    const currentPath = window.location.pathname;
    const targetState = pathToState(currentPath);
    this.actor.send({ type: `NAVIGATE.${targetState}` });
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
