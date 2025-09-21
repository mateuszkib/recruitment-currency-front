import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  CircularProgress,
  Fade,
  Grow,
} from "@mui/material";
import { green } from "@mui/material/colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { transactionActor } from "../state/actors/transactionActor";

const PaymentSuccess: React.FC = () => {
  const { exchangeResult, rate, transactionId } =
    transactionActor.getSnapshot().context;

  if (!exchangeResult || !rate || !transactionId) {
    return (
      <Box mt={6} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  const handleBackToHome = () => {
    transactionActor.send({ type: "RESET" });

    window.dispatchEvent(
      new CustomEvent("navigate", { detail: { path: "/" } })
    );
  };

  const formattedDate = new Date().toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box mt={6} display="flex" justifyContent="center">
      <Grow in={true} timeout={800}>
        <Card sx={{ minWidth: 350, maxWidth: 500, boxShadow: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={3}
            >
              <Fade in={true} timeout={1000}>
                <CheckCircleIcon
                  sx={{ fontSize: 80, color: green[500], mb: 2 }}
                />
              </Fade>
              <Typography variant="h5" align="center" gutterBottom>
                Płatność zakończona pomyślnie!
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Twoja transakcja została zrealizowana
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box mb={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Numer transakcji
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {transactionId}
              </Typography>
            </Box>

            <Box mb={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Data i godzina
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {formattedDate}
              </Typography>
            </Box>

            <Box mb={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Waluta
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {rate.currency}
              </Typography>
            </Box>

            <Box mb={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Kwota
              </Typography>
              <Typography variant="h5" color="success.main" fontWeight="bold">
                {exchangeResult.total} {exchangeResult.currency}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box mt={3} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleBackToHome}
              >
                Powrót do strony głównej
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grow>
    </Box>
  );
};

export default PaymentSuccess;
