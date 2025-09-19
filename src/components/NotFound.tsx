import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const NotFound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Typography variant="h4">404 - Strona nie znaleziona</Typography>
    </Box>
  );
};
