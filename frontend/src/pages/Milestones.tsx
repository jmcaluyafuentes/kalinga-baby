import { Box, Typography, Card, CardContent, LinearProgress, Grid } from "@mui/material";
import { useState } from "react";
import MilestoneCard from "../components/MilestoneCard";
import type { Milestone } from "../types/milestone";

const MilestonesPage: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: 1, title: "First Smile", description: "Baby smiles at you.", expectedAge: "6 weeks", achieved: true, dateAchieved: "2025-05-10" },
    { id: 2, title: "Roll Over", description: "Rolls from tummy to back.", expectedAge: "4 months", achieved: false },
    { id: 3, title: "First Words", description: "Baby says first word.", expectedAge: "12 months", achieved: false },
  ]);

  const achievedCount = milestones.filter(m => m.achieved).length;

  return (
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
    </Box>
  );
};

export default MilestonesPage;
