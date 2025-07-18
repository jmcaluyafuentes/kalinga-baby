import { Card, CardContent, Typography, Chip, Button } from '@mui/material';
import type { Milestone } from '../types/milestone';

type Props = {
  milestone: Milestone;
  onEdit: (milestone: Milestone) => void;
};

const MilestoneCard: React.FC<Props> = ({ milestone, onEdit }) => {
  return (
    <Card sx={{ mb: 2, backgroundColor: milestone.achieved ? '#e0f7fa' : '#fff' }}>
      <CardContent>
        <Typography variant="h6">{milestone.title}</Typography>
        <Typography variant="body2">{milestone.description}</Typography>
        <Typography variant="body2">Expected Age: {milestone.expectedAge}</Typography>
        {milestone.achieved && (
          <Typography variant="body2">Achieved on: {milestone.dateAchieved}</Typography>
        )}
        <Chip label={milestone.achieved ? 'Achieved' : 'Not Yet'} color={milestone.achieved ? 'success' : 'default'} sx={{ mt: 1, mr: 1 }} />
        <Button variant="outlined" size="small" sx={{ mt: 1 }} onClick={() => onEdit(milestone)}>Edit</Button>
      </CardContent>
    </Card>
  );
};

export default MilestoneCard;
