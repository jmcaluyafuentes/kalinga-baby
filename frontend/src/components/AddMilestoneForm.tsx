import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

type AddMilestoneFormProps = {
  onAdd: (milestone: {
    title: string;
    description?: string;
    expectedAge: string;
    achieved: boolean;
    dateAchieved?: string;
  }) => void;
  onCancel: () => void;
};

const AddMilestoneForm: React.FC<AddMilestoneFormProps> = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expectedAge, setExpectedAge] = useState("");
  const [achieved, setAchieved] = useState(false);
  const [dateAchieved, setDateAchieved] = useState<Dayjs | null>(null);

  const handleSubmit = () => {
    if (!title || !expectedAge) {
      alert("Please fill in required fields: Title and Expected Age");
      return;
    }

    onAdd({
      title,
      description: description || undefined,
      expectedAge,
      achieved,
      dateAchieved: achieved && dateAchieved ? dateAchieved.format("YYYY-MM-DD") : undefined,
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}>
      <Typography variant="h6">Add Milestone</Typography>

      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={3}
      />

      <TextField
        label="Expected Age (e.g. 6 months)"
        value={expectedAge}
        onChange={(e) => setExpectedAge(e.target.value)}
        required
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={achieved}
            onChange={(e) => setAchieved(e.target.checked)}
          />
        }
        label="Achieved"
      />

      {achieved && (
        <DatePicker
          label="Date Achieved"
          value={dateAchieved}
          onChange={(newDate) => setDateAchieved(newDate ? dayjs(newDate) : null)}
          slotProps={{
            textField: {
              required: true,
              helperText: "Select date milestone was achieved",
              variant: "outlined",
              size: "small",
            },
          }}
        />
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Add</Button>
      </Box>
    </Box>
  );
};

export default AddMilestoneForm;
