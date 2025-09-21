import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import styles from "./styles/TermsAccept.module.css";
import { setSessionLocalStorage } from "../../helpers/setSessionLocalStorage";
import {
  getTransactionState,
  sendTransactionEvent,
  transactionActor,
} from "../../state/actors/transactionActor";
import { XStateConnectedComponent } from "../XStateConnectedComponent";

interface TermsAcceptState {
  termsAccepted: boolean;
}

export class TermsAccept extends XStateConnectedComponent<
  {},
  TermsAcceptState
> {
  constructor(props: {}) {
    super(props);

    const currentState = getTransactionState();

    this.state = {
      termsAccepted: currentState.context.termsAccepted || false,
    };
  }

  componentDidMount() {
    this.subscribeToActor(transactionActor, (state) => {
      this.setState({ termsAccepted: state.context.termsAccepted });
    });
  }

  handleAccept = () => {
    const newValue = !this.state.termsAccepted;

    setSessionLocalStorage({ termsAccepted: newValue });
    sendTransactionEvent({ type: "ACCEPT_TERMS" });
  };

  handleStartExchange = () => {
    window.dispatchEvent(
      new CustomEvent("navigate", { detail: { path: "/currencies" } })
    );
  };

  render() {
    return (
      <Box mt={4} p={3} bgcolor="grey.50" borderRadius={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.termsAccepted}
              onChange={this.handleAccept}
              color="primary"
            />
          }
          label={
            <Typography variant="body1">
              Akceptuję regulamin i warunki korzystania z kantoru walut
            </Typography>
          }
        />

        <Box mt={2} display="flex" gap={2} justifyContent="center">
          <Button
            variant="contained"
            size="large"
            onClick={this.handleStartExchange}
            disabled={!this.state.termsAccepted}
            className={styles.buttonStartExchange}
          >
            Rozpocznij wymianę
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => window.close()}
          >
            Anuluj
          </Button>
        </Box>
      </Box>
    );
  }
}
