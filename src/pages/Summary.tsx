import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Summary = () => {
  const navigate = useNavigate();
  const { services } = useAppContext();

  return (
    <Box>
      <Typography variant="h4" textAlign="center" marginTop={5}>
        Резиме на услугите
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" marginTop={3}>
        {services.length === 0 ? (
          <Typography variant="body1">Нема избрани услуги.</Typography>
        ) : (
          services.map((service) => (
            <Box key={service.id} marginBottom={2} textAlign="center">
              <Typography variant="h6">{service.name}</Typography>
              <Typography variant="body1">Количество: {service.quantity}</Typography>
              <Typography variant="body1">Цена: {service.price} ден.</Typography>
            </Box>
          ))
        )}
      </Box>
      <Typography variant="h5" textAlign="center" marginTop={3}>
        Вкупна цена: {services.reduce((total, service) => total + (service.price * (service.quantity || 1)), 0)} ден.
      </Typography>

      <Button variant="contained" fullWidth onClick={() => navigate('/')} >Done</Button>
    </Box>
  )
};

export default Summary;