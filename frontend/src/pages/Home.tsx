import { useEffect } from 'react';
import Hero from '../components/Hero';
import { Container, Typography, Card, CardActionArea, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const features = [
  { title: 'Food Tracker', path: '/food' },
  { title: 'Sleep Tracker', path: '/sleep' },
  { title: 'Milestones', path: '/milestones' },
  { title: 'Baby Items', path: '/items' },
  { title: 'Appointments', path: '/appointments' },
  { title: 'Todo List', path: '/todo' },
  { title: 'Tips', path: '/tips' },
  { title: 'Blog', path: '/blog' },
];

const Home = () => {
  // Pre-warm the backend (Render free tier) by sending a ping request on initial load
  useEffect(() => {
    axios.get(`${apiUrl}/ping`).catch(() => {});
  }, []);

  return (
    <>
      <Hero />
      <Container sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom>Explore Features</Typography>
        <Grid container spacing={3} mt={2}>
          {features.map(({ title, path }) => (
            // @ts-ignore
            <Grid item xs={12} sm={6} md={4} key={title}>
              <Card>
                <CardActionArea component={Link} to={path}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontSize: '18px'}}>{title}</Typography>
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
