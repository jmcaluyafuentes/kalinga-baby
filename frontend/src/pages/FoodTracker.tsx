import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Paper, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DateInput from '../components/DateInput';
import FoodForm from '../components/FoodForm';
import FoodList from '../components/FoodList';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const FoodTracker = () => {
  const location = useLocation();

  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  
  const formattedDate = selectedDate?.toISOString().split('T')[0];

  const fetchEntries = async () => {
    if (!selectedDate) return;
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/api/foods/date/${formattedDate}`);
      setEntries(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.selectedDate) {
      setSelectedDate(new Date(location.state.selectedDate));
    }
  }, [location.state]);

  useEffect(() => {
    fetchEntries();
  }, [selectedDate]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container sx={{ mt: 4 }}>
          <FoodForm onEntrySaved={fetchEntries} setSelectedDate={setSelectedDate} />
          <Paper elevation={3} sx={{ p: 3, maxWidth: 480, mx: 'auto', mt: 4, mb: 4 }}>
            <Typography variant='h6' sx={{ mb: 2 }}>History</Typography>
            <DateInput value={selectedDate} onChange={setSelectedDate} />
            <FoodList entries={entries} loading={loading} onDelete={fetchEntries} />
          </Paper>
        </Container>
      </LocalizationProvider>
    </>
  );
};

export default FoodTracker;
