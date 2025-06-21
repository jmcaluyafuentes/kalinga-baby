import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">Kalinga Baby</Typography>
        <Stack direction="row" spacing={2}>
          <Button component={Link} to="/">Home</Button>
          <Button component={Link} to="/food">Food Tracker</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
