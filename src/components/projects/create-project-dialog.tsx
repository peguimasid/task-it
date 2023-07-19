'use client';

import { FunctionComponent } from 'react';

import { Dialog, DialogProps } from '@mui/material';

type CreateProjectDialogProps = DialogProps;

export const CreateProjectDialog: FunctionComponent<CreateProjectDialogProps> = ({ open, onClose, ...rest }) => {
  return (
    <Dialog open={open} onClose={onClose} {...rest}>
      <main className="p-5">
        <h1>Here we create the project</h1>
      </main>
    </Dialog>
  );
};
