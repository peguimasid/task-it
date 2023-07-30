'use client';

import { FunctionComponent, useCallback, useState } from 'react';

import { CreateProjectDialog } from './create-project-dialog';

import { PlusIcon } from '@heroicons/react/20/solid';

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
      <button
        onClick={handleClickCreateProject}
        className="flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-3 py-2 pr-5"
      >
        <PlusIcon className="h-5 w-5" />
        <p>Create project</p>
      </button>
    </>
  );
};