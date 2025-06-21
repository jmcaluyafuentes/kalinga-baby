import { Container, Typography, Box } from '@mui/material';

const About = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          About Kalinga Baby
        </Typography>
        <Typography variant="body1" paragraph>
          Kalinga Baby is an all-in-one parenting app designed to support parents through pregnancy, baby care, milestones, and more.
        </Typography>
        <Typography variant="body1" paragraph>
          The name <strong>Kalinga</strong> means <strong>care</strong> or <strong>nurture</strong>, reflecting the app’s mission to lovingly support parents and babies every step of the way.
        </Typography>
        <Typography variant="body1" paragraph>
          Starting with a feature to track and summarize a baby’s daily food intake, the app will expand to include developmental milestones, health logs, and other helpful parenting tools.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
