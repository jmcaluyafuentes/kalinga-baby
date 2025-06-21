import { useState, useEffect } from 'react';
import { Container, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DateInput from '../components/DateInput';
import FoodForm from '../components/FoodForm';
import FoodList from '../components/FoodList';
import axios from 'axios';

const FoodTracker = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const formattedDate = selectedDate?.toISOString().split('T')[0];

  const fetchEntries = async () => {
    if (!selectedDate) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/api/foods/${formattedDate}`);
      setEntries(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [selectedDate]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container sx={{ mt: 4 }}>
          <FoodForm onEntrySaved={fetchEntries} />
          <Paper elevation={3} sx={{ p: 3, maxWidth: 480, mx: 'auto', mt: 4 }}>
            <DateInput value={selectedDate} onChange={setSelectedDate} />
          </Paper>
          <FoodList entries={entries} loading={loading} date={formattedDate || ''} onDelete={fetchEntries} />
        </Container>
      </LocalizationProvider>
    </>
  );
};

export default FoodTracker;
