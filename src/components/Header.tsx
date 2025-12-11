import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from "react-router-dom";
import SparklesIcon from '@mui/icons-material/AutoAwesome';
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import headerTitles from "../utils/headerTitles";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          background: '#ffffff',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #ecf0f1',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        }}
      >
        <Toolbar 
          sx={{ 
            minHeight: { xs: '70px', sm: '80px' },
            px: { xs: 2, sm: 3 },
            maxWidth: '1400px',
            mx: 'auto',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mr: 2,
            }}
          >
            <Box
              sx={{
                background: '#f8f9fa',
                borderRadius: '12px',
                p: 0.75,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SparklesIcon sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' }, color: '#2c3e50' }} />
            </Box>
            {pathname !== '/' && (
              <IconButton 
                size="medium" 
                color="inherit" 
                aria-label="back" 
                onClick={() => navigate(-1)}
                sx={{ 
                  background: '#f8f9fa',
                  color: '#2c3e50',
                  '&:hover': { 
                    background: '#ecf0f1',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <ArrowBackIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
              </IconButton>
            )}
          </Box>
          
          <Typography 
            variant="h6" 
            sx={{ 
              flexGrow: 1,
              fontSize: { xs: '1rem', sm: '1.25rem' },
              fontWeight: 700,
              color: '#2c3e50',
              letterSpacing: '0.5px',
            }}
          >
            {headerTitles[pathname.replace(/\/$/, '')] || 'нека блеска'}
          </Typography>
          
          <Typography 
            variant="body2"
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              fontWeight: 500,
              color: '#7f8c8d',
              display: { xs: 'none', md: 'block' },
              letterSpacing: '1px',
            }}
          >
            нека блеска
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
