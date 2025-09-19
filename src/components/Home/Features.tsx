import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Security from "@mui/icons-material/Security";
import Speed from "@mui/icons-material/Speed";
import styles from "./styles/Features.module.css";

export const Features = () => {
  return (
    <Box mb={4}>
      <Typography variant="h5" gutterBottom fontWeight="medium">
        Dlaczego warto wybrać nas?
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
        gap={2}
      >
        <Card variant="outlined">
          <CardContent>
            <Box display="flex" alignItems="center" mb={1}>
              <Security color="primary" className={styles.rightMarginIcon} />
              <Typography variant="h6">Bezpieczeństwo</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Najwyższe standardy bezpieczeństwa i ochrony danych
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Box display="flex" alignItems="center" mb={1}>
              <Speed color="primary" className={styles.rightMarginIcon} />
              <Typography variant="h6">Szybkość</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Natychmiastowe transakcje i aktualne kursy walut
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
