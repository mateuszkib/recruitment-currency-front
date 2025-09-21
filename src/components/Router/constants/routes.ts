import { lazy } from "react";
import type { Route } from "../interfaces/Routes";

const Home = lazy(() => import("../../../Pages/Home"));
const Currencies = lazy(() => import("../../../Pages/Currencies"));
const Exchange = lazy(() => import("../../../Pages/Exchange"));
const ConfirmExchange = lazy(() => import("../../../Pages/ConfirmExchange"));
const Payment = lazy(() => import("../../../Pages/Payment"));
const PaymentSuccess = lazy(() => import("../../PaymentSuccess"));

export const routes: Route[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/currencies",
    component: Currencies,
  },
  {
    path: "/exchange",
    component: Exchange,
  },
  {
    path: "/confirm-exchange",
    component: ConfirmExchange,
  },
  {
    path: "/payment",
    component: Payment,
  },
  {
    path: "/payment-success",
    component: PaymentSuccess,
  },
];
