import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import CurrencyFrancIcon from "@mui/icons-material/CurrencyFranc";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import { Typography } from "@mui/material";
import type { JSX } from "react";

export const currencyIcons: Array<{
  code: string;
  name: string;
  icon: JSX.Element;
}> = [
  { code: "USD", name: "Dolar amerykański", icon: <AttachMoneyIcon /> },
  { code: "EUR", name: "Euro", icon: <EuroIcon /> },
  { code: "GBP", name: "Funt brytyjski", icon: <CurrencyPoundIcon /> },
  { code: "JPY", name: "Jen japoński", icon: <CurrencyYenIcon /> },
  { code: "CHF", name: "Frank szwajcarski", icon: <CurrencyFrancIcon /> },
  {
    code: "PLN",
    name: "Złoty polski",
    icon: <Typography variant="h6">zł</Typography>,
  },
  {
    code: "CZK",
    name: "Korona czeska",
    icon: <Typography variant="h6">Kč</Typography>,
  },
  {
    code: "SEK",
    name: "Korona szwedzka",
    icon: <Typography variant="h6">kr</Typography>,
  },
  {
    code: "NOK",
    name: "Korona norweska",
    icon: <Typography variant="h6">kr</Typography>,
  },
  {
    code: "DKK",
    name: "Korona duńska",
    icon: <Typography variant="h6">kr</Typography>,
  },
  { code: "RUB", name: "Rubel rosyjski", icon: <CurrencyRubleIcon /> },
  { code: "TRY", name: "Lira turecka", icon: <CurrencyLiraIcon /> },
  { code: "BTC", name: "Bitcoin", icon: <CurrencyBitcoinIcon /> },
  {
    code: "UAH",
    name: "Hrywna ukraińska",
    icon: <Typography variant="h6">₴</Typography>,
  },
  {
    code: "HUF",
    name: "Forint węgierski",
    icon: <Typography variant="h6">Ft</Typography>,
  },
  {
    code: "CNY",
    name: "Juan chiński",
    icon: <Typography variant="h6">¥</Typography>,
  },
  { code: "AUD", name: "Dolar australijski", icon: <AttachMoneyIcon /> },
  { code: "CAD", name: "Dolar kanadyjski", icon: <AttachMoneyIcon /> },
  { code: "NZD", name: "Dolar nowozelandzki", icon: <AttachMoneyIcon /> },
  {
    code: "ZAR",
    name: "Rand południowoafrykański",
    icon: <Typography variant="h6">R</Typography>,
  },
  {
    code: "ILS",
    name: "Nowy szekel izraelski",
    icon: <Typography variant="h6">₪</Typography>,
  },
  {
    code: "MXN",
    name: "Peso meksykańskie",
    icon: <Typography variant="h6">$</Typography>,
  },
  {
    code: "BRL",
    name: "Real brazylijski",
    icon: <Typography variant="h6">R$</Typography>,
  },
  {
    code: "INR",
    name: "Rupia indyjska",
    icon: <Typography variant="h6">₹</Typography>,
  },
];
