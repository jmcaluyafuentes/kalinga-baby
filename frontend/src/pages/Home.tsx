import Hero from '../components/Hero';
import { Container, Typography, Grid, Card, CardActionArea, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

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
  return (
    <>
      <Hero />
      <Container sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom>Explore Features</Typography>
        <Grid container spacing={3} mt={2}>
          {features.map(({ title, path }) => (
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
