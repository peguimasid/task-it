'use client';

import { FunctionComponent } from 'react';

import { Button, Dialog, DialogContent, TextField } from '@mui/material';
import { DialogHeader } from '../dialog-header';

interface CreateProjectDialogProps {
  open: boolean;
  onClose?: () => void;
}

export const CreateProjectDialog: FunctionComponent<CreateProjectDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogHeader onClose={onClose}>Create Project</DialogHeader>
      <DialogContent>
        <div className="flex flex-col space-y-2 py-2">
          <h1>Here we create the project</h1>
        </div>
      </DialogContent>
    </Dialog>
  );
};
