import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

const FoodForm = () => {
  const [form, setForm] = useState({
    food: "",
    quantity: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  const handleSubmit = () => {
    alert('Form submitted!')
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 480, mx: 'auto', mt: 4}}>
      <Typography variant="h5" component="h1" gutterBottom>
        Log Baby's Food Intake
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
            label="Time (e.g. 09:00 AM"
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
          <Button type="submit" variant='contained' fullWidth>
            Save Entry
          </Button>
        </Stack>
      </Box>
    </Paper>
  )
};

export default FoodForm;
