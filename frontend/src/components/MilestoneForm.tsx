import { Box, Button, TextField, Checkbox, FormControlLabel, Typography, Dialog } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from 'react';
import type { MilestoneFormData } from '../types/milestone';

type MilestoneFormProps = {
  onSave: (milestone: MilestoneFormData) => void;
  onCancel: () => void;
  initialData?: MilestoneFormData;
};

const MilestoneForm: React.FC<MilestoneFormProps> = ({ onSave, onCancel, initialData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expectedAge, setExpectedAge] = useState('');
  const [achieved, setAchieved] = useState(false);
  const [dateAchieved, setDateAchieved] = useState<Date | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);


  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setExpectedAge(initialData.expectedAge);
      setAchieved(initialData.achieved);
      setDateAchieved(initialData.dateAchieved ? new Date(initialData.dateAchieved) : null);
    }
  }, [initialData]);

  const handleSubmit = () => {
    const errors: string[] = [];

    if (!title.trim()) errors.push('• Title is required');
    if (!expectedAge.trim()) errors.push('• Expected age is required');

    if (achieved) {
      if (!dateAchieved) {
        errors.push('• Date achieved is required since milestone is marked as achieved');
      } else if (dateAchieved.getTime() > Date.now()) {
        errors.push('• Date achieved must not be in the future');
      }
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      setOpenErrorDialog(true);
      return;
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      expectedAge: expectedAge.trim(),
      achieved,
      dateAchieved: achieved && dateAchieved
        ? dateAchieved.toISOString().slice(0, 10)
        : undefined,
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 320 }}>
      <Typography variant="h6">
        {initialData ? 'Edit Milestone' : 'Add Milestone'}
      </Typography>

      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        fullWidth
        label="Description"
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        fullWidth
        label="Expected Age"
        placeholder="e.g. 3-6 months old"
        value={expectedAge}
        onChange={(e) => setExpectedAge(e.target.value)}
        required
      />

      <FormControlLabel
        control={<Checkbox checked={achieved} onChange={(e) => setAchieved(e.target.checked)} />}
        label="Achieved"
      />

      {achieved && (
        <DatePicker
          label="Date Achieved"
          value={dateAchieved}
          onChange={(newValue) => setDateAchieved(newValue)}
          slotProps={{
            textField: { required: true, fullWidth: true }
          }}
        />
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initialData ? 'Save' : 'Add'}
        </Button>
      </Box>

      <Dialog open={openErrorDialog} onClose={() => setOpenErrorDialog(false)}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Error</Typography>
          {errorMessages.map((msg, index) => (
            <Typography key={index} variant="body2" sx={{ mb: 1 }}>
              {msg}
            </Typography>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={() => setOpenErrorDialog(false)} variant="contained">OK</Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default MilestoneForm;
