import CurrencyExchange from "@mui/icons-material/CurrencyExchange";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./styles/Header.module.css";

export const Header = () => {
  return (
    <Box textAlign="center" mb={4}>
      <CurrencyExchange className={styles.iconCurrencyExchange} />
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        CurrencyHub
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Profesjonalna wymiana walut online
      </Typography>
    </Box>
  );
};
