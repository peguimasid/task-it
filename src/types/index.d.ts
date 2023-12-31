import { Icons } from '@/components/icons';

export type SiteConfig = {
  name: string;
  description: string;
  links: {
    github: string;
  };
};

export type TaskStatus = 'BACKLOG' | 'IN_PROGRESS' | 'DONE';

export type TaskPriority = 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW';

export type TaskSize = 'LARGE' | 'MEDIUM' | 'SMALL' | 'TINY';
