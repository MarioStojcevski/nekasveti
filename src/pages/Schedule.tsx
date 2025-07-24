import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";

import { useAppContext } from "../context/AppContext";

const Schedule = () => {
  const {calendarValue, setCalendarValue} = useAppContext();
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <img src="./vacuum.jpg" height={300} />
      <Typography variant="body1" marginTop={2}>
        Изберете датум и време за хемиско чистење
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar value={calendarValue} onChange={(newValue) => setCalendarValue(newValue)} />
      </LocalizationProvider>
      <Button variant="contained" onClick={() => navigate('/summary')} sx={{ marginTop: 5}}>Следно</Button>
    </Box>
  );
};

export default Schedule;