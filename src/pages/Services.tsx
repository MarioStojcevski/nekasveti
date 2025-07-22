import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const ServicePicker = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Typography variant="h4">ServicePicker Page</Typography>
      <Button onClick={() => navigate('/schedule')} >Next</Button>
    </Box>
  );
};

export default ServicePicker;