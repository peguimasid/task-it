'use client';

import { useCallback, useState } from 'react';
import { Task } from '@prisma/client';
import { MoreHorizontal } from 'lucide-react';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger
} from './ui/dropdown-menu';

interface TaskOperationsProps {
  task: Pick<Task, 'id'>;
}

export const TaskOperations = ({ task }: TaskOperationsProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const onOpenChange = useCallback((open: boolean) => {
    setIsDropdownOpen(open);
  }, []);

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          data-is-dropdown-open={isDropdownOpen}
          className="absolute right-0 top-0 m-3 h-6 w-6 opacity-0 transition group-hover:opacity-100 data-[is-dropdown-open=true]:opacity-100"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer text-destructive focus:text-destructive"
            onSelect={() => console.log('ok')}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};
