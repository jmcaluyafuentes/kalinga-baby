import { Container, Typography, Box, Divider } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 8 }}>
      <Box textAlign="center" mb={5}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
          About <span style={{ color: '#1976d2' }}>Kalinga Baby</span>
        </Typography>
        <Typography variant="h6" color="text.secondary">
          A parenting companion built with love — for our family and yours.
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Box>
        <Typography variant="body1" paragraph>
          <strong>Kalinga Baby</strong> is an all-in-one parenting app designed to support parents through pregnancy,
          baby care, developmental milestones, and more.
        </Typography>
        <Typography variant="body1" paragraph>
          The name <strong>Kalinga</strong> means <strong>“care”</strong> or <strong>“nurture”</strong> in Bisaya,
          reflecting the app’s mission to lovingly support parents and babies every step of the way.
        </Typography>
        <Typography variant="body1" paragraph>
          Starting with a feature to log and summarize a baby’s daily food intake, the app is growing to include sleep
          tracking, milestone logging, health and vaccination records, and helpful parenting resources.
        </Typography>
      </Box>

      <Box mt={6}>
        <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
          Why I Built Kalinga Baby
        </Typography>
        <Typography variant="body1" paragraph>
          As a new parent, I wanted a simple and reliable way to track my baby’s daily routines and important moments.
          At the same time, I saw this as a meaningful project where I could apply and grow my skills in full-stack web
          development.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Kalinga Baby</strong> is the result of that vision — a personal tool turned portfolio piece, built
          with React, TypeScript, Material UI, Node.js, and MongoDB.
        </Typography>
        <Typography variant="body1" paragraph>
          It’s incredibly convenient to have all our baby’s important information in one place that is accessible whenever and
          wherever we are. My wife agrees this app has been a great help in our parenting journey.
        </Typography>
        <Typography variant="body1" paragraph>
          I’ve also seen how valuable this app can be to others. Friends who are expecting or have just welcomed a baby
          often ask us about our experiences — and now, they can refer to this app for helpful insights and practical
          guidance.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
