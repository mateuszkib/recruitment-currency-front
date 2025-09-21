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
import styles from "./styles/ConfirmExchange.module.css";

const ConfirmExchange: React.FC = () => {
  const { amount, direction, rate, exchangeResult } =
    transactionActor.getSnapshot().context;

  if (!amount || !exchangeResult) {
    return (
      <Box className={styles.errorContainer}>
        <Typography color="error">
          Brak danych do potwierdzenia wymiany.
        </Typography>
      </Box>
    );
  }

  const handleConfirm = () => {
    window.dispatchEvent(
      new CustomEvent("navigate", {
        detail: { path: "/payment" },
      })
    );
    transactionActor.send({ type: "FINAL_CONFIRM" });
  };

  const handleCancel = () => {
    window.dispatchEvent(
      new CustomEvent("navigate", {
        detail: { path: "/exchange" },
      })
    );
    transactionActor.send({ type: "CANCEL" });
  };

  return (
    <Box className={styles.container}>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Potwierdź wymianę walut
          </Typography>
          <Divider className={styles.divider} />

          <Box className={styles.exchangeDetails}>
            <Typography variant="subtitle1" mt={1} align="center">
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

          <Divider className={styles.divider} />

          <Box className={styles.resultAmount}>
            <Typography variant="body1" mt={1}>
              Otrzymasz:
            </Typography>
            <Typography variant="h4" color="success.main" fontWeight="bold">
              {exchangeResult.total} {exchangeResult.currency}
            </Typography>
          </Box>

          <Box className={styles.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleConfirm}
            >
              Potwierdź
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={handleCancel}
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
