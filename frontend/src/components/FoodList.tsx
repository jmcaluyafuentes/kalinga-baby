import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  CircularProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

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
  date: string;
  onDelete: () => void;
};

const FoodList = ({ entries, loading, date, onDelete }: FoodListProps) => {

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://kalinga-baby-api.onrender.com/api/foods/${id}`);
      onDelete(); //re-fetch entries
    } catch (err) {
      console.error('Failed to delete entry', err);
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 4, maxWidth: 480, mx: 'auto', mt: 4, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Today's Food Intake ({date})
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : entries.length === 0 ? (
        <Typography>No entries yet.</Typography>
      ) : (
        <List>
          {entries.map((entry) => (
            <Box key={entry._id}>
              <ListItem
                secondaryAction={
                  <Tooltip title="Delete">
                    <IconButton edge="end" onClick={() => handleDelete(entry._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                }
              >
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
