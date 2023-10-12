'use client';

import { READABLE_PRIORITY } from '@/constants/task-priorities';
import { READABLE_SIZE } from '@/constants/task-sizes';
import { TaskPriority, TaskSize } from '@/types';

import { Icons } from './icons';
import { Badge } from './ui/badge';

interface TagsListProps {
  size: TaskSize | null;
  priority: TaskPriority | null;
  tags: string[];
}

export const TagsList = ({ priority, size, tags }: TagsListProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {priority && (
        <Badge variant="secondary">
          <Icons.flag className="mr-1 h-3 w-3" />
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
