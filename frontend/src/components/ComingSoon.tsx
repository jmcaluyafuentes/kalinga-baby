import { Box, Typography, Button } from "@mui/material";
import { Link } from 'react-router-dom';

const ComingSoon = ({ title }: { title: string }) => (
  <Box sx={{ textAlign: "center", py: 10 }}>
    <Typography variant="h5" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body1" color="text.secondary">
      This page is under construction. Please check back soon.
    </Typography>
    <Button component={Link} to="/" variant="outlined" sx={{ mt: 4 }}>Back</Button>
  </Box>
);

export default ComingSoon;
