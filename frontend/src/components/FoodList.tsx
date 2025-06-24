import { useNavigate } from 'react-router-dom';
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

const apiUrl = import.meta.env.VITE_API_URL;

type FoodEntry = {
  _id: string;
  food: string;
  quantity: string;
  time: string;
  notes?: string;
};

type FoodListProps = {
  entries: FoodEntry[];
  loading: boolean;
  onDelete: () => void;
};

const FoodList = ({ entries, loading, onDelete }: FoodListProps) => {

  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/api/foods/${id}`);
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
    <Paper elevation={2} sx={{ p: 2, maxWidth: 480, mx: 'auto', mt: 2, mb: 2 }}>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : entries.length === 0 ? (
        <Typography>No entries yet.</Typography>
      ) : (
        <List>
          {entries.map((entry) => (
            <Box key={entry._id}>
              {/* @ts-expect-error added button prop*/}
              <ListItem
                button = "true"
                sx={{
                  p: 2,
                  mb: 1,
                  borderRadius: 2,
                  border: '1px solid #ddd',
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    cursor: 'pointer',
                  },
                }}
                onClick = {() => navigate(`/food/${entry._id}/edit`)}
                alignItems='flex-start'
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
