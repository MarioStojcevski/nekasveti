import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column">
      <Box>
        <Typography variant="subtitle1" textAlign="justify" marginBottom={2}>
          Закажи хемиско чистење за твојот дом, канцеларија или автомобил за 2 минути. Нашите експерти ќе го направат тоа со задоволство.
        </Typography>
      </Box>
      <Box width="fit-content">
        <img src="./guy.jpg" height={400} />
      </Box>
      <Box display="flex" justifyContent="center" marginTop={6}>
        <Button onClick={() => navigate('/services')} variant="contained" fullWidth color="primary">
          Започни
        </Button>
      </Box>
    </Box>
  );
};

export default Home;