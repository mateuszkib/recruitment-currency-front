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
import PaymentError from "../components/PaymentError";
import { XStateConnectedComponent } from "../components/XStateConnectedComponent";
import type { Subscription } from "xstate";
import PaymentSuccess from "../components/PaymentSuccess";

class Payment extends XStateConnectedComponent<{}, {}> {
  constructor(props: {}) {
    super(props);
  }
  private unsubscribe: Subscription | null = null;

  componentDidMount(): void {
    this.unsubscribe = transactionActor.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount(): void {
    this.unsubscribe?.unsubscribe();
  }

  handleSubmit = (e: React.FormEvent) => {
    const { exchangeResult } = transactionActor.getSnapshot().context;

    e.preventDefault();
    transactionActor.send({
      type: "SUBMIT_PAYMENT",
      amount: exchangeResult?.total || 0,
    });
    // Możesz dodać nawigację do podsumowania lub komunikat sukcesu
    // window.dispatchEvent(new CustomEvent("navigate", { detail: { path: "/summary" } }));
  };

  render() {
    const {
      context: { exchangeResult },
      value: currentState,
    } = transactionActor.getSnapshot();

    if (currentState === "paymentError") {
      return <PaymentError />;
    }

    if (currentState === "paymentSuccess") {
      return <PaymentSuccess />;
    }

    return (
      <Box mt={6} display="flex" justifyContent="center">
        <Card sx={{ minWidth: 350 }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Płatność
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Box mb={2} textAlign="center">
              <Typography variant="body1">Do zapłaty:</Typography>
              <Typography variant="h4" color="primary" fontWeight="bold">
                {exchangeResult?.total} {exchangeResult?.currency}
              </Typography>
            </Box>

            <form onSubmit={this.handleSubmit}>
              <Box display="flex" gap={2} mt={3} justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  loading={currentState === "processingPayment" ? true : false}
                  loadingPosition="end"
                >
                  Zapłać
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    );
  }
}

export default Payment;
