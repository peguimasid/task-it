import { TaskStatus } from '@/types';

export const TASK_STATUS: Record<TaskStatus, TaskStatus> = {
  BACKLOG: 'BACKLOG',
  IN_PROGRESS: 'IN_PROGRESS',
  IN_REVIEW: 'IN_REVIEW',
  DONE: 'DONE'
};

export const READABLE_STATUS: Record<TaskStatus, string> = {
  BACKLOG: 'Backlog',
  IN_PROGRESS: 'In progress',
  IN_REVIEW: 'In review',
  DONE: 'Done'
};

export const statuses = Object.keys(TASK_STATUS) as TaskStatus[];
