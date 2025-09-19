import { createMachine } from "xstate";
import { routes } from "../../components/Router/constants/routes";
import { pathToState } from "../../helpers/pathToState";

const states = routes.reduce((acc: Record<string, any>, route) => {
  const stateName = pathToState(route.path);

  const transitions = routes.reduce(
    (transAcc: Record<string, string>, targetRoute) => {
      const targetState = pathToState(targetRoute.path);

      if (targetState !== stateName) {
        transAcc[`NAVIGATE.${targetState}`] = targetState;
      }

      return transAcc;
    },
    {}
  );

  acc[stateName] = {
    on: transitions,
  };

  return acc;
}, {});

const routerMachine = createMachine({
  id: "router",
  initial: pathToState(window.location.pathname),
  states,
});

export { routerMachine };
