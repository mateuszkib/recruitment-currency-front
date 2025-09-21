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
import styles from "./styles/Payment.module.css";

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
    const { amount } = transactionActor.getSnapshot().context;

    e.preventDefault();
    transactionActor.send({
      type: "SUBMIT_PAYMENT",
      amount: amount || 0,
    });
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
      <Box className={styles.container}>
        <Card className={styles.card}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Płatność
            </Typography>
            <Divider className={styles.divider} />

            <Box className={styles.paymentAmount}>
              <Typography variant="body1">Do zapłaty:</Typography>
              <Typography variant="h4" color="primary" fontWeight="bold">
                {exchangeResult?.total} {exchangeResult?.currency}
              </Typography>
            </Box>

            <form onSubmit={this.handleSubmit}>
              <Box className={styles.buttonContainer}>
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
