import { Grid } from "@mui/material";
import CurrencyCard from "./CurrencyCard";
import CurrencyAlert from "./CurrencyAlert";
import { currencyIcons } from "../../constants/currencyIcons";
import type { CurrencyListProps } from "../../interfaces/CurrencyListProps";

const CurrencyList: React.FC<CurrencyListProps> = ({
  rates,
  error,
  onRefresh,
  onSelect,
  context,
  styles,
}) => {
  if (rates.length === 0 || error) {
    return (
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }} textAlign="center">
          <CurrencyAlert error={error} onRefresh={onRefresh} />
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container spacing={3}>
      {rates.map((rate) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={rate.currency}>
          <CurrencyCard
            rate={rate}
            isSelected={context.rate.currency === rate.currency}
            onSelect={onSelect}
            styles={styles}
            currencyIcons={currencyIcons}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CurrencyList;
