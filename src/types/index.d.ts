import { Icons } from '@/components/icons';

export type SiteConfig = {
  name: string;
  description: string;
  links: {
    github: string;
  };
};

export type TaskStatus = 'BACKLOG' | 'IN_PROGRESS' | 'DONE';
