import { TaskStatus } from '@/types';

export const TASK_STATUS: Record<TaskStatus, TaskStatus> = {
  BACKLOG: 'BACKLOG',
  IN_PROGRESS: 'IN_PROGRESS',
  IN_REVIEW: 'IN_REVIEW',
  FINISHED: 'FINISHED'
};

export const READABLE_STATUS: Record<TaskStatus, string> = {
  BACKLOG: 'Backlog',
  IN_PROGRESS: 'In progress',
  IN_REVIEW: 'In review',
  FINISHED: 'Finished'
};
