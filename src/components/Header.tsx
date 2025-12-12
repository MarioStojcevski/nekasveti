import { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useLocation, useNavigate } from "react-router-dom";
import SparklesIcon from '@mui/icons-material/AutoAwesome';
import { AppBar, Box, IconButton, Toolbar, Typography, Badge } from "@mui/material";

import headerTitles from "../utils/headerTitles";
import { useAppContext } from "../context/AppContext";
import CartModal from "./CartModal";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { services } = useAppContext();
  const [cartOpen, setCartOpen] = useState(false);

  const totalItems = services.reduce(
    (total, service) => total + (service.quantity || 1),
    0
  );

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
              mr: 2,
            }}
          >
            нека блеска
          </Typography>

          <Badge
            badgeContent={totalItems}
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                background: '#e74c3c',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.75rem',
              },
            }}
          >
            <IconButton
              onClick={() => setCartOpen(true)}
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
              <ShoppingCartIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
            </IconButton>
          </Badge>
        </Toolbar>
      </AppBar>
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
    </Box>
  );
};

export default Header;
