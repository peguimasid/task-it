'use client';

import { FunctionComponent, useCallback, useState } from 'react';

import { CreateProjectDialog } from './create-project-dialog';

import { PlusIcon } from '@heroicons/react/20/solid';
import { Button } from '@/components/ui/button';

export const CreateProjectButton: FunctionComponent = () => {
  const [createProjectDialogOpen, setCreateProjectDialogOpen] = useState<boolean>(false);

  const handleClickCreateProject = useCallback(() => {
    setCreateProjectDialogOpen(true);
  }, []);

  const onCloseCreateProjectDialog = useCallback(() => {
    setCreateProjectDialogOpen(false);
  }, []);

  return (
    <>
      <CreateProjectDialog open={createProjectDialogOpen} onClose={onCloseCreateProjectDialog} />
      <Button variant="outline" onClick={handleClickCreateProject} className="gap-2">
        <PlusIcon className="h-5 w-5" />
        <p>Create project</p>
      </Button>
    </>
  );
};
