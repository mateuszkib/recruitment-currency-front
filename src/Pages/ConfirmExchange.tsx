import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { transactionActor } from "../state/actors/transactionActor";

const ConfirmExchange: React.FC = () => {
  const { amount, direction, rate, exchangeResult } =
    transactionActor.getSnapshot().context;

  if (!amount || !exchangeResult) {
    return (
      <Box textAlign="center" mt={6}>
        <Typography color="error">
          Brak danych do potwierdzenia wymiany.
        </Typography>
      </Box>
    );
  }

  return (
    <Box mt={6} display="flex" justifyContent="center">
      <Card sx={{ minWidth: 350, maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Potwierdź wymianę walut
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Box mb={2}>
            <Typography variant="subtitle1" align="center">
              {direction === "buy"
                ? `Sprzedajesz ${amount} ${rate.from}`
                : `Wymieniasz ${amount} ${rate.to}`}
            </Typography>
            <Typography variant="subtitle1" align="center">
              Kurs {direction === "buy" ? "kupna" : "sprzedaży"}:{" "}
              <b>
                {direction === "buy"
                  ? Number(rate.buy).toFixed(4)
                  : Number(rate.sell).toFixed(4)}{" "}
                PLN
              </b>
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box mb={2} textAlign="center">
            <Typography variant="body1">Otrzymasz:</Typography>
            <Typography variant="h4" color="success.main" fontWeight="bold">
              {exchangeResult.total} {exchangeResult.currency}
            </Typography>
          </Box>

          <Box display="flex" gap={2} mt={3} justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() =>
                transactionActor.send({ type: "CONFIRM_EXCHANGE" })
              }
            >
              Potwierdź
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("navigate", {
                    detail: { path: "/exchange" },
                  })
                );
                transactionActor.send({ type: "CANCEL" });
              }}
            >
              Anuluj
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ConfirmExchange;
