import { useCallback, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTaskSheet } from '@/contexts/task-sheet-provider';
import { Project, Task } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useTaskStore } from '@/store/task-store';

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
import { ContextMenuContent, ContextMenuItem } from './ui/context-menu';

interface TaskContextMenuContentProps {
  task: Task;
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

export const TaskContextMenuContent = ({ task }: TaskContextMenuContentProps) => {
  const router = useRouter();
  const { projectId }: { projectId: string } = useParams();

  const { openSheet } = useTaskSheet();

  const onDeleteTask = useTaskStore((store) => store.onDeleteTask);

  const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false);

  const openAlertDialog = useCallback(() => {
    setAlertDialogOpen(true);
  }, []);

  const openTaskSheet = useCallback(() => {
    openSheet(task.id);
  }, [openSheet, task.id]);

  const onSuccess = useCallback(() => {
    onDeleteTask(task.id);
    router.refresh();
  }, [onDeleteTask, task.id, router]);

  const onError = useCallback(() => {
    toast.error('Something went wrong.', {
      description: 'Your task was not deleted. Please try again.'
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

  return (
    <>
      <ContextMenuContent>
        <ContextMenuItem className="cursor-pointer" onSelect={openTaskSheet}>
          <Icons.pencil className="mr-2 h-4 w-4" />
          Edit
        </ContextMenuItem>
        <ContextMenuItem className="cursor-pointer text-destructive focus:text-destructive" onSelect={openAlertDialog}>
          <Icons.trash className="mr-2 h-4 w-4" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
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
