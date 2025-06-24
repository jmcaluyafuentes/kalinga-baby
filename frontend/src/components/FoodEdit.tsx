import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';
import { Container } from '@mui/system';

const apiUrl = import.meta.env.VITE_API_URL;

interface FoodEntry {
  _id: string;
  food: string;
  quantity: string;
  time: string;
  date: string;
  notes?: string;
}

type Params = {
  id: string;
};

const FoodEdit = () => {
  const { id } = useParams<Params>();
  const navigate = useNavigate();
  const [form, setForm] = useState<Omit<FoodEntry, '_id'>>({
    food: '',
    quantity: '',
    time: '',
    date: '',
    notes: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await axios.get<FoodEntry>(`${apiUrl}/api/foods/${id}`);
        const { food, quantity, time, date, notes } = res.data;
        setForm({ food, quantity, time, date, notes: notes || '' });
      } catch (err) {
        console.error('Failed to load entry', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEntry();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`${apiUrl}/api/foods/${id}`, form);
      setSuccessOpen(true);
      setTimeout(() => navigate('/food', {
        state: {
          selectedDate: form.date
        }
      }), 1000);
    } catch (err) {
      console.error('Update failed', err);
      setErrorOpen(true);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/food', {
      state: {
        selectedDate: form.date
      }
    })
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 480, mx: 'auto', mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Edit Food Entry
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <TextField
              label="Food"
              name="food"
              value={form.food}
              onChange={handleChange}
              required
              />
            <TextField
              label="Quantity"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              required
              />
            <TextField
              label="Time (e.g. 09:00)"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
              />
            <TextField
              label="Date (YYYY-MM-DD)"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              />
            <TextField
              label="Notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              multiline
              rows={3}
              />
            <Button
              type="submit"
              variant="contained"
              disabled={saving}
              >
              {saving ? <CircularProgress size={20} /> : 'Save Changes'}
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Stack>
        </Box>

        <Snackbar
          open={successOpen}
          autoHideDuration={3000}
          onClose={() => setSuccessOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
          <Alert onClose={() => setSuccessOpen(false)} severity="success" sx={{ width: '100%' }}>
            Entry updated successfully!
          </Alert>
        </Snackbar>

        <Snackbar
          open={errorOpen}
          autoHideDuration={3000}
          onClose={() => setErrorOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
          <Alert onClose={() => setErrorOpen(false)} severity="error" sx={{ width: '100%' }}>
            Failed to update entry. Please try again.
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default FoodEdit;
