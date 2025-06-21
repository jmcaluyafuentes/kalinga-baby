import { useState, useEffect } from 'react';
import FoodForm from "./components/FoodForm";
import FoodList from "./components/FoodList";
import DateInput from './components/DateInput';
import { Container, Box } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

type FoodEntry = {
  _id: string;
  food: string;
  quantity: string;
  time: string;
  date: string;
  notes?: string;
};

function App() {
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  
  const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD

  const fetchEntries = async () => {
    if (!selectedDate) return;

    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/api/foods/${formattedDate}`);
      setEntries(res.data);
    } catch (err) {
      console.error('Failed to fetch food entries', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [selectedDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container sx={{ mt: 4 }}>
        <FoodForm onEntrySaved={fetchEntries} />
        <Box sx={{ maxWidth: 480, mx: 'auto', mt: 4 }}>
          <DateInput value={selectedDate} onChange={setSelectedDate} />
        </Box>
        <FoodList entries={entries} loading={loading} date={formattedDate} onDelete={fetchEntries} />
      </Container>
    </LocalizationProvider>
  )
}

export default App
