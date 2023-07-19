'use client';

import { FunctionComponent, useCallback, useState } from 'react';

import { Icon } from '@mui/material';
import { CreateProjectDialog } from './create-project-dialog';

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
        <Icon>add</Icon>
        <p>Create project</p>
      </button>
    </>
  );
};
