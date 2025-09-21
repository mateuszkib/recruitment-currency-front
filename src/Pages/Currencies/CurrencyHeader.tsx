import { Box, Typography, Chip } from "@mui/material";
import type { SnapshotFrom } from "xstate";
import { transactionMachine } from "../../state/machines/transactionMachine";

type TransactionContext = SnapshotFrom<typeof transactionMachine>["context"];

interface CurrencyHeaderProps {
  context: TransactionContext;
  styles: Record<string, string>;
}

const CurrencyHeader = ({ context, styles }: CurrencyHeaderProps) => (
  <Box textAlign="center" mb={4}>
    <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
      Wybierz parę walutową
    </Typography>
    <Typography variant="h6" color="text.secondary" mb={3}>
      Aktualne kursy wymiany walut
    </Typography>
    {context.rate.from && (
      <Chip
        label={`Wybrano: ${context.rate.from}/${context.rate.to}`}
        color="primary"
        size="small"
        className={styles.selectedCurrencyChip}
      />
    )}
  </Box>
);

export default CurrencyHeader;
