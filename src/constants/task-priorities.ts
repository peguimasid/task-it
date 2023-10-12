import { TaskPriority } from '@/types';

export const TASK_PRIORITY: Record<TaskPriority, TaskPriority> = {
  URGENT: 'URGENT',
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW'
};

export const READABLE_PRIORITY: Record<TaskPriority, string> = {
  URGENT: 'Urgent',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low'
};

export const priorities = Object.keys(TASK_PRIORITY) as TaskPriority[];
