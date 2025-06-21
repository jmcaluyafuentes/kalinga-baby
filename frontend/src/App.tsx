import { useState, useEffect } from 'react';
import FoodForm from "./components/FoodForm";
import FoodList from "./components/FoodList";
import { Container } from "@mui/material";
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
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/api/foods/${today}`);
      setEntries(res.data);
    } catch (err) {
      console.error('Failed to fetch food entries', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <Container>
      <FoodForm onEntrySaved={fetchEntries} />
      <FoodList entries={entries} loading={loading} today={today}/>
    </Container>
  )
}

export default App
