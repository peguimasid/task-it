import { TaskSize } from '@/types';

export const TASK_SIZE: Record<TaskSize, TaskSize> = {
  LARGE: 'LARGE',
  MEDIUM: 'MEDIUM',
  SMALL: 'SMALL',
  TINY: 'TINY'
};

export const READABLE_SIZE: Record<TaskSize, string> = {
  LARGE: 'Large',
  MEDIUM: 'Medium',
  SMALL: 'Small',
  TINY: 'Tiny'
};

export const sizes = Object.keys(TASK_SIZE) as TaskSize[];
