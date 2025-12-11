import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar, TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { useAppContext } from "../context/AppContext";

const Schedule = () => {
  const { calendarValue, setCalendarValue, timeValue, setTimeValue } = useAppContext();
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ width: '100%', py: { xs: 2, sm: 4 } }}>
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        width="100%"
        sx={{ gap: 4 }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', width: '100%' }}>
          <Typography 
            variant="h3"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2.5rem' },
              fontWeight: 800,
              color: '#2c3e50',
              mb: 2,
            }}
          >
            Избери Датум
          </Typography>
          <Typography 
            variant="body1"
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' },
              color: '#64748b',
            }}
          >
            Изберете датум и време за хемиско чистење
          </Typography>
        </Box>

        {/* Image */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: { xs: '250px', sm: '350px' },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '-15px',
              left: '-15px',
              right: '15px',
              bottom: '15px',
              background: '#f8f9fa',
              borderRadius: '20px',
              zIndex: 0,
            }}
          />
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&q=80"
            alt="Chemical Cleaning Equipment"
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              objectFit: 'cover',
              position: 'relative',
              zIndex: 1,
            }}
          />
        </Box>
      
        {/* Calendar and Time Picker */}
        <Box 
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 3, md: 4 },
            alignItems: { xs: 'stretch', md: 'flex-start' },
          }}
        >
          {/* Calendar */}
          <Box 
            sx={{
              flex: { xs: '1', md: '1.2' },
              display: 'flex',
              justifyContent: 'center',
              p: { xs: 2, sm: 3 },
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
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
                  maxWidth: '500px',
                  '& .MuiPickersCalendarHeader-root': {
                    padding: { xs: '8px 4px', sm: '16px 8px' },
                    mb: 2,
                  },
                  '& .MuiPickersCalendarHeader-label': {
                    fontSize: { xs: '1rem', sm: '1.125rem' },
                    fontWeight: 700,
                    color: '#1a202c',
                  },
                  '& .MuiDayCalendar-weekContainer': {
                    margin: { xs: '2px', sm: '4px' },
                  },
                  '& .MuiPickersDay-root': {
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    width: { xs: '40px', sm: '48px' },
                    height: { xs: '40px', sm: '48px' },
                    borderRadius: '12px',
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
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
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
              flex: { xs: '1', md: '0.8' },
              display: 'flex',
              flexDirection: 'column',
              p: { xs: 2, sm: 3 },
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              border: '1px solid #ecf0f1',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: '12px',
                  background: '#2c3e50',
                  mr: 1.5,
                }}
              >
                <AccessTimeIcon sx={{ color: 'white', fontSize: '1.5rem' }} />
              </Box>
              <Typography 
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  color: '#1a202c',
                }}
              >
                Избери Време
              </Typography>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                value={timeValue}
                onChange={(newValue) => setTimeValue(newValue)}
                sx={{
                  width: '100%',
                  '& .MuiInputBase-root': {
                    borderRadius: '12px',
                    fontSize: { xs: '1rem', sm: '1.125rem' },
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
      
        {/* Next Button */}
        <Box
          sx={{
            width: '100%',
            position: 'sticky',
            bottom: { xs: 16, sm: 24 },
            zIndex: 10,
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate('/summary')}
            disabled={!calendarValue || !timeValue}
            fullWidth
            startIcon={<CalendarTodayIcon />}
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
            Продолжи кон преглед →
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Schedule;