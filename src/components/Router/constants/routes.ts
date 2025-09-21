import ConfirmExchange from "../../../Pages/ConfirmExchange";
import Currencies from "../../../Pages/Currencies";
import Exchange from "../../../Pages/Exchange";
import Home from "../../../Pages/Home";
import Payment from "../../../Pages/Payment";
import PaymentSuccess from "../../PaymentSuccess";
import type { Route } from "../interfaces/Routes";

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
