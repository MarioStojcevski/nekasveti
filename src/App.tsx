import { Box } from "@mui/material";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <Box>
      <Box>
        <Header />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: 2,
          marginTop: "64px",
          height: "calc(100vh - 64px)",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default App;
