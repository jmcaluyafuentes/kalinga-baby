import { useState } from 'react';
import { Box, Typography, Chip, Paper, Autocomplete, TextField } from '@mui/material';
import { extractFoodsTried } from '../utils/extractFoodsTried';
import type { FoodEntry } from '../types/foodEntry';

type Props = {
  allEntries: FoodEntry[];
};

const FoodsTried = ({ allEntries }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const foods = extractFoodsTried(allEntries);
  const filteredFoods = searchQuery
    ? foods.filter((food) => food.toLowerCase().includes(searchQuery.toLowerCase()))
    : foods;

  if (foods.length === 0) return null;

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        maxWidth: 480,
        mx: 'auto',
        mt: 4,
        mb: 4,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Foods Tried So Far
      </Typography>

      <Autocomplete
        id="search-food-autocomplete"
        freeSolo
        options={foods}
        inputValue={searchQuery}
        onInputChange={(_, value) => setSearchQuery(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Food"
            variant="outlined"
            sx={{ mb: 3, backgroundColor: '#fff', borderRadius: 2 }}
          />
        )}
      />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5,
          justifyContent: 'center',
        }}
      >
        {filteredFoods.map((food) => (
          <Chip
            key={food}
            label={food}
            variant="outlined"
            sx={{
              bgcolor: '#e0f7fa',
              border: '1px solid #4dd0e1',
              color: '#006064',
              fontWeight: 500,
              fontSize: '14px',
              px: 1.5,
              py: 0.5,
              borderRadius: '16px',
            }}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default FoodsTried;
