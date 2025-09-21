import { Box, Button, Container } from "@mui/material";
import { XStateConnectedComponent } from "../../components/XStateConnectedComponent";
import {
  sendTransactionEvent,
  transactionActor,
} from "../../state/actors/transactionActor";
import type { ExchangeRate } from "../../interfaces/ExchangeRate";
import styles from "./styles/Currencies.module.css";
import { fetchCurrencies } from "../../services/currencies";
import CurrencyHeader from "./CurrencyHeader";
import CurrencyList from "./CurrencyList";
import { setSessionStorage } from "../../helpers/setSessionLocalStorage";

interface CurrencySelectorState {
  rates: ExchangeRate[];
  error: string;
}

class Currencies extends XStateConnectedComponent<{}, CurrencySelectorState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      rates: [],
      error: "",
    };
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleCurrencySelect = this.handleCurrencySelect.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
  }

  private abort?: AbortController;

  async componentDidMount() {
    this.abort = new AbortController();

    this.subscribeToActor(transactionActor, () => {
      this.forceUpdate();
    });

    const savedData = JSON.parse(sessionStorage.getItem("session") || "{}");
    if (savedData.rates && savedData.rates.length > 0) {
      this.setState({ rates: savedData.rates, error: "" });

      if (savedData.rate) {
        transactionActor.send({
          type: "SYNC_CURRENCY",
          rate: savedData.rate,
        });
      }
    } else {
      await this.getCurrencies(this.abort.signal);
    }
  }

  componentWillUnmount() {
    this.abort?.abort();
    super.componentWillUnmount?.();
  }

  async getCurrencies(signal?: AbortSignal) {
    try {
      this.setState({ error: "" });
      const rates = await fetchCurrencies(signal);
      this.setState({ rates, error: "" });

      setSessionStorage({
        rates: rates,
      });
    } catch (err: any) {
      this.setState({ error: err.message || "Błąd pobierania kursów walut." });
    }
  }

  async handleRefresh() {
    this.abort?.abort();
    this.abort = new AbortController();

    await this.getCurrencies(this.abort.signal);
  }

  handleCurrencySelect(rate: ExchangeRate) {
    const [from, to] = rate.currency?.split("/") || [];
    const newRate = { ...rate, from, to };

    setSessionStorage({ rate: newRate });
    sendTransactionEvent({ type: "SELECT_CURRENCY", rate });
    this.forceUpdate();
  }

  handleContinue() {
    setSessionStorage({
      rate: transactionActor.getSnapshot().context.rate,
    });
    sendTransactionEvent({ type: "CONTINUE_TO_EXCHANGE" });
    window.dispatchEvent(
      new CustomEvent("navigate", { detail: { path: "/exchange" } })
    );
  }

  render() {
    const { context } = transactionActor.getSnapshot();
    const { error, rates } = this.state;

    return (
      <Container maxWidth="lg">
        <Box py={4}>
          <CurrencyHeader context={context} styles={styles} />
          <CurrencyList
            rates={rates}
            error={error}
            onRefresh={this.handleRefresh}
            onSelect={this.handleCurrencySelect}
            context={context}
            styles={styles}
          />
          {rates.length > 0 && (
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
          )}
        </Box>
      </Container>
    );
  }
}
export default Currencies;
