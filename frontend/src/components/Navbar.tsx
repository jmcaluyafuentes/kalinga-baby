import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  IconButton,
  Collapse,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Food Tracker', path: '/food' },
  { label: 'About', path: '/about' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const authButtons = token ? (
    <Button
      color="inherit"
      onClick={handleLogout}
      sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', textTransform: 'none' }}
    >
      Logout
    </Button>
  ) : (
    <>
      <Button
        color="inherit"
        component={Link}
        to="/login"
        sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', textTransform: 'none' }}
      >
        Login
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/register"
        sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', textTransform: 'none' }}
      >
        Register
      </Button>
    </>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: '#f8f9fa',
          color: '#333',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          pt: '5px',
        }}
        elevation={1}
      >
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap', mb: '8px' }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontFamily: 'Sunshiney, sans-serif',
              fontSize: '30px',
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            Kalinga Baby
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Stack direction="row" spacing={2}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  color="inherit"
                  component={Link}
                  to={item.path}
                  sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', textTransform: 'none' }}
                >
                  {item.label}
                </Button>
              ))}
              {authButtons}
            </Stack>
          </Box>

          {/* Hamburger icon (mobile only) */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={() => setMenuOpen(!menuOpen)} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Mobile dropdown menu */}
          <Box
            sx={{
              position: 'absolute',
              top: '48px',
              left: 0,
              width: '100%',
              zIndex: 1300,
              display: { xs: 'block', md: 'none' },
            }}
          >
            <Collapse in={menuOpen} timeout="auto" unmountOnExit>
              <Stack
                spacing={1}
                sx={{
                  px: 2,
                  py: 1,
                  backgroundColor: '#f8f9fa',
                  boxShadow: 1,
                }}
              >
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    sx={{
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      fontFamily: 'Poppins, sans-serif',
                      color: '#333',
                      fontSize: '18px',
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                {/* Auth buttons in mobile menu */}
                {token ? (
                  <Button
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    sx={{
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      fontFamily: 'Poppins, sans-serif',
                      color: '#333',
                      fontSize: '18px',
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button
                      component={Link}
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      sx={{
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        fontFamily: 'Poppins, sans-serif',
                        color: '#333',
                        fontSize: '18px',
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      component={Link}
                      to="/register"
                      onClick={() => setMenuOpen(false)}
                      sx={{
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        fontFamily: 'Poppins, sans-serif',
                        color: '#333',
                        fontSize: '18px',
                      }}
                    >
                      Register
                    </Button>
                  </>
                )}
              </Stack>
            </Collapse>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
