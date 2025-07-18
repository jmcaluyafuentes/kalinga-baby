import { Box, Typography, Container } from '@mui/material';

const Hero = () => {
  return (
    <Box
      sx={{
        height: '500px',
        backgroundImage: 'url(https://images.unsplash.com/photo-1532441390534-47546aae8483?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fHBhcmVudGluZyUyMGFwcCUyMGJhY2tncm91bmR8ZW58MHwwfDB8fHww)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textShadow: '0 0 10px rgba(0,0,0,0.7)',
      }}
    >
      <Container>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Welcome to Kalinga Baby
        </Typography>
        <Typography variant="h5" align="center">
          Your all-in-one parenting assistant
        </Typography>
      </Container>
    </Box>
  );
};

export default Hero;
