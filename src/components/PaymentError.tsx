import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { transactionActor } from "../state/actors/transactionActor";

const PaymentError = () => {
  return (
    <Box mt={6} display="flex" justifyContent="center">
      <Card>
        <CardContent>
          <Typography variant="h5" color="error" align="center" gutterBottom>
            Błąd płatności
          </Typography>
          <Typography>
            Podczas przetwarzania płatności wystąpił błąd. Spróbuj ponownie.
          </Typography>
          <Box mt={2} display="flex" gap={2} justifyContent="center">
            <Button
              variant="contained"
              onClick={() => {
                transactionActor.send({ type: "RETRY_PAYMENT" });
                window.dispatchEvent(
                  new CustomEvent("navigate", { detail: { path: "/payment" } })
                );
              }}
            >
              Spróbuj ponownie
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                transactionActor.send({ type: "CANCEL" });
                window.dispatchEvent(
                  new CustomEvent("navigate", { detail: { path: "/exchange" } })
                );
              }}
            >
              Wróć do kwoty
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PaymentError;
