'use client';

import { READABLE_PRIORITY, TASK_PRIORITY_ICONS } from '@/constants/task-priorities';
import { READABLE_SIZE } from '@/constants/task-sizes';
import { TaskPriority, TaskSize } from '@/types';

import { cn } from '@/lib/utils';

import { Icons } from './icons';
import { Badge } from './ui/badge';

interface TagsListProps {
  size: TaskSize | null;
  priority: TaskPriority | null;
  tags: string[];
}

export const TagsList = ({ priority, size, tags }: TagsListProps) => {
  const PriorityIcon = priority ? TASK_PRIORITY_ICONS[priority] : null;

  return (
    <div className="flex flex-wrap gap-2">
      {priority && (
        <Badge
          variant="secondary"
          className={cn({
            'bg-red-600/20 dark:bg-red-400/20': priority === 'URGENT',
            'bg-yellow-600/20 dark:bg-yellow-400/20': priority === 'HIGH',
            'bg-green-600/20 dark:bg-green-400/20': priority === 'MEDIUM',
            'bg-blue-600/20 dark:bg-blue-400/20': priority === 'LOW'
          })}
        >
          {PriorityIcon && (
            <PriorityIcon
              className={cn('mr-1 h-3 w-3', {
                'text-red-600 dark:text-red-400': priority === 'URGENT',
                'text-yellow-600 dark:text-yellow-400': priority === 'HIGH',
                'text-green-600 dark:text-green-400': priority === 'MEDIUM',
                'text-blue-600 dark:text-blue-400': priority === 'LOW'
              })}
            />
          )}
          {READABLE_PRIORITY[priority]}
        </Badge>
      )}
      {size && (
        <Badge variant="secondary">
          <Icons.ruler className="mr-1 h-3 w-3" />
          {READABLE_SIZE[size]}
        </Badge>
      )}
      {tags?.map((tag) => (
        <Badge key={tag} variant="secondary">
          {tag}
        </Badge>
      ))}
    </div>
  );
};
