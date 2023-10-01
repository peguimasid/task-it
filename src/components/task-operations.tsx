'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useTaskStore } from '@/store/task-store';
import { Project, Task } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { MoreHorizontal } from 'lucide-react';

import { Icons } from './icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from './ui/alert-dialog';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import { toast } from './ui/use-toast';

interface TaskOperationsProps {
  task: Pick<Task, 'id'>;
}

interface DeleteTaskProps {
  projectId: Project['id'];
  taskId: Task['id'];
}

const deleteTask = async ({ projectId, taskId }: DeleteTaskProps): Promise<void> => {
  await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
    method: 'DELETE'
  });
};

export const TaskOperations = ({ task }: TaskOperationsProps) => {
  const router = useRouter();

  const { projectId }: { projectId: string } = useParams();

  const onDeleteTask = useTaskStore((store) => store.onDeleteTask);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false);

  const openAlertDialog = useCallback(() => {
    setAlertDialogOpen(true);
  }, []);

  const onSuccess = useCallback(() => {
    onDeleteTask(task.id);
    router.refresh();
  }, [router, onDeleteTask, task]);

  const onError = useCallback(() => {
    toast({
      title: 'Something went wrong.',
      description: 'Your task was not deleted. Please try again.',
      variant: 'destructive'
    });
  }, []);

  const { isLoading, mutate } = useMutation({
    mutationFn: deleteTask,
    onSuccess,
    onError
  });

  const handleClickDelete = useCallback(() => {
    const taskId = task.id;
    mutate({ projectId, taskId });
  }, [task, mutate, projectId]);

  const onOpenChange = useCallback((open: boolean) => {
    setIsDropdownOpen(open);
  }, []);

  return (
    <>
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
            <DropdownMenuItem>
              <Link href={{ query: { task: task.id } }} className="flex w-full">
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:text-destructive"
              onSelect={openAlertDialog}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this task?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClickDelete} className="bg-red-600 focus:ring-red-600">
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
