import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Button, IconButton, } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DateInput from '../components/DateInput';
import FoodForm from '../components/FoodForm';
import FoodList from '../components/FoodList';
import axios from 'axios';
import FoodsTried from '../components/FoodsTried';

const apiUrl = import.meta.env.VITE_API_URL;

const FoodTracker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [entries, setEntries] = useState([]);
  const [allEntries, setAllEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  
  const formattedDate = selectedDate?.toISOString().split('T')[0];

  const fetchEntries = async () => {
    if (!selectedDate || !token) return;
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/api/foods/date/${formattedDate}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setEntries(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllEntries = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${apiUrl}/api/foods`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setAllEntries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (location.state?.selectedDate) {
      setSelectedDate(new Date(location.state.selectedDate));
    }
  }, [location.state]);

  useEffect(() => {
    fetchEntries();
    fetchAllEntries();
  }, [selectedDate]);

  const handleClose = () => {
    navigate('/');
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container sx={{ mt: 4 }}>
          <Box sx={{ position: 'relative' }}>
            <FoodsTried allEntries={allEntries} />
            <FoodForm onEntrySaved={fetchEntries} setSelectedDate={setSelectedDate} />
            <Paper elevation={3} sx={{ p: 3, maxWidth: 480, mx: 'auto', mt: 4, mb: 4 }}>
              <Typography variant='h6' sx={{ mb: 2 }}>History</Typography>
              <DateInput value={selectedDate} onChange={setSelectedDate} />
              <FoodList entries={entries} loading={loading} onDelete={fetchEntries} />
            </Paper>

            {!token && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '120%',
                  bgcolor: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(1px)',
                  zIndex: 999,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 2,
                  px: 2,
                  marginTop: '-180px'
                }}
              > 
                <IconButton
                  aria-label="close"
                  onClick={() => handleClose()}
                  sx={{
                    bgcolor: 'rgb(25, 118, 210)',
                    border: '1px solid',
                    borderColor: 'grey.300',
                    '&:hover': {
                      bgcolor: 'rgb(19, 99, 179)',
                    },
                    color: 'white',
                    boxShadow: 2,
                    width: 40,
                    height: 40,
                    alignSelf: 'flex-center',
                    mr: 1,
                    mt: 1,
                    mb: 3
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h5" sx={{ textAlign: 'center' }}>
                  Please log in to access the Food Tracker
                </Typography>
                <Button variant="contained" onClick={() => navigate("/", { state: { openLogin: true } })}>
                  Go to Login
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      </LocalizationProvider>
    </>
  );
};

export default FoodTracker;
