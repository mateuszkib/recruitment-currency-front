import Currencies from "../../Pages/Currencies";
import Home from "../../Pages/Home";
import type { Route } from "../interfaces/Routes";

export const routes: Route[] = [
    {
      path: "/",
      component: Home,
    },
    {
      path: "currencies",
      component: Currencies,
    },
  ];