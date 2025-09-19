import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import styles from "./styles/TermsAccept.module.css";

export const TermsAccept = () => {
  const handleAccept = () => {};

  return (
    <Box mt={4} p={3} bgcolor="grey.50" borderRadius={2}>
      <FormControlLabel
        control={
          <Checkbox checked={true} onChange={handleAccept} color="primary" />
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
          onClick={handleAccept}
          disabled={false}
          className={styles.buttonStartExchange}
        >
          Rozpocznij wymianę
        </Button>
        <Button variant="outlined" size="large" onClick={() => window.close()}>
          Anuluj
        </Button>
      </Box>
    </Box>
  );
};
