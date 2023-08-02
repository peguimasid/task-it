'use client';

import { FunctionComponent, useCallback, useState } from 'react';

import { CreateProjectDialog } from './create-project-dialog';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

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
        <Plus className="h-5 w-5" />
        <p>Create project</p>
      </Button>
    </>
  );
};
