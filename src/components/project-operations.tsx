'use client';

import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';

import { Icons } from './icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from './ui/use-toast';

interface ProjectOperationsProps {
  project: Pick<Project, 'id' | 'name'>;
}

const deleteProject = async (projectId: Project['id']): Promise<void> => {
  await fetch(`/api/projects/${projectId}`, {
    method: 'DELETE'
  });
};

export const ProjectOperations = ({ project }: ProjectOperationsProps) => {
  const router = useRouter();

  const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const openAlertDialog = useCallback(() => {
    setAlertDialogOpen(true);
  }, []);

  const handleChangeAlertDialogOpen = useCallback((open: boolean) => {
    setInputValue('');
    setAlertDialogOpen(open);
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

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }, []);

  const isDeleteButtonDisabled = useMemo(() => {
    return inputValue !== project.name || isLoading;
  }, [inputValue, project, isLoading]);

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
      <AlertDialog open={alertDialogOpen} onOpenChange={handleChangeAlertDialogOpen}>
        <AlertDialogContent className="p-0">
          <AlertDialogHeader className="px-4 pt-4">
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex w-full items-center bg-destructive/20 p-4 text-red-600">
            <p className="text-sm">Unexpected bad thing will happen if you don&apos;t read this!</p>
          </div>
          <div className="px-4 text-sm text-muted-foreground">
            This will permanently delete the <span className="font-bold text-primary">{project.name}</span> project and
            delete all tasks associated to it. This action <span className="font-bold text-primary">CANNOT</span> be
            undone.
          </div>
          <div className="flex w-full flex-col gap-2 px-4">
            <Label htmlFor="project-name">Please type in the name of the project to confirm</Label>
            <Input type="project-name" id="project-name" onChange={handleInputChange} />
          </div>
          <AlertDialogFooter className="px-4 pb-4">
            <AlertDialogCancel className="w-1/2">Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleteButtonDisabled}
              onClick={handleClickDelete}
              className="w-1/2 bg-red-600 focus:ring-red-600"
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete project</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
