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
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { toast } from './ui/use-toast';

interface ProjectOperationsProps {
  project: Pick<Project, 'id'>;
}

const deleteProject = async (projectId: Project['id']): Promise<void> => {
  await fetch(`/api/projects/${projectId}`, {
    method: 'DELETE'
  });
};

export const ProjectOperations = ({ project }: ProjectOperationsProps) => {
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
      description: 'Your project was not deleted. Please try again.',
      variant: 'destructive'
    });
  }, []);

  const { isLoading, mutate } = useMutation({
    mutationFn: deleteProject,
    onSuccess,
    onError
  });

  const handleClickDelete = useCallback(() => {
    mutate(project.id);
  }, [mutate, project]);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Icons.moreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            className="cursor-pointer text-destructive focus:text-destructive"
            onSelect={openAlertDialog}
          >
            <Icons.trash className="mr-2 h-4 w-4" />
            <p>Delete project</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>All project data and tasks will be lost forever!</AlertDialogDescription>
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
