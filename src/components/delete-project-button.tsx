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

interface DeleteProjectButtonProps extends ButtonProps {
  project: Pick<Project, 'id' | 'name'>;
}

const deleteProject = async (projectId: Project['id']): Promise<void> => {
  await fetch(`/api/projects/${projectId}`, {
    method: 'DELETE'
  });
};

export const DeleteProjectButton = ({ project, ...rest }: DeleteProjectButtonProps) => {
  const router = useRouter();

  const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false);

  const openAlertDialog = useCallback(() => {
    setAlertDialogOpen(true);
  }, []);

  const onSuccess = useCallback(() => {
    router.refresh();
    router.push('/projects');
  }, [router]);

  const onError = useCallback(() => {
    toast({
      title: 'Something went wrong.',
      description: 'Your project was not updated. Please try again.',
      variant: 'destructive'
    });
  }, []);

  const { isLoading, mutate } = useMutation({
    mutationFn: () => deleteProject(project.id),
    onSuccess,
    onError
  });

  return (
    <>
      <Button variant="destructive" onClick={openAlertDialog} {...rest}>
        Delete project
      </Button>
      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this project?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => mutate()} className="bg-red-600 focus:ring-red-600">
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
