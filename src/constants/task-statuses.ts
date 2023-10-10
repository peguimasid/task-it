import { TaskStatus } from '@/types';

import { Icons } from '@/components/icons';

export const TASK_STATUS: Record<TaskStatus, TaskStatus> = {
  BACKLOG: 'BACKLOG',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE'
};

export const TASK_STATUS_ICONS: Record<TaskStatus, (typeof Icons)[keyof typeof Icons]> = {
  BACKLOG: Icons.circleDashed,
  IN_PROGRESS: Icons.circleDotDashed,
  DONE: Icons.circleDot
};

export const READABLE_STATUS: Record<TaskStatus, string> = {
  BACKLOG: 'Backlog',
  IN_PROGRESS: 'In progress',
  DONE: 'Done'
};

export const statuses = Object.keys(TASK_STATUS) as TaskStatus[];
