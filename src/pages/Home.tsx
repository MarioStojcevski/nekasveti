import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding={2}
    >
      <Box marginBottom={2}>
        <Typography 
          variant="h6" 
          textAlign="center" 
          color="text.primary" 
          marginBottom={2} 
          sx={{
            fontWeight: 300,
            maxWidth: 600,
            lineHeight: 1.5,
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
          }}
        >
          Закажи хемиско чистење за твојот дом, канцеларија или автомобил за 2 минути. Нашите експерти ќе го направат тоа со задоволство.
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        marginTop={15}
        marginBottom={5}
      >
        <img src="./guy.jpg" alt="Cleaning Service" height={300} />
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        sx={{
          marginTop: 'auto',
          paddingBottom: 2,
        }}
      >
        <Button
          onClick={() => navigate('/services')}
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            padding: '12px',
            maxWidth: 300,
            backgroundColor: '#2e58ffff',
            '&:hover': { backgroundColor: '#1a318cff' },
            borderRadius: '10px',
            textTransform: 'uppercase',
          }}
        >
          Започни
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
