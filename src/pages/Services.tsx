import { Box, Button, Card, Typography, Container, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import allServices from "../utils/allServices";
import type { Service } from "../types";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Map service IDs to appropriate chemical cleaning images
const getServiceImage = (serviceId: string): string => {
  const imageMap: Record<string, string> = {
    "service2": "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&q=80", // Чистење на теписи - Carpet cleaning with steam
    "service3": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80", // Чистење на фотеља - Armchair/sofa cleaning
    "service4": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80", // Чистење на двосед - Two-seater sofa cleaning
    "service5": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80", // Чистење на тросед - Three-seater sofa cleaning
    "service6": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80", // Чистење на спална + душек - Mattress cleaning
    "service7": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80", // Чистење на столче - Chair cleaning
    "service8": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80", // Чистење на канцелариски стол - Office desk cleaning
  };
  return imageMap[serviceId] || "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&q=80";
};

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
    <Container maxWidth="lg" sx={{ width: '100%', py: { xs: 2, sm: 4 } }}>
      <Box 
        display="flex" 
        flexDirection="column" 
        width="100%"
        sx={{ gap: 4 }}
      >
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography 
            variant="h3"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2.5rem' },
              fontWeight: 800,
              color: '#2c3e50',
              mb: 2,
            }}
          >
            Избери Услуги
          </Typography>
          <Typography 
            variant="body1"
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' },
              color: '#64748b',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Изберете услуги за хемиско чистење и притиснете "Следно" за да продолжите.
          </Typography>
        </Box>
      
        {/* Services Grid */}
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: { xs: 2, sm: 3 },
            width: '100%',
          }}
        >
          {allServices.map((service: Service) => {
            const selectedService = services.find((s: Service) => s.id === service.id);
            const isSelected = selectedService?.quantity && selectedService.quantity > 0;

            return (
              <Card 
                key={service.id} 
                sx={{ 
                  padding: { xs: 2, sm: 3 },
                  borderRadius: '20px',
                  background: isSelected 
                    ? '#f8f9fa'
                    : '#ffffff',
                  border: isSelected 
                    ? '2px solid #2c3e50' 
                    : '1px solid #ecf0f1',
                  boxShadow: isSelected 
                    ? '0 8px 32px rgba(44, 62, 80, 0.15)' 
                    : '0 4px 16px rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': isSelected ? {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: '#2c3e50',
                  } : {},
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Box
                    component="img"
                    src={getServiceImage(service.id)}
                    alt={service.name}
                    sx={{
                      width: '100%',
                      height: { xs: '180px', sm: '200px' },
                      objectFit: 'cover',
                      borderRadius: '16px',
                      mb: 2,
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 700,
                        fontSize: { xs: '1.125rem', sm: '1.25rem' },
                        color: '#1a202c',
                      }}
                    >
                      {service.name}
                    </Typography>
                    <Chip
                      label={`${service.price} ден.`}
                      sx={{
                        background: '#2c3e50',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                      }}
                    />
                  </Box>
                  <Typography 
                    variant="body2"
                    sx={{
                      fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                      color: '#64748b',
                      lineHeight: 1.6,
                      mb: 2,
                    }}
                  >
                    {service.description}
                  </Typography>
                </Box>

                {isSelected && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      p: 1.5,
                      background: '#2c3e50',
                      borderRadius: '12px',
                      color: 'white',
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, fontSize: '1.125rem' }}>
                      Количина: {selectedService.quantity}
                    </Typography>
                  </Box>
                )}

                {!isSelected ? (
                  <Button
                    variant="contained"
                    onClick={() => updateServiceQuantity(service.id, true)} 
                    fullWidth
                    startIcon={<AddIcon />}
                    sx={{
                      background: '#2c3e50',
                      borderRadius: '12px',
                      padding: { xs: '12px', sm: '14px' },
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      fontWeight: 600,
                      textTransform: 'none',
                      boxShadow: '0 4px 16px rgba(44, 62, 80, 0.2)',
                      '&:hover': { 
                        background: '#34495e',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(44, 62, 80, 0.3)',
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    Додади услуга
                  </Button>
                ) : (
                  <Box 
                    display="flex" 
                    gap={1.5}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => updateServiceQuantity(service.id, false)} 
                      fullWidth
                      startIcon={<RemoveIcon />}
                      sx={{
                        borderColor: '#2c3e50',
                        color: '#2c3e50',
                        borderRadius: '12px',
                        padding: { xs: '12px', sm: '14px' },
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        fontWeight: 600,
                        textTransform: 'none',
                        '&:hover': { 
                          backgroundColor: '#f8f9fa',
                          borderColor: '#34495e',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Намали
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => updateServiceQuantity(service.id, true)} 
                      fullWidth
                      startIcon={<AddIcon />}
                      sx={{
                        background: '#2c3e50',
                        borderRadius: '12px',
                        padding: { xs: '12px', sm: '14px' },
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        fontWeight: 600,
                        textTransform: 'none',
                        boxShadow: '0 4px 16px rgba(44, 62, 80, 0.2)',
                        '&:hover': { 
                          background: '#34495e',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 24px rgba(44, 62, 80, 0.3)',
                        },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      Зголеми
                    </Button>
                  </Box>
                )}
              </Card>
            );
          })}
        </Box>

        {/* Next Button */}
        <Box 
          sx={{ 
            position: 'sticky',
            bottom: { xs: 16, sm: 24 },
            zIndex: 10,
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate('/schedule')}
            fullWidth
            disabled={services.length === 0}
            sx={{
              background: '#2c3e50',
              borderRadius: '16px',
              padding: { xs: '16px', sm: '20px' },
              fontSize: { xs: '1rem', sm: '1.125rem' },
              fontWeight: 700,
              textTransform: 'none',
              letterSpacing: '0.5px',
              color: 'white',
              boxShadow: '0 4px 16px rgba(44, 62, 80, 0.2)',
              '&:hover': { 
                background: '#34495e',
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(44, 62, 80, 0.3)',
              },
              '&:disabled': {
                background: '#e2e8f0',
                color: '#94a3b8',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            Продолжи со избор на датум →
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ServicePicker;
