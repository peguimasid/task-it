'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';

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
import { Button, ButtonProps } from './ui/button';
import { toast } from './ui/use-toast';

interface PermanentDeleteTasksButtonProps extends ButtonProps {
  project: Pick<Project, 'id'>;
}

const permanentDeleteTasks = async (projectId: Project['id']): Promise<void> => {
  await fetch(`/api/projects/${projectId}/tasks/permanent-delete-all`, {
    method: 'DELETE'
  });
};

export const PermanentDeleteTasksButton = ({ project, ...rest }: PermanentDeleteTasksButtonProps) => {
  const router = useRouter();

  const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false);

  const openAlertDialog = useCallback(() => {
    setAlertDialogOpen(true);
  }, []);

  const onSuccess = useCallback(() => {
    router.refresh();
  }, [router]);

  const onError = useCallback(() => {
    toast({
      title: 'Something went wrong.',
      description: 'Tasks could not be deleted. Please try again.',
      variant: 'destructive'
    });
  }, []);

  const { isLoading, mutate } = useMutation({
    mutationFn: permanentDeleteTasks,
    onSuccess,
    onError
  });

  return (
    <>
      <Button variant="destructive" onClick={openAlertDialog} className="flex flex-row items-center gap-2" {...rest}>
        <Icons.trash className="h-4 w-4" />
        <p>Delete all</p>
      </Button>
      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this project?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => mutate(project.id)} className="bg-red-600 focus:ring-red-600">
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
