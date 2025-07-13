import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  IconButton,
  Collapse,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Food Tracker", path: "/food" },
  { label: "About", path: "/about" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ bgcolor: "#f8f9fa", color: "#333" }}
        elevation={1}
      >
        <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontFamily: "Sunshiney, sans-serif",
              fontSize: "30px",
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            Kalinga Baby
          </Typography>

          {/* Desktop */}
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Stack direction="row" spacing={2}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{
                    textTransform: "none",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "16px",
                    color: "#0e59a4",
                  }}
                >
                  {item.label}
                </Button>
              ))}
              {!token ? (
                <Button
                  sx={{
                    textTransform: "none",
                    fontSize: "16px",
                    color: "#0e59a4",
                  }}
                  onClick={() => setAuthModalOpen(true)}
                >
                  Login
                </Button>
              ) : (
                <Button 
                  sx={{
                    textTransform: "none",
                    fontSize: "16px",
                    color: "#0e59a4",
                  }} 
                  onClick={handleLogout}>Logout</Button>
              )}
            </Stack>
          </Box>

          {/* Hamburger */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={() => setMenuOpen(!menuOpen)} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Mobile Menu */}
        <Box
          sx={{
            position: "absolute",
            top: "48px",
            left: 0,
            width: "100%",
            zIndex: 1300,
            display: { xs: "block", md: "none" },
          }}
        >
          <Collapse in={menuOpen} timeout="auto" unmountOnExit>
            <Stack sx={{ px: 2, py: 1, backgroundColor: "#f8f9fa" }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                    fontSize: "18px",
                    color: "#0e59a4",
                  }}
                >
                  {item.label}
                </Button>
              ))}
              {!token ? (
                <Button
                  sx={{ fontSize: "18px", color: "#0e59a4" }}
                  onClick={() => {
                    setAuthModalOpen(true);
                    setMenuOpen(false);
                  }}
                >
                  Login
                </Button>
              ) : (
                <Button
                  sx={{ fontSize: "18px", color: "#0e59a4" }}
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              )}
            </Stack>
          </Collapse>
        </Box>
      </AppBar>

      {/* Auth Modal */}
      <Dialog
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent dividers>
          {showRegister ? (
            <RegisterForm onSuccess={() => { 
              setShowRegister(false); 
              setSuccessOpen(true); 
            }} />
          ) : (
            <LoginForm onSuccess={() => setAuthModalOpen(false)} />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ textTransform: "none", fontSize: '16px' }}
            onClick={() => setShowRegister(!showRegister)}
          >
            {showRegister ? "Back to Login" : "Don't have an account? Register"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alert for successful user registration */}
      <Snackbar
          open={successOpen}
          autoHideDuration={6000}
          onClose={() => setSuccessOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{
            "& .MuiPaper-root": {
              marginTop: '70px', // shift snackbar downward
            },
          }}
        >
          <Alert
            onClose={() => setSuccessOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Registration successful! You can now log in.
          </Alert>
      </Snackbar>
    </>
  );
};

export default Navbar;
