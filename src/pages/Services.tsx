import { useNavigate } from "react-router-dom";
import { Box, Button, Card, Typography } from "@mui/material";
import { useAppContext } from "../context/AppContext";
import allServices from "../utils/allServices";
import type { Service } from "../types";

const ServicePicker = () => {
  const navigate = useNavigate();
  const { services, setServices } = useAppContext();

  const updateServiceQuantity = (serviceId: string, increment: boolean) => {
    const service = allServices.find((s: Service) => s.id === serviceId);
    if (!service) return;

    const existingService = services.find((s: Service) => s.id === serviceId);
    
    if (existingService) {
      if (increment) {
        setServices(
          services.map((s: Service) =>
            s.id === serviceId
              ? { ...s, quantity: (s.quantity || 0) + 1 }
              : s
          )
        );
      } else {
        if (existingService.quantity && existingService.quantity > 1) {
          setServices(
            services.map((s: Service) =>
              s.id === serviceId
                ? { ...s, quantity: (s.quantity || 1) - 1 }
                : s
            )
          );
        } else {
          setServices(services.filter((s: Service) => s.id !== serviceId));
        }
      }
    } else if (increment) {
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
        {allServices.map((service: Service) => {
          const selectedService = services.find((s: Service) => s.id === service.id);

          return (
            <Card key={service.id} sx={{ marginBottom: 2, padding: 2 }}>
              <Typography variant="h6">{service.name}</Typography>
              <img src="./sponge.jpg" height={100} alt={service.name} />
              <Typography variant="body1" marginBottom={2}>
                {service.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" marginBottom={2}>
                Цена: {service.price} ден.
              </Typography>

              {selectedService?.quantity && selectedService?.quantity > 0 && (
                <Typography variant="body2" marginBottom={2}>
                  Количина: {selectedService?.quantity}
                </Typography>
              )}

              {(!selectedService?.quantity || selectedService?.quantity === 0) ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => updateServiceQuantity(service.id, true)} // Add more of the service
                  fullWidth
                >
                  Додади услуга
                </Button>
              ) :
              (
                <Box display="flex" flexDirection="row" alignItems="center" marginBottom={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => updateServiceQuantity(service.id, true)} // Increase quantity
                  fullWidth
                >
                  +
                </Button>
                
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => updateServiceQuantity(service.id, false)} // Decrease quantity or remove
                  fullWidth
                  disabled={!selectedService?.quantity}
                >
                  -
                </Button>
              </Box>
              )}
            </Card>
          );
        })}
      </Box>

      <Box display="flex" marginBottom={4}>
        <Button variant="contained" fullWidth onClick={() => navigate('/schedule')}>
          Следно
        </Button>
      </Box>
    </Box>
  );
};

export default ServicePicker; 