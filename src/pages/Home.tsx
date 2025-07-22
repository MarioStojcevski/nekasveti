import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Button onClick={() => navigate('/services')} variant="contained" color="primary">
        anastasija
      </Button>
    </Box>
  );
};

export default Home;