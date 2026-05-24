import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Paper,
  MenuItem
} from "@mui/material";

const stores = ["Woolworths", "Coles", "Chemist Warehouse"];
const brands = ["Huggies", "Pampers", "BubCare", "Other"];

export default function AddTrackedItemForm() {
  const [formData, setFormData] = useState({
    itemName: "",
    brand: "",
    store: "",
    targetPrice: "",
    productUrl: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send data to backend
    console.log("Submitting", formData);
  };

  return (
    <Paper elevation={3} sx={{ mt: 4, p: 3, maxWidth: 480, mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Track a Product
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          {/* @ts-expect-error no overload? */}
          <Grid item xs={12} sx={{ width: '100%' }}>
            <TextField
              label="Item Name"
              name="itemName"
              value={formData.itemName}
              required
              fullWidth
            />
          </Grid>
          {/* @ts-expect-error no overload? */}
          <Grid item xs={12} sx={{ width: '100%' }}>
            <TextField
              select
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              fullWidth
            >
              {brands.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* @ts-expect-error no overload? */}
          <Grid item xs={12} sx={{ width: '100%' }}>
            <TextField
              select
              label="Store"
              name="store"
              value={formData.store}
              onChange={handleChange}
              required
              fullWidth
            >
              {stores.map((store) => (
                <MenuItem key={store} value={store}>
                  {store}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* @ts-expect-error no overload? */}
          <Grid item xs={12} sx={{ width: '100%' }}>
            <TextField
              label="Target Price (optional)"
              name="targetPrice"
              type="number"
              value={formData.targetPrice}
              onChange={handleChange}
              fullWidth
              inputProps={{ min: 0, step: 0.01 }}
            />
          </Grid>
          {/* @ts-expect-error no overload? */}
          <Grid item xs={12} sx={{ width: '100%' }}>
            <TextField
              label="Product URL"
              name="productUrl"
              value={formData.productUrl}
              onChange={handleChange}
              required
              fullWidth
              placeholder="https://www.woolworths.com.au/..."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
        >
          Add to Tracker
        </Button>
      </Box>
    </Paper>
  );
}
