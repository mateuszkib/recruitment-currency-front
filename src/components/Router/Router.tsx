import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { routerMachine } from "./routerMachine";
import { pathToState } from "../../helpers/pathToState";

const Router = () => {
  const [path, send] = useMachine(routerMachine);

  useEffect(() => {
    const handler = () => {
      const currentPath = window.location.pathname;
      const targetState = pathToState(currentPath);

      send({ type: `NAVIGATE.${targetState}` });
    };

    window.addEventListener("popstate", handler);

    return () => window.removeEventListener("popstate", handler);
  }, [send]);

  return <></>;
};

export default Router;
