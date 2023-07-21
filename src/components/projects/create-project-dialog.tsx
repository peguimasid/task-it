'use client';

import { FunctionComponent } from 'react';

import { Dialog } from '@mui/material';
import { DialogHeader } from '../dialog-header';

interface CreateProjectDialogProps {
  open: boolean;
  onClose?: () => void;
}

export const CreateProjectDialog: FunctionComponent<CreateProjectDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogHeader onClose={onClose}>Create Project</DialogHeader>
      <main className="p-5">
        <h1>Here we create the project</h1>
      </main>
    </Dialog>
  );
};
