export interface Milestone {
  id: number;
  title: string;
  description?: string;
  expectedAge: string;
  achieved: boolean;
  dateAchieved?: string;
}

export type MilestoneFormData = Omit<Milestone, 'id'>;
