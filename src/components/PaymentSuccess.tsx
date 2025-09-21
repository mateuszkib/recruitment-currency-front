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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { transactionActor } from "../state/actors/transactionActor";
import styles from "./styles/PaymentSuccess.module.css";

const PaymentSuccess: React.FC = () => {
  const { exchangeResult, rate, transactionId } =
    transactionActor.getSnapshot().context;

  if (!exchangeResult || !rate || !transactionId) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  const handleBackToHome = () => {
    transactionActor.send({ type: "RESET" });
    sessionStorage.removeItem("session");
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
    <Box className={styles.container}>
      <Grow in={true} timeout={800}>
        <Card className={styles.card}>
          <CardContent className={styles.cardContent}>
            <Box className={styles.headerSection}>
              <Fade in={true} timeout={1000}>
                <CheckCircleIcon className={styles.successIcon} />
              </Fade>
              <Typography variant="h5" align="center" gutterBottom>
                Płatność zakończona pomyślnie!
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Twoja transakcja została zrealizowana
              </Typography>
            </Box>

            <Divider className={styles.divider} />

            <Box className={styles.detailsSection}>
              <Typography variant="subtitle2" color="text.secondary">
                Numer transakcji
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {transactionId}
              </Typography>
            </Box>

            <Box className={styles.detailsSection}>
              <Typography variant="subtitle2" color="text.secondary">
                Data i godzina
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {formattedDate}
              </Typography>
            </Box>

            <Box className={styles.detailsSection}>
              <Typography variant="subtitle2" color="text.secondary">
                Waluta
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {rate.currency}
              </Typography>
            </Box>

            <Box className={styles.detailsSection}>
              <Typography variant="subtitle2" color="text.secondary">
                Kwota
              </Typography>
              <Typography variant="h5" color="success.main" fontWeight="bold">
                {exchangeResult.total} {exchangeResult.currency}
              </Typography>
            </Box>

            <Divider className={styles.divider} />

            <Box className={styles.backButtonContainer}>
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
