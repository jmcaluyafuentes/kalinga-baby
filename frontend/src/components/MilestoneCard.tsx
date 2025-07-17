import { Card, CardContent, Typography, Chip } from "@mui/material";
import type { Milestone } from "../types/milestone";

type MilestoneCardProps = {
  milestone: Milestone;
};

const MilestoneCard: React.FC<MilestoneCardProps> = ({ milestone }) => {
  return (
    <Card sx={{ backgroundColor: milestone.achieved ? "#e0f7fa" : "#fff" }}>
      <CardContent>
        <Typography variant="h6">{milestone.title}</Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>{milestone.description}</Typography>

        <Typography variant="body2" mt={1}>
          📅 Expected: {milestone.expectedAge}
        </Typography>

        {milestone.achieved && milestone.dateAchieved && (
          <Typography variant="body2" mt={1}>
            ✅ Achieved on: {milestone.dateAchieved}
          </Typography>
        )}

        <Chip
          label={milestone.achieved ? "Achieved" : "Not Yet"}
          color={milestone.achieved ? "success" : "default"}
          sx={{ mt: 2 }}
        />
      </CardContent>
    </Card>
  );
};

export default MilestoneCard;
