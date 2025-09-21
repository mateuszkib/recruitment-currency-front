import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import styles from "./styles/TermsAccept.module.css";
import { setSessionStorage } from "../../helpers/setSessionLocalStorage";
import { transactionActor } from "../../state/actors/transactionActor";
import { XStateConnectedComponent } from "../XStateConnectedComponent";

export class TermsAccept extends XStateConnectedComponent<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  componentDidMount() {
    this.subscribeToActor(transactionActor, () => {
      this.forceUpdate();
    });

    const savedData = JSON.parse(sessionStorage.getItem("session") || "{}");

    if (Object.hasOwn(savedData, "termsAccepted")) {
      transactionActor.send({
        type: "SYNC_START",
        termsAccepted: savedData.termsAccepted,
      });
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount?.();
  }

  handleAccept = () => {
    const { termsAccepted } = transactionActor.getSnapshot().context;

    transactionActor.send({ type: "ACCEPT_TERMS" });
    setSessionStorage({ termsAccepted: !termsAccepted });
  };

  handleStartExchange = () => {
    transactionActor.send({ type: "START_EXCHANGE" });
    window.dispatchEvent(
      new CustomEvent("navigate", { detail: { path: "/currencies" } })
    );
  };

  render() {
    const { termsAccepted } = transactionActor.getSnapshot().context;

    return (
      <Box mt={4} p={3} bgcolor="grey.50" borderRadius={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={termsAccepted}
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
            disabled={!termsAccepted}
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
