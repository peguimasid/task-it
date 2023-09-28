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
    <div className="flex gap-2 flex-wrap">
      {priority && (
        <Badge variant="secondary">
          <Bell className="w-3 h-3 mr-1" />
          {priority}
        </Badge>
      )}
      {size && (
        <Badge data-has-size={!!size} variant="secondary" className="data-[has-size=false]:hidden">
          <Anchor className="w-3 h-3 mr-1" />
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
