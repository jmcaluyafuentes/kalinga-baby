import { useState } from "react";
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

type FoodFormProps = {
  onEntrySaved: () => void;
};

const FoodForm = ({ onEntrySaved }: FoodFormProps) => {
  const [form, setForm] = useState({
    food: "",
    quantity: "",
    date: "",
    time: "",
    notes: "",
  });
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
      const res = await axios.post("http://localhost:3000/api/foods", form);

      if (res.status === 201) {
        setSuccessOpen(true);
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
          <TextField
            label="Time (e.g. 09:00 AM)"
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
