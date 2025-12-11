import { Box, Button, Typography, Container, Card, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { useAppContext } from "../context/AppContext";
import dayjs from "dayjs";

const Summary = () => {
  const navigate = useNavigate();
  const { services, calendarValue, timeValue } = useAppContext();
  const formattedDate = calendarValue ? dayjs(calendarValue).format('DD MMMM YYYY') : null;
  const formattedTime = timeValue ? dayjs(timeValue).format('HH:mm') : null;
  const totalPrice = services.reduce((total, service) => total + (service.price * (service.quantity || 1)), 0);

  return (
    <Container maxWidth="md" sx={{ width: '100%', py: { xs: 2, sm: 4 } }}>
      <Box 
        sx={{ 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography 
            variant="h3"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2.5rem' },
              fontWeight: 800,
              color: '#2c3e50',
              mb: 1,
            }}
          >
            Преглед на Резервација
          </Typography>
          <Typography 
            variant="body1"
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' },
              color: '#64748b',
            }}
          >
            Проверете ги деталите пред да ја потврдите резервацијата
          </Typography>
        </Box>

        {/* Services Card */}
        <Card
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: '24px',
            background: '#ffffff',
            border: '1px solid #ecf0f1',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: '12px',
                background: '#2c3e50',
                mr: 2,
              }}
            >
              <CheckCircleIcon sx={{ color: 'white', fontSize: '1.5rem' }} />
            </Box>
            <Typography 
              variant="h5"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                color: '#1a202c',
              }}
            >
              Избрани Услуги
            </Typography>
          </Box>

          {services.length === 0 ? (
            <Typography 
              variant="body1"
              sx={{
                fontSize: { xs: '0.875rem', sm: '1rem' },
                textAlign: 'center',
                color: '#94a3b8',
                py: 4,
              }}
            >
              Нема избрани услуги.
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {services.map((service, index) => (
                <Box key={service.id}>
                  <Box 
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      p: 2,
                      borderRadius: '12px',
                      background: '#f8f9fa',
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600,
                          fontSize: { xs: '1rem', sm: '1.125rem' },
                          mb: 0.5,
                          color: '#1a202c',
                        }}
                      >
                        {service.name}
                      </Typography>
                      <Typography 
                        variant="body2"
                        sx={{
                          fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                          color: '#64748b',
                        }}
                      >
                        Количество: {service.quantity} × {service.price} ден.
                      </Typography>
                    </Box>
                    <Typography 
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '1rem', sm: '1.125rem' },
                        color: '#2c3e50',
                        ml: 2,
                      }}
                    >
                      {service.price * (service.quantity || 1)} ден.
                    </Typography>
                  </Box>
                  {index < services.length - 1 && <Divider sx={{ my: 2 }} />}
                </Box>
              ))}
            </Box>
          )}
        </Card>

        {/* Date and Time Card */}
        <Card
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: '24px',
            background: '#ffffff',
            border: '1px solid #ecf0f1',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Date */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: '12px',
                  background: '#2c3e50',
                  mr: 2,
                }}
              >
                <CalendarTodayIcon sx={{ color: 'white', fontSize: '1.5rem' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography 
                  variant="body2"
                  sx={{
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    color: '#64748b',
                    mb: 0.5,
                  }}
                >
                  Датум на хемиско чистење
                </Typography>
                <Typography 
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: '1rem', sm: '1.125rem' },
                    color: '#1a202c',
                  }}
                >
                  {formattedDate || 'Датумот не е избран'}
                </Typography>
              </Box>
            </Box>

            {/* Time */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: '12px',
                  background: '#2c3e50',
                  mr: 2,
                }}
              >
                <AccessTimeIcon sx={{ color: 'white', fontSize: '1.5rem' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography 
                  variant="body2"
                  sx={{
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    color: '#64748b',
                    mb: 0.5,
                  }}
                >
                  Време на хемиско чистење
                </Typography>
                <Typography 
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: '1rem', sm: '1.125rem' },
                    color: '#1a202c',
                  }}
                >
                  {formattedTime || 'Времето не е избрано'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* Total Price Card */}
        <Card
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: '24px',
            background: '#2c3e50',
            boxShadow: '0 8px 32px rgba(44, 62, 80, 0.2)',
            color: 'white',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AttachMoneyIcon sx={{ fontSize: '2rem', mr: 1.5 }} />
              <Typography 
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                }}
              >
                Вкупна цена
              </Typography>
            </Box>
            <Typography 
              variant="h4"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.75rem', sm: '2.25rem' },
              }}
            >
              {totalPrice} ден.
            </Typography>
          </Box>
        </Card>

        {/* Confirm Button */}
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
            fullWidth
            onClick={() => navigate('/')}
            disabled={services.length === 0 || !formattedDate || !formattedTime}
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
            Потврди резервација ✓
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Summary;
