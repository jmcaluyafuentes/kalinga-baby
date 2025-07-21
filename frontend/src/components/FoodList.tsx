import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import type { FoodEntry } from "../types/foodEntry";

const apiUrl = import.meta.env.VITE_API_URL

type FoodListProps = {
  entries: FoodEntry[];
  loading: boolean;
  onDelete: () => void;
};

const FoodList = ({ entries, loading, onDelete }: FoodListProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<FoodEntry | null>(null);

  const handleDeleteClick = (entry: FoodEntry) => {
    setEntryToDelete(entry);
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!entryToDelete) return;
    try {
      await axios.delete(`${apiUrl}/api/foods/${entryToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      onDelete(); // re-fetch entries
    } catch (err) {
      console.error("Failed to delete entry", err);
    } finally {
      setOpen(false);
      setEntryToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setOpen(false);
    setEntryToDelete(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Paper
        elevation={2}
        sx={{ p: 2, maxWidth: 480, mx: "auto", mt: 2, mb: 2 }}
      >

        {/* Display a note that user can edit a food entry */}
        {entries.length > 0 &&
          <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mt: 1, textAlign: 'center' }}
          >
          Click an entry to edit food details.
        </Typography>
        }

        {/* Display all food entries */}
        {entries.length === 0 ? (
          <Typography>No entries yet.</Typography>
        ) : (
          <List>
            {entries.map((entry) => (
              <Box key={entry._id}>
                {/* @ts-expect-error added button prop */}
                <ListItem
                  button="true"
                  sx={{
                    p: 2,
                    mb: 1,
                    borderRadius: 2,
                    border: "1px solid #ddd",
                    transition: "background-color 0.2s",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => navigate(`/food/${entry._id}/edit`)}
                  alignItems="flex-start"
                  secondaryAction={
                    <Tooltip title="Delete">
                      <IconButton
                        edge="end"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(entry);
                        }}
                      >
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

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{entryToDelete?.food}</strong> at {entryToDelete?.time}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FoodList;
