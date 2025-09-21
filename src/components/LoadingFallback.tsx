import { Box, CircularProgress, Typography } from "@mui/material";

export const LoadingFallback = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
      gap={2}
    >
      <CircularProgress size={40} />
      <Typography variant="body2" color="text.secondary">
        Ładowanie...
      </Typography>
    </Box>
  );
};
