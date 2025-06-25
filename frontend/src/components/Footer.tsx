import { Box, Typography, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language'; // for portfolio

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: '2.5rem',
        py: 3,
        textAlign: 'center',
        backgroundColor: '#f7f7f7',
        borderTop: '1px solid #ddd',
      }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        © 2025 Kalinga Baby. A personal project by John Fuentes.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <IconButton
          component={Link}
          href="https://github.com/jmcaluyafuentes"
          target="_blank"
          rel="noopener"
          aria-label="GitHub"
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="https://www.linkedin.com/in/johnmarkfuentes/"
          target="_blank"
          rel="noopener"
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="https://portfolio-johnfuentes.netlify.app/"
          target="_blank"
          rel="noopener"
          aria-label="Portfolio"
        >
          <LanguageIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
