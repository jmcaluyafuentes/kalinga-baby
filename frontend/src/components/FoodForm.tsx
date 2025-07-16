import { useState } from "react";
import DateInput from './DateInput';
import TimeInput from './TimeInput';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

type FoodFormProps = {
  onEntrySaved: () => void;
  setSelectedDate: (date: Date | null) => void
};

const FoodForm = ({ onEntrySaved, setSelectedDate }: FoodFormProps) => {
  const [form, setForm] = useState({
    food: "",
    quantity: "",
    date: "",
    time: "",
    notes: "",
  });
  const [timeObj, setTimeObj] = useState<Date | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${apiUrl}/api/foods`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (res.status === 201) {
        setSuccessOpen(true);

        const formattedDate = new Date(form.date);
        setSelectedDate(formattedDate);
        onEntrySaved(); // Refresh list
      }

      setForm({ food: "", quantity: "", time: "", date: "", notes: "" });
    } catch (err) {
      console.error(err);
      setErrorOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 480, mx: "auto", mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Record Baby's Food Intake
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
            label="Quantity (e.g. 2 tbsp)"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            required
          />
          <TimeInput
            label="Time"
            value={timeObj}
            onChange={(newTime) => {
              setTimeObj(newTime);
              if (newTime) {
                const hours = String(newTime.getHours()).padStart(2, '0');
                const minutes = String(newTime.getMinutes()).padStart(2, '0');
                setForm({ ...form, time: `${hours}:${minutes}` });
              }
            }}
          />
          <DateInput
            label="Date"
            value={form.date ? new Date(form.date) : null}
            onChange={(newDate) => {
              if (newDate) {
                const iso = newDate.toISOString().split('T')[0];
                setForm({ ...form, date: iso });
              }
            }}
          />
          <TextField
            label="Notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            multiline
            rows={2}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Saving..." : "Save Entry"}
          </Button>
        </Stack>
      </Box>

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
          Food entry added successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={() => setErrorOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setErrorOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Failed to add food entry. Please try again.
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default FoodForm;
