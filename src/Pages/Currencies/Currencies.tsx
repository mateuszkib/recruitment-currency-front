import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Avatar,
  Divider,
  Container,
} from "@mui/material";
import { SwapHoriz, MonetizationOn } from "@mui/icons-material";
import { XStateConnectedComponent } from "../../components/XStateConnectedComponent";
import {
  sendTransactionEvent,
  transactionActor,
} from "../../state/actors/transactionActor";
import { currencyIcons } from "../../constants/currencyIcons";
import type { Rate } from "../../interfaces/Rate";
import styles from "./styles/Currencies.module.css";
import type { Subscription } from "xstate";

interface CurrencySelectorState {
  rates: Rate[];
}

class Currencies extends XStateConnectedComponent<{}, CurrencySelectorState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      rates: [],
    };
  }

  private abort?: AbortController;
  private unsubscribe?: Subscription;

  componentDidMount() {
    this.unsubscribe = transactionActor.subscribe(() => {
      this.forceUpdate();
    });

    this.abort = new AbortController();

    this.getCurrencies(this.abort.signal).catch((err) => {
      if (err.name !== "AbortError") {
        console.error("Failed to fetch currencies:", err);
      }
    });
  }

  componentWillUnmount() {
    this.abort?.abort();
    this.abort = undefined;
    this.unsubscribe?.unsubscribe();

    super.componentWillUnmount?.();
  }

  handleCurrencySelect = (rate: Rate | undefined) => {
    sendTransactionEvent({
      type: "SELECT_CURRENCY",
      rate,
    });
  };

  handleContinue = () => {
    const { context } = transactionActor.getSnapshot();

    if (context.rate.from) {
      sendTransactionEvent({ type: "CONTINUE_TO_EXCHANGE" });

      window.history.pushState({}, "", "/exchange");
      window.dispatchEvent(
        new CustomEvent("navigate", { detail: { path: "/exchange" } })
      );
    }
  };

  private async getCurrencies(signal: AbortSignal) {
    try {
      const response = await fetch("/api/currencies", {
        method: "GET",
        headers: {
          "x-currency-token": "dasdiubasiob1=231231238913y4-n432r2nby83rt29",
          accept: "application/json",
        },
        signal,
      });
      const data = await response.json();

      if (signal.aborted) return;

      this.setState({ rates: data });
    } catch (error: any) {
      if (error?.name === "AbortError") return;
      throw error;
    }
  }

  getCurrencyIcon = (code: string) => {
    const currency = currencyIcons.find((c) => c.code === code);

    return currency ? currency.icon : <MonetizationOn />;
  };

  renderCurrencyCard = (rate: Rate | undefined, index: number) => {
    const { context } = transactionActor.getSnapshot();
    const [from, to] = rate?.currency?.split("/") || [];

    const isSelected = context.rate.from === from;

    return (
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 4,
          lg: 3,
        }}
        key={rate?.currency ? rate.currency + index : index}
      >
        <Card
          className={`${styles.currencyCard} ${
            isSelected ? styles.currencyCardSelected : ""
          }`}
          onClick={() => this.handleCurrencySelect(rate)}
        >
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar className={styles.avatarFromCurrency}>
                  {this.getCurrencyIcon(from)}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold" fontSize={14}>
                    {rate?.currency}
                  </Typography>
                </Box>
              </Box>
              <SwapHoriz color="action" />
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar className={styles.avatarToCurrency}>
                  {this.getCurrencyIcon(to)}
                </Avatar>
                <Box textAlign="right">
                  <Typography variant="h6" fontWeight="bold" fontSize={14}>
                    {to}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider className={styles.divider} />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  Kupno
                </Typography>
                <Typography variant="h6" color="success.main" fontWeight="bold">
                  {Number(rate?.buy).toFixed(4)}
                </Typography>
              </Box>

              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  Sprzedaż
                </Typography>
                <Typography variant="h6" color="error.main" fontWeight="bold">
                  {Number(rate?.sell).toFixed(4)}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  render() {
    const { context, value: currentState } = transactionActor.getSnapshot();

    console.log("Aktualny stan:", currentState); // ← sprawdź w jakim stanie jesteś
    console.log("Context rate:", context.rate);

    return (
      <Container maxWidth="lg">
        <Box py={4}>
          <Box textAlign="center" mb={4}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              fontWeight="bold"
            >
              Wybierz parę walutową
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={3}>
              Aktualne kursy wymiany walut
            </Typography>
            {context.rate.from && (
              <Chip
                label={`Wybrano: ${context.rate.from}/${context.rate.to}`}
                color="primary"
                size="small"
                className={styles.selectedCurrencyChip}
              />
            )}
          </Box>

          <Grid container spacing={3}>
            {this.state.rates.map((rate, index) =>
              this.renderCurrencyCard(rate, index)
            )}
          </Grid>

          <Box mt={4} textAlign="center">
            <Button
              variant="contained"
              size="large"
              onClick={this.handleContinue}
              disabled={!context.rate.from}
              className={styles.goToExchangeButton}
            >
              Przejdź do wymiany
            </Button>
          </Box>

          <Box mt={3} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Kursy aktualizowane na żywo • Ostatnia aktualizacja:{" "}
              {new Date().toLocaleTimeString()}
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }
}

export default Currencies;
