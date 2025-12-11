import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ width: '100%', py: { xs: 2, sm: 4 } }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        sx={{
          minHeight: { xs: 'calc(100vh - 150px)', sm: 'calc(100vh - 200px)' },
          gap: { xs: 4, sm: 6 },
        }}
      >
        {/* Hero Text Section */}
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: '800px',
            px: { xs: 2, sm: 3 },
            animation: 'fadeInUp 0.8s ease-out',
          }}
        >
          <Typography 
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
              fontWeight: 800,
              color: '#2c3e50',
              mb: 3,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            Професионално Хемиско Чистење
          </Typography>
          
          <Typography 
            variant="h5"
            sx={{
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              fontWeight: 400,
              color: '#7f8c8d',
              lineHeight: 1.7,
              mb: 4,
            }}
          >
            Закажи хемиско чистење за твојот дом, канцеларија или автомобил за 2 минути. 
            Нашите експерти ќе го направат тоа со задоволство.
          </Typography>
        </Box>

        {/* Image Section */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: { xs: '300px', sm: '500px', md: '600px' },
            mb: 2,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '-20px',
              left: '-20px',
              right: '20px',
              bottom: '20px',
              background: '#f8f9fa',
              borderRadius: '24px',
              zIndex: 0,
            }}
          />
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&q=80"
            alt="Professional Chemical Cleaning Service"
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: '24px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              objectFit: 'cover',
              position: 'relative',
              zIndex: 1,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
              },
            }}
          />
        </Box>

        {/* CTA Button */}
        <Box
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', sm: '400px' },
            px: { xs: 2, sm: 0 },
          }}
        >
          <Button
            onClick={() => navigate('/services')}
            variant="contained"
            fullWidth
            sx={{
              padding: { xs: '16px 32px', sm: '20px 40px' },
              background: '#2c3e50',
              borderRadius: '16px',
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
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            Започни сега →
          </Button>
        </Box>

        {/* Features */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: { xs: 2, sm: 3 },
            width: '100%',
            maxWidth: '900px',
            mt: { xs: 2, sm: 4 },
            px: { xs: 2, sm: 0 },
          }}
        >
          {[
            { icon: '⚡', text: 'Брзо и ефикасно' },
            { icon: '✨', text: 'Професионално' },
            { icon: '🎯', text: 'Резултати гарантирани' },
          ].map((feature, index) => (
            <Box
              key={index}
              sx={{
                textAlign: 'center',
                p: 2,
                background: '#f8f9fa',
                borderRadius: '16px',
                border: '1px solid #ecf0f1',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                  borderColor: '#bdc3c7',
                },
              }}
            >
              <Typography sx={{ fontSize: '2rem', mb: 1 }}>{feature.icon}</Typography>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#2c3e50' }}>
                {feature.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
