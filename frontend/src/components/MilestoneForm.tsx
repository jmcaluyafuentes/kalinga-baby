import { Box, Button, TextField, Checkbox, FormControlLabel, Typography } from '@mui/material';
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
    if (!title || !expectedAge) {
      alert('Title and Expected Age are required');
      return;
    }
    onSave({
      title,
      description: description || '',
      expectedAge,
      achieved,
      dateAchieved: achieved && dateAchieved
        ? dateAchieved.toISOString().slice(0, 10)  // format YYYY-MM-DD
        : undefined,
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}>
      <Typography variant="h6">{initialData ? 'Edit Milestone' : 'Add Milestone'}</Typography>

      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <TextField label="Description" multiline rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
      <TextField label="Expected Age" placeholder="e.g. 3 months old" value={expectedAge} onChange={(e) => setExpectedAge(e.target.value)} required />

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
            textField: { required: true }
          }}
        />
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>{initialData ? 'Save' : 'Add'}</Button>
      </Box>
    </Box>
  );
};

export default MilestoneForm;
