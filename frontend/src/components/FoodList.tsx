import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';

type FoodEntry = {
  _id: string;
  food: string;
  quantity: string;
  time: string;
  date: string;
  notes?: string;
};

const FoodList = () => {
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/foods/${today}`);
        setEntries(res.data);
      } catch (err) {
        console.error('Failed to fetch food entries', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [today]);

  return (
    <Paper elevation={2} sx={{ p: 4, maxWidth: 480, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Today's Food Intake ({today})
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : entries.length === 0 ? (
        <Typography>No entries yet.</Typography>
      ) : (
        <List>
          {entries.map((entry) => (
            <Box key={entry._id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={`${entry.time} — ${entry.food} (${entry.quantity})`}
                  secondary={entry.notes}
                />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default FoodList;
