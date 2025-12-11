import { Box } from "@mui/material";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column",
        background: '#ffffff',
        position: 'relative',
      }}
    >
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: { xs: 1.5, sm: 3, md: 4 },
          marginTop: { xs: "70px", sm: "80px" },
          minHeight: { xs: "calc(100vh - 70px)", sm: "calc(100vh - 80px)" },
          width: "100%",
          maxWidth: "1400px",
          marginX: "auto",
          pb: { xs: 3, sm: 5 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default App;
