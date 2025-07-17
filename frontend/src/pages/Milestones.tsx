import { useState } from "react";
import type { Milestone } from "../types/milestone";
import { Box, Typography, Card, CardContent, LinearProgress, Grid, Modal, Button } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MilestoneCard from "../components/MilestoneCard";
import AddMilestoneForm from "../components/AddMilestoneForm";

const MilestonesPage: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: 1, title: "First Smile", description: "Baby smiles at you.", expectedAge: "6 weeks", achieved: true, dateAchieved: "2025-05-10" },
    { id: 2, title: "Roll Over", description: "Rolls from tummy to back.", expectedAge: "4 months", achieved: false },
    { id: 3, title: "First Words", description: "Baby says first word.", expectedAge: "12 months", achieved: false },
  ]);
  const [openAdd, setOpenAdd] = useState(false);

  const achievedCount = milestones.filter(m => m.achieved).length;

  const handleAddMilestone = (newMilestone: Omit<Milestone, "id">) => {
    const newId = milestones.length ? Math.max(...milestones.map(m => m.id)) + 1 : 1;
    setMilestones([...milestones, { id: newId, ...newMilestone }]);
    setOpenAdd(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        p={2}
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          mt: { xs: 2, md: 4 },
          mb: { xs: 2, md: 5 }
        }}
      >
        <Typography variant="h4" mb={2} sx={{ textAlign: 'center' }}>Milestones</Typography>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">Progress</Typography>
            <LinearProgress
              variant="determinate"
              value={(achievedCount / milestones.length) * 100}
              sx={{ mt: 2, height: 10, borderRadius: 5 }}
            />
            <Typography variant="body2" mt={1}>
              {achievedCount} of {milestones.length} milestones achieved
            </Typography>
          </CardContent>
        </Card>

        <Grid container spacing={2}>
          {milestones.map((milestone) => (
            // @ts-expect-error list of available features
            <Grid item xs={12} md={6} key={milestone.id}>
              <MilestoneCard milestone={milestone} />
            </Grid>
          ))}
        </Grid>
    
        <Button variant="contained" onClick={() => setOpenAdd(true)} sx={{ mt: 3 }}>
          + Add Milestone
        </Button>

        <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
            >
            <AddMilestoneForm
              onAdd={handleAddMilestone}
              onCancel={() => setOpenAdd(false)}
              />
          </Box>
        </Modal>
      </Box>
    </LocalizationProvider>
  );
};

export default MilestonesPage;
