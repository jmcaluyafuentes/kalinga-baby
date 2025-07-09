import { Box, Typography, Chip, Paper } from '@mui/material';
import { extractFoodsTried } from '../utils/extractFoodsTried';

type FoodEntry = {
  _id: string;
  food: string;
  quantity: string;
  time: string;
  notes?: string;
};

type Props = {
  allEntries: FoodEntry[];
};

const FoodsTried = ({ allEntries }: Props) => {

  const foods = extractFoodsTried(allEntries);

  if (foods.length === 0) return null;

  return (
    <Paper
      elevation={2}
      sx={{ p: 2, maxWidth: 480, mx: 'auto', mt: 2, mb: 2, textAlign: 'center' }}
    >
      <Typography variant="h6" gutterBottom>
        Foods Tried So Far
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
        {foods.map((food) => (
          <Chip key={food} label={food} sx={{ bgcolor: 'seconday.main' }}/>
        ))}
      </Box>
    </Paper>
  );
};

export default FoodsTried;
