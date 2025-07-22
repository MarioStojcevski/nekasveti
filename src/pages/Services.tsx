import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useAppContext } from "../context/AppContext";
import type { Service } from "../types";

const ServicePicker = () => {
  const navigate = useNavigate();
  const { services, setServices } = useAppContext();

  const addService = () => {
    const newService: Service = 
      { id: "aaaa",
        name: `Service ${services.length + 1}`,
       description: `Description for Service ${services.length + 1}`,
       price: 100 + services.length * 10,
       duration: 30 + services.length * 5,
      };

    setServices([...services, newService]);
  };

  return (
    <Box>
      <Typography variant="h4">ServicePicker Page</Typography>
      <Button onClick={addService} variant="outlined">Add service</Button>
      <Button onClick={() => navigate('/schedule')} >Next</Button>
    </Box>
  );
};

export default ServicePicker;