import { useNavigate } from "react-router-dom";
import { Box, Button, Card, Typography } from "@mui/material";

import { useAppContext } from "../context/AppContext";
import allServices from "../utils/allServices";
import type { Service } from "../types";

const ServicePicker = () => {
  const navigate = useNavigate();
  const { services, setServices } = useAppContext();

  const addService = (serviceId: string) => {
    const service = allServices.find((s: Service) => s.id === serviceId);
    if (!service) return;
    const existingService = services.find((s: Service) => s.id === serviceId);
    if (existingService) {
      setServices(services.map((s: Service) => 
        s.id === serviceId ? { ...s, quantity: (s.quantity || 0) + 1 } : s
      ));
    } else {
      setServices([...services, { ...service, quantity: 1 }]);
    }
  };

  return (
    <Box display="flex" flexDirection="column" marginTop={200}>
      <Box>
        <Typography variant="subtitle1" textAlign="justify" marginBottom={6}>
          Изберете услуги за хемиско чистење и притиснете "Следно" за да продолжите.
        </Typography>
      </Box>
      <Box>
        {allServices.map((service: Service) => (
          <Card key={service.id} sx={{ marginBottom: 2, padding: 2 }} >
            <Typography variant="h6">{service.name}</Typography>
            <img src="./sponge.jpg" height={100} />
            <Typography variant="body1" marginBottom={2}>
              {service.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" marginBottom={2}>
              Цена: {service.price} ден.
            </Typography>
              <Box display="flex" flexDirection="row" alignItems="center" marginBottom={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => addService(service.id)}
                  fullWidth
                >
                  +
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setServices(services.filter((s: Service) => s.id !== service.id))}
                  fullWidth
                >
                  -
                </Button>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => addService(service.id)}
                fullWidth
              >
                Додади услуга
              </Button>
          </Card>
        ))}
      </Box>
      <Box display="flex" marginBottom={4}>
        <Button variant="contained" fullWidth onClick={() => navigate('/schedule')} >Следно</Button>
      </Box>
    </Box>
  );
};

export default ServicePicker;