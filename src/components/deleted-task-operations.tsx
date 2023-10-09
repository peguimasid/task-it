'use client';

import { useCallback, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { toast } from './ui/use-toast';

interface DeletedTaskOperationsProps {
  task: Pick<Task, 'id'>;
}

interface DeleteTaskProps {
  projectId: Project['id'];
  taskId: Task['id'];
}

const deleteTask = async ({ projectId, taskId }: DeleteTaskProps): Promise<void> => {
  await fetch(`/api/projects/${projectId}/tasks/${taskId}/permanent-delete`, {
    method: 'DELETE'
  });
};

const restoreTask = async ({ projectId, taskId }: DeleteTaskProps): Promise<void> => {
  await fetch(`/api/projects/${projectId}/tasks/${taskId}/recover`, {
    method: 'PATCH'
  });
};

export const DeletedTaskOperations = ({ task }: DeletedTaskOperationsProps) => {
  const router = useRouter();

  const { projectId }: { projectId: string } = useParams();

  const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false);

  const openAlertDialog = useCallback(() => {
    setAlertDialogOpen(true);
  }, []);

  const onDeleteSuccess = useCallback(() => {
    router.refresh();
  }, [router]);

  const onDeleteError = useCallback(() => {
    toast({
      title: 'Something went wrong.',
      description: 'Your task was not deleted. Please try again.',
      variant: 'destructive'
    });
  }, []);

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: onDeleteSuccess,
    onError: onDeleteError
  });

  const onRestoreSuccess = useCallback(() => {
    router.refresh();
  }, [router]);

  const onRestoreError = useCallback(() => {
    toast({
      title: 'Something went wrong.',
      description: 'Your task was not restored. Please try again.',
      variant: 'destructive'
    });
  }, []);

  const restoreTaskMutation = useMutation({
    mutationFn: restoreTask,
    onSuccess: onRestoreSuccess,
    onError: onRestoreError
  });

  const handleClickDelete = useCallback(() => {
    const taskId = task.id;
    deleteTaskMutation.mutate({ projectId, taskId });
  }, [task, deleteTaskMutation, projectId]);

  const handleClickRestore = useCallback(() => {
    const taskId = task.id;
    restoreTaskMutation.mutate({ projectId, taskId });
  }, [task, restoreTaskMutation, projectId]);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="h-6 w-6">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer" onSelect={handleClickRestore}>
            <Icons.history className="mr-2 h-4 w-4" />
            <p>Restore</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-destructive focus:text-destructive"
            onSelect={openAlertDialog}
          >
            <Icons.trash className="mr-2 h-4 w-4" />
            <p>Delete forever</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
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
              {deleteTaskMutation.isLoading ? (
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
