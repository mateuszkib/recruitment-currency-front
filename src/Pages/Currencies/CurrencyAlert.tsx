import React from "react";
import { Alert, Button } from "@mui/material";

interface CurrencyAlertProps {
  error: string;
  onRefresh: () => void;
}

const CurrencyAlert: React.FC<CurrencyAlertProps> = ({ error, onRefresh }) => (
  <Alert
    severity={error ? "error" : "info"}
    action={
      <Button color="inherit" size="small" onClick={onRefresh}>
        Odśwież
      </Button>
    }
  >
    {error ? error : "Brak dostępnych walut. Spróbuj odświeżyć listę."}
  </Alert>
);

export default CurrencyAlert;
