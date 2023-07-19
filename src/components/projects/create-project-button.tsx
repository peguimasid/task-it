'use client';

import { FunctionComponent } from 'react';

import AddIcon from '@mui/icons-material/Add';

export const CreateProjectButton: FunctionComponent = () => {
  return (
    <button className="flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-3 py-2 pr-5">
      <AddIcon />
      <p>Create project</p>
    </button>
  );
};
