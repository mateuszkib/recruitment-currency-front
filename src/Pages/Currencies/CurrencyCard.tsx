import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import { SwapHoriz, MonetizationOn } from "@mui/icons-material";
import type { ExchangeRate } from "../../interfaces/ExchangeRate";

interface CurrencyCardProps {
  rate: ExchangeRate;
  isSelected: boolean;
  onSelect: (rate: ExchangeRate) => void;
  styles: any;
  currencyIcons: { code: string; icon: React.ReactNode }[];
}

const getCurrencyIcon = (
  code: string,
  currencyIcons: { code: string; icon: React.ReactNode }[]
) => {
  const currency = currencyIcons.find((c) => c.code === code);
  return currency ? currency.icon : <MonetizationOn />;
};

const CurrencyCard: React.FC<CurrencyCardProps> = ({
  rate,
  isSelected,
  onSelect,
  styles,
  currencyIcons,
}) => {
  const [from, to] = rate.currency?.split("/") || [];
  return (
    <Card
      className={`${styles.currencyCard} ${
        isSelected ? styles.currencyCardSelected : ""
      }`}
      onClick={() => onSelect(rate)}
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
              {getCurrencyIcon(from, currencyIcons)}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold" fontSize={14}>
                {rate.currency}
              </Typography>
            </Box>
          </Box>
          <SwapHoriz color="action" />
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar className={styles.avatarToCurrency}>
              {getCurrencyIcon(to, currencyIcons)}
            </Avatar>
            <Box textAlign="right">
              <Typography variant="h6" fontWeight="bold" fontSize={14}>
                {to}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider className={styles.divider} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Kupno
            </Typography>
            <Typography variant="h6" color="success.main" fontWeight="bold">
              {Number(rate.buy).toFixed(4)}
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Sprzedaż
            </Typography>
            <Typography variant="h6" color="error.main" fontWeight="bold">
              {Number(rate.sell).toFixed(4)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CurrencyCard;
