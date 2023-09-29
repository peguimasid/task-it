'use client';

import { Anchor, Bell } from 'lucide-react';

import { Badge } from './ui/badge';

interface TagsListProps {
  size: string | null;
  priority: string | null;
  tags: string[];
}

export const TagsList = ({ priority, size, tags }: TagsListProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {priority && (
        <Badge variant="secondary">
          <Bell className="mr-1 h-3 w-3" />
          {priority}
        </Badge>
      )}
      {size && (
        <Badge data-has-size={!!size} variant="secondary" className="data-[has-size=false]:hidden">
          <Anchor className="mr-1 h-3 w-3" />
          {size}
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
