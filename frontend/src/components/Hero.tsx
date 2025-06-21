import { Box, Typography, Container } from '@mui/material';

const Hero = () => {
  return (
    <Box
      sx={{
        height: '520px',
        backgroundImage: 'url(/hero-photo.jpg)',
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
