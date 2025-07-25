import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "../context/AppContext";
import dayjs from "dayjs";

const Summary = () => {
  const navigate = useNavigate();
  const { services, calendarValue } = useAppContext();
  const formattedDate = dayjs(calendarValue).format('YYYY-MM-DD');

  return (
    <Box padding={2}>
      <Typography variant="h4" textAlign="center" marginTop={5} sx={{ fontWeight: 600 }}>
        Резиме на услугите
      </Typography>

      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        marginTop={3} 
        border={1} 
        borderColor="black" 
        borderRadius="10px" 
        padding={2}
        bgcolor="#dce4ffff"
        boxShadow="0px 8px 20px rgba(0, 0, 0, 0.1)"
      >
        {services.length === 0 ? (
          <Typography variant="body1">Нема избрани услуги.</Typography>
        ) : (
          services.map((service) => (
            <Box key={service.id} marginBottom={2} textAlign="center">
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                {service.name}
              </Typography>
              <Typography variant="body1">Количество: {service.quantity}</Typography>
              <Typography variant="body1">Цена: {service.price} ден.</Typography>
            </Box>
          ))
        )}
      </Box>

      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        marginTop={3} 
        border={1} 
        borderColor="black" 
        borderRadius="10px" 
        padding={2} 
        bgcolor="#dce4ffff"
        boxShadow="0px 8px 20px rgba(0, 0, 0, 0.1)"
      >
        {formattedDate ? (
          <Typography variant="body1" marginTop={2}>
            Датум на хемиско чистење: {formattedDate}
          </Typography>
        ) : (
          <Typography variant="body1" marginTop={2}>
            Датумот не е избран.
          </Typography>
        )}
      </Box>

      <Typography variant="h5" textAlign="center" marginTop={3}>
        Вкупна цена: {services.reduce((total, service) => total + (service.price * (service.quantity || 1)), 0)} ден.
      </Typography>

      <Box display="flex" justifyContent="center" marginTop={4}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            maxWidth: 300,
            marginTop: 15,
            backgroundColor: '#2e58ffff',
            '&:hover': { backgroundColor: '#1a318cff' },
            textTransform: 'uppercase',
            padding: '12px',
            borderRadius: '10px',
            fontSize: '16px',
          }}
          onClick={() => navigate('/')}
        >
          Закажи
        </Button>
      </Box>
    </Box>
  );
};

export default Summary;
