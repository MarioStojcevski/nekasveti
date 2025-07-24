import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import dayjs from "dayjs";

const Summary = () => {
  const navigate = useNavigate();
  const { services, calendarValue } = useAppContext();
  const formattedDate = dayjs(calendarValue).format('YYYY-MM-DD');

  return (
    <Box>
      <Typography variant="h4" textAlign="center" marginTop={5}>
        Резиме на услугите
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" marginTop={3} border={1} borderColor="black">
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
      <Box display="flex" flexDirection="column" alignItems="center" marginTop={3} border={1} borderColor="black">
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

      <Button variant="contained" fullWidth onClick={() => navigate('/')} >Закажи</Button>
    </Box>
  )
};

export default Summary;