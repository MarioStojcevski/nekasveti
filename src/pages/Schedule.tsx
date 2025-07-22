import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Schedule = () => {
  const navigate = useNavigate();
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <img src="./vacuum.jpg" height={300} />
      <Typography variant="body1" marginTop={2}>
        Изберете датум и време за хемиско чистење
      </Typography>
      <Button variant="contained" onClick={() => navigate('/summary')} sx={{ marginTop: 5}}>Следно</Button>
    </Box>
  );
};

export default Schedule;