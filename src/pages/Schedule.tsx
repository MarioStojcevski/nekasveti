import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar, TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import dayjs from 'dayjs';

import { useAppContext } from "../context/AppContext";
import AddressMap from "../components/AddressMap";

const Schedule = () => {
  const { calendarValue, setCalendarValue, timeValue, setTimeValue, location, setLocation } = useAppContext();
  const navigate = useNavigate();

  const handleTimeChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      // Round minutes to nearest 30 (00 or 30)
      const minutes = dayjs(newValue).minute();
      let adjustedTime = dayjs(newValue);
      
      if (minutes < 15) {
        adjustedTime = adjustedTime.minute(0).second(0);
      } else if (minutes < 45) {
        adjustedTime = adjustedTime.minute(30).second(0);
      } else {
        // Round to next hour (00 minutes)
        adjustedTime = adjustedTime.add(1, 'hour').minute(0).second(0);
      }
      
      setTimeValue(adjustedTime);
    } else {
      setTimeValue(null);
    }
  };

  return (
    <Container maxWidth="md" sx={{ width: '100%', py: { xs: 1, sm: 2 } }}>
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        width="100%"
        sx={{ gap: { xs: 2, sm: 2.5 } }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', width: '100%', mb: { xs: -1, sm: 0 } }}>
          <Typography 
            variant="h3"
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', lg: '2.25rem' },
              fontWeight: 800,
              color: '#2c3e50',
              mb: 1,
            }}
          >
            Избери Датум
          </Typography>
          <Typography 
            variant="body1"
            sx={{
              fontSize: { xs: '0.8125rem', sm: '0.875rem' },
              color: '#64748b',
            }}
          >
            Изберете датум и време за хемиско чистење
          </Typography>
        </Box>

        {/* Calendar, Time Picker, and Map */}
        <Box 
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: { xs: 2, lg: 3 },
            alignItems: { xs: 'stretch', lg: 'flex-start' },
          }}
        >
          {/* Address Map - Left side on desktop, last on mobile */}
          <Box
            sx={{
              order: { xs: 3, lg: 1 },
              flex: { xs: '1', lg: '1' },
              p: { xs: 1.5, sm: 2 },
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #ecf0f1',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
            }}
          >
            <AddressMap location={location} onLocationChange={setLocation} />
          </Box>

          {/* Right side - Calendar and Time Picker stacked */}
          <Box
            sx={{
              order: { xs: 1, lg: 2 },
              flex: { xs: '1', lg: '0 0 380px' },
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 2, lg: 2.5 },
            }}
          >
            {/* Calendar */}
            <Box 
              sx={{
                display: 'flex',
                justifyContent: 'center',
                p: { xs: 1.5, sm: 2 },
                background: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #ecf0f1',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={calendarValue}
                  onChange={(newValue) => setCalendarValue(newValue)}
                  disablePast
                  sx={{
                    width: '100%',
                    '& .MuiPickersCalendarHeader-root': {
                      padding: { xs: '4px 2px', sm: '8px 4px' },
                      mb: 1,
                    },
                    '& .MuiPickersCalendarHeader-label': {
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      fontWeight: 700,
                      color: '#1a202c',
                    },
                    '& .MuiDayCalendar-weekContainer': {
                      margin: { xs: '1px', sm: '2px' },
                    },
                    '& .MuiPickersDay-root': {
                      fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                      width: { xs: '36px', sm: '40px' },
                      height: { xs: '36px', sm: '40px' },
                      borderRadius: '10px',
                      fontWeight: 600,
                      '&:hover': {
                        background: '#f8f9fa',
                      },
                      '&.Mui-selected': {
                      background: '#2c3e50',
                      color: 'white',
                      fontWeight: 700,
                      '&:hover': {
                        background: '#34495e',
                      },
                      },
                    },
                    '& .MuiDayCalendar-weekDayLabel': {
                      fontSize: { xs: '0.6875rem', sm: '0.75rem' },
                      fontWeight: 700,
                      color: '#64748b',
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>

            {/* Time Picker */}
            <Box 
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: { xs: 1.5, sm: 2 },
                background: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #ecf0f1',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <Box
                  sx={{
                    p: 0.75,
                    borderRadius: '10px',
                    background: '#2c3e50',
                    mr: 1.5,
                  }}
                >
                  <AccessTimeIcon sx={{ color: 'white', fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
                </Box>
                <Typography 
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '0.9375rem', sm: '1rem' },
                    color: '#1a202c',
                  }}
                >
                  Избери Време
                </Typography>
              </Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  value={timeValue}
                  onChange={handleTimeChange}
                  views={['hours', 'minutes']}
                  minutesStep={30}
                  ampm={false}
                  format="HH:mm"
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-root': {
                      borderRadius: '12px',
                      fontSize: { xs: '0.9375rem', sm: '1rem' },
                      fontWeight: 600,
                      '&:hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#2c3e50',
                        },
                      },
                      '&.Mui-focused': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#2c3e50',
                          borderWidth: '2px',
                        },
                      },
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ecf0f1',
                    },
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Box>
        </Box>
      
        {/* Next Button */}
        <Box
          sx={{
            width: '100%',
            mt: { xs: 1, sm: 1.5 },
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate('/summary')}
            disabled={!calendarValue || !timeValue || !location}
            fullWidth
            startIcon={<CalendarTodayIcon />}
            sx={{
              background: '#2c3e50',
              borderRadius: '16px',
              padding: { xs: '14px', sm: '16px' },
              fontSize: { xs: '0.9375rem', sm: '1rem' },
              fontWeight: 700,
              textTransform: 'none',
              letterSpacing: '0.5px',
              color: 'white',
              boxShadow: '0 4px 16px rgba(44, 62, 80, 0.2)',
              '&:hover': { 
                background: '#34495e',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(44, 62, 80, 0.3)',
              },
              '&:disabled': {
                background: '#e2e8f0',
                color: '#94a3b8',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            Продолжи кон преглед →
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Schedule;