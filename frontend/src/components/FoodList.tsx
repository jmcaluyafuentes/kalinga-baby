import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  CircularProgress
} from '@mui/material';

type FoodEntry = {
  _id: string;
  food: string;
  quantity: string;
  time: string;
  date: string;
  notes?: string;
};

type FoodListProps = {
  entries: FoodEntry[];
  loading: boolean;
  today: string
};

const FoodList = ({ entries, loading, today }: FoodListProps) => {

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

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
