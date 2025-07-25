import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";

import { useAppContext } from "../context/AppContext";

const Schedule = () => {
  const { calendarValue, setCalendarValue } = useAppContext();
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={2}>
      <img src="./vacuum.jpg" height={150} alt="Vacuum Cleaner" />
      <Typography variant="body1" marginTop={3} textAlign="center" sx={{ fontWeight: 300 }}>
        Изберете датум и време за хемиско чистење
      </Typography>
      
      <Box marginTop={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={calendarValue}
            onChange={(newValue) => setCalendarValue(newValue)}
            sx={{
              borderRadius: '10px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          />
        </LocalizationProvider>
      </Box>
      
      <Button
        variant="contained"
        onClick={() => navigate('/summary')}
        sx={{
          marginTop: 10,
          padding: '12px',
          backgroundColor: '#2e58ffff',
          '&:hover': { backgroundColor: '#1a318cff' },
          textTransform: 'uppercase',
          borderRadius: '10px',
          width: '100%',
        }}
      >
        Следно
      </Button>
    </Box>
  );
};

export default Schedule;