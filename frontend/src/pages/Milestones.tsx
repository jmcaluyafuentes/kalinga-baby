import { useState } from 'react';
import { Box, Typography, Button, Modal, Grid, Card, CardContent, LinearProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import MilestoneForm from '../components/MilestoneForm';
import MilestoneCard from '../components/MilestoneCard';
import type { Milestone, MilestoneFormData } from '../types/milestone';

const MilestonesPage = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: 1, title: 'First Smile', description: 'Smiles for the first time.', expectedAge: '6 weeks', achieved: true, dateAchieved: '2025-05-15' },
    { id: 2, title: 'First Crawl', expectedAge: '8 months', achieved: false }
  ]);
  const [openForm, setOpenForm] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);

  const handleAdd = () => {
    setEditingMilestone(null);
    setOpenForm(true);
  };

  const handleSave = (data: MilestoneFormData) => {
    if (editingMilestone) {
      setMilestones(milestones.map(m => m.id === editingMilestone.id ? { ...m, ...data } : m));
    } else {
      const newMilestone: Milestone = {
        id: milestones.length ? Math.max(...milestones.map(m => m.id)) + 1 : 1,
        ...data
      };
      setMilestones([...milestones, newMilestone]);
    }
    setOpenForm(false);
    setEditingMilestone(null);
  };

  const handleEdit = (milestone: Milestone) => {
    setEditingMilestone(milestone);
    setOpenForm(true);
  };

  const achievedCount = milestones.filter(m => m.achieved).length;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Box
      p={{ xs: 2, md: 4 }}
      maxWidth="900px"
      mx="auto"
    >
      <Typography variant="h4" mb={2}>Milestones</Typography>

      <Card sx={{ mb: { xs: 3, md: 4 } }}>
        <CardContent>
          <Typography variant="h6">Progress</Typography>
          <LinearProgress
            variant="determinate"
            value={(achievedCount / milestones.length) * 100}
            sx={{ mt: 1, height: 10, borderRadius: 5 }}
          />
          <Typography variant="body2" mt={1}>
            {achievedCount} of {milestones.length} milestones achieved
          </Typography>
        </CardContent>
      </Card>

      <Button variant="contained" onClick={handleAdd} sx={{ mb: { xs: 2, md: 4 } }}>
        + Add Milestone
      </Button>


      <Grid container spacing={3} mt={0}>
        {milestones.map(milestone => (
          // @ts-expect-error no overload?
          <Grid xs={12} md={6} key={milestone.id}>
            <MilestoneCard milestone={milestone} onEdit={handleEdit} />
          </Grid>
        ))}
      </Grid>

      <Modal open={openForm} onClose={() => setOpenForm(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', p: 4, borderRadius: 2 }}>
          <MilestoneForm
            onSave={handleSave}
            onCancel={() => setOpenForm(false)}
            initialData={editingMilestone ? { ...editingMilestone } : undefined}
          />
        </Box>
      </Modal>
    </Box>
    </LocalizationProvider>
  );
};

export default MilestonesPage;
