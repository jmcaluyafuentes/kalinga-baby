import { Box, Container, Typography, Grid, Card, CardActionArea, CardContent } from '@mui/material';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const features = [
  { title: 'Food Tracker', path: '/food' },
  { title: 'Sleep Tracker', path: '/sleep' },
  { title: 'Milestones', path: '/milestones' },
  { title: 'Appointments', path: '/appointments' },
  { title: 'Todo List', path: '/todo' },
  { title: 'Blog', path: '/blog' },
];

const Home = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: '#fce4ec', py: 6, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>Kalinga Baby</Typography>
        <Typography variant="h6">Your all-in-one parenting assistant</Typography>
      </Box>

      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Explore Features</Typography>
        <Grid container spacing={3}>
          {features.map(({ title, path }) => (
            <Grid item xs={12} sm={6} md={4} key={title}>
              <Card>
                <CardActionArea component={Link} to={path}>
                  <CardContent>
                    <Typography variant="h6">{title}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
