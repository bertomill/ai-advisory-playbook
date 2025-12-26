export interface Task {
  id: string;
  title: string;
  guidance: string;  // Detailed instructions on what to do
  chapterSlug?: string;
}

export interface Milestone {
  id: string;
  phase: number;
  title: string;
  description: string;
  tasks: Task[];
}

export interface Phase {
  number: number;
  title: string;
  timeframe: string;
  milestones: Milestone[];
}

export interface TaskProgress {
  id: string;
  user_id: string;
  milestone_id: string;
  task_id: string;
  completed: boolean;
  completed_at: string | null;
  notes: string | null;
}
