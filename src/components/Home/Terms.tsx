import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import CheckCircle from "@mui/icons-material/CheckCircle";
import ExpandMore from "@mui/icons-material/ExpandMore";

export const Terms = () => {
  return (
    <>
      <Typography variant="h5" my={1} fontWeight="medium">
        Regulamin i Warunki Korzystania
      </Typography>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">1. Postanowienia ogólne</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <CheckCircle fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Usługa dostępna 24/7 online"
                secondary="Kantor działa przez całą dobę, 7 dni w tygodniu"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Aktualne kursy walut"
                secondary="Kursy aktualizowane w czasie rzeczywistym"
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">2. Zasady wymiany</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <CheckCircle fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Minimalna kwota wymiany: 10 jednostek waluty"
                secondary="Maksymalna kwota wymiany: 10 000 jednostek waluty"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Prowizja naliczana zgodnie z aktualnym cennikiem"
                secondary="Brak ukrytych opłat"
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">3. Ochrona danych osobowych</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <VerifiedUser fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Dane przechowywane lokalnie w przeglądarce"
                secondary="Nie przekazujemy danych osobowych stronom trzecim"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <VerifiedUser fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Zgodność z RODO"
                secondary="Pełna kontrola nad swoimi danymi"
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
