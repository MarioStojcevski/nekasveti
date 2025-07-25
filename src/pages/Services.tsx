import { Box, Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
    <Box display="flex" flexDirection="column" padding={2}>
      <Box marginBottom={6}>
        <Typography 
          variant="subtitle1" 
          textAlign="center" 
          color="text.primary" 
          marginBottom={6}
          sx={{
            fontWeight: 300, 
            lineHeight: 1.5,
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
          }}
        >
          Изберете услуги за хемиско чистење и притиснете "Следно" за да продолжите.
        </Typography>
      </Box>
      
      <Box>
        {allServices.map((service: Service) => {
          const selectedService = services.find((s: Service) => s.id === service.id);

          return (
            <Card key={service.id} sx={{ marginBottom: 2, padding: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
                {service.name}
              </Typography>
              <img src="./sponge.jpg" height={100} alt={service.name} />
              <Typography variant="body1" marginBottom={2}>
                {service.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" marginBottom={2}>
                Цена: {service.price} ден.
              </Typography>

              {selectedService?.quantity && selectedService?.quantity > 0 && (
                <Box
                  sx={{
                    backgroundColor: '#ffeb3b', // Light yellow to make it pop out
                    color: '#000', // Black text for contrast
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '18px',
                    fontWeight: '500',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    marginBottom: 2,
                    textAlign: 'center',
                    width: 'fit-content',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  Количина: {selectedService?.quantity}
                </Box>
              )}

              {(!selectedService?.quantity || selectedService?.quantity === 0) ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => updateServiceQuantity(service.id, true)} 
                  sx={{
                    backgroundColor: '#2e58ffff',
                    '&:hover': { backgroundColor: '#1a318cff' },
                    textTransform: 'uppercase',
                    borderRadius: '10px',
                    padding: '12px',
                    margin: 'auto',
                    maxWidth: 400,
                  }}
                >
                  Додади услуга
                </Button>
              ) :
              (
                <Box display="flex" flexDirection="row" alignItems="center" marginBottom={2}>
                
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => updateServiceQuantity(service.id, false)} 
                    disabled={!selectedService?.quantity}
                    sx={{
                      padding: '12px',
                      borderRadius: '10px',
                      textTransform: 'none',
                      '&:hover': { backgroundColor: '#45a049' },
                      maxWidth: 150,
                      margin: 'auto',
                    }}
                  >
                    -
                  </Button>

                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => updateServiceQuantity(service.id, true)} 
                    sx={{
                      padding: '12px',
                      borderRadius: '10px',
                      textTransform: 'none',
                      '&:hover': { backgroundColor: '#1a318cff' },
                      maxWidth: 150,
                      margin: 'auto',
                    }}
                  >
                    +
                  </Button>
                </Box>
              )}
            </Card>
          );
        })}
      </Box>

      <Box display="flex" marginBottom={4} sx={{ marginTop: 4 }}>
        <Button
          variant="contained"
          onClick={() => navigate('/schedule')}
          sx={{
            backgroundColor: '#2e58ffff',
            '&:hover': { backgroundColor: '#1a318cff' },
            textTransform: 'uppercase',
            padding: '12px',
            width: '100%',
            margin: 'auto',
          }}
        >
          Следно
        </Button>
      </Box>
    </Box>
  );
};

export default ServicePicker;
