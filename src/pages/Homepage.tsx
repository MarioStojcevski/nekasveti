import { Box, Typography, Button } from "@mui/material";

const Homepage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4">Neka Sveti</Typography>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </Box>
  );
};

export default Homepage;