import { XStateConnectedComponent } from "../../components/XStateConnectedComponent";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import {
  sendTransactionEvent,
  transactionActor,
} from "../../state/actors/transactionActor";
import styles from "./styles/Exchange.module.css";
import { setSessionStorage } from "../../helpers/setSessionLocalStorage";

class Exchange extends XStateConnectedComponent<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  componentDidMount(): void {
    this.subscribeToActor(transactionActor, () => {
      this.forceUpdate();
    });

    const currentState = transactionActor.getSnapshot().value;

    if (currentState !== "enterAmount") {
      const savedData = JSON.parse(sessionStorage.getItem("session") || "{}");

      if (savedData.rate) {
        transactionActor.send({
          type: "SYNC_EXCHANGE_DATA",
          rate: savedData.rate,
          amount: savedData.amount || "",
          direction: savedData.direction || "buy",
        });
      } else {
        // Jeśli nie ma danych w sesji, po prostu przełącz stan
        transactionActor.send({ type: "CONTINUE_TO_EXCHANGE" });
      }
    }
  }

  componentWillUnmount(): void {
    super.componentWillUnmount?.();
  }

  handleDirection = (
    _event: React.MouseEvent<HTMLElement>,
    newDirection: "buy" | "sell" | null
  ) => {
    const { direction } = transactionActor.getSnapshot().context;

    if (newDirection !== null && newDirection !== direction) {
      setSessionStorage({ direction: newDirection });
      sendTransactionEvent({ type: "SET_DIRECTION", direction: newDirection });
    }
  };

  handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSessionStorage({ amount: event.target.value });
    sendTransactionEvent({ type: "SET_AMOUNT", amount: event.target.value });
  };

  getCalculateObject = () => {
    const { direction, amount } = transactionActor.getSnapshot().context;
    const {
      context: { rate },
    } = transactionActor.getSnapshot();
    const parsedAmount = parseFloat(amount);
    const exchangeRate =
      direction === "buy" ? Number(rate.buy) : Number(rate.sell);
    const result =
      isNaN(parsedAmount) || !exchangeRate
        ? 0
        : parseFloat((parsedAmount * exchangeRate).toFixed(2));

    return {
      amount: parsedAmount,
      result,
      resultCurrency: direction === "buy" ? rate.to : rate.from,
      direction,
    };
  };

  handleConfirmExchange = () => {
    const calculateObject = this.getCalculateObject();

    setSessionStorage({
      exchangeResult: {
        total: calculateObject.result,
        currency: calculateObject.resultCurrency,
      },
    });
    transactionActor.send({
      type: "CONFIRM_EXCHANGE",
      result: calculateObject.result,
      resultCurrency: calculateObject.resultCurrency,
    });

    window.dispatchEvent(
      new CustomEvent("navigate", { detail: { path: "/confirm-exchange" } })
    );
  };

  calculateResult = () => {
    return this.getCalculateObject().result;
  };

  render() {
    const {
      context: { rate, direction, amount },
    } = transactionActor.getSnapshot();
    const result = this.calculateResult();

    return (
      <Box mt={5}>
        <Card elevation={4}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Wymiana walut
            </Typography>
            <Box display="flex" justifyContent="center" mb={2}>
              <ToggleButtonGroup
                value={direction}
                exclusive
                onChange={this.handleDirection}
                aria-label="direction"
              >
                <ToggleButton value="buy" aria-label="buy">
                  Sprzedaj {rate.from}, otrzymaj {rate.to}
                </ToggleButton>
                <ToggleButton value="sell" aria-label="sell">
                  Kup {rate.from} za {rate.to}
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Divider className={styles.divider} />

            <Box className={styles.inputContainer}>
              <TextField
                label={
                  direction === "buy"
                    ? `Kwota ${rate.from} do sprzedaży`
                    : `Kwota ${rate.to} do wymiany`
                }
                value={amount}
                onChange={this.handleAmount}
                fullWidth
                inputMode="decimal"
                slotProps={{
                  htmlInput: {
                    inputMode: "decimal",
                    pattern: "[0-9,.]*",
                  },
                }}
              />

              <Paper elevation={1} className={styles.rateContainer}>
                <Typography variant="subtitle1">
                  Kurs {direction === "buy" ? "kupna" : "sprzedaży"}:
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  {direction === "buy"
                    ? Number(rate.buy)?.toFixed(4)
                    : Number(rate.sell)?.toFixed(4)}{" "}
                  PLN
                </Typography>
              </Paper>
            </Box>

            <Box display="flex" justifyContent="center" my={3}>
              <SwapHorizIcon fontSize="large" color="action" />
            </Box>
            <Box textAlign="center" mb={2}>
              <Typography variant="subtitle1">Otrzymasz:</Typography>
              <Typography variant="h4" color="success.main" fontWeight="bold">
                {result > 0
                  ? `${result} ${direction === "buy" ? rate.to : rate.from}`
                  : "--"}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={result <= 0}
              onClick={this.handleConfirmExchange}
            >
              Zatwierdź wymianę
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }
}

export default Exchange;
