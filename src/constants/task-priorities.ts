import { TaskPriority } from '@/types';

import { Icons } from '@/components/icons';

export const TASK_PRIORITY: Record<TaskPriority, TaskPriority> = {
  URGENT: 'URGENT',
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW'
};

export const TASK_PRIORITY_ICONS: Record<TaskPriority, (typeof Icons)[keyof typeof Icons]> = {
  URGENT: Icons.flame,
  HIGH: Icons.siren,
  MEDIUM: Icons.hammer,
  LOW: Icons.iceCream
};

export const READABLE_PRIORITY: Record<TaskPriority, string> = {
  URGENT: 'Urgent',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low'
};

export const priorities = Object.keys(TASK_PRIORITY) as TaskPriority[];
