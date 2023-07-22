'use client';

import { FunctionComponent, useCallback, useMemo } from 'react';

import { Dialog, DialogContent, TextField } from '@mui/material';
import { DialogHeader } from '../dialog-header';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { isEmpty } from 'lodash';

const createProjectSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(30, { message: 'Name can have at most 30 characters' }),
  description: z.string().max(200, { message: 'Can you keep under 200 characters please?' }).optional()
});

const defaultValues = {
  name: '',
  description: ''
};

type FormValues = z.infer<typeof createProjectSchema>;

interface CreateProjectDialogProps {
  open: boolean;
  onClose?: () => void;
}

export const CreateProjectDialog: FunctionComponent<CreateProjectDialogProps> = ({ open, onClose }) => {
  const { control, formState, handleSubmit, reset } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(createProjectSchema)
  });

  const { isValid, dirtyFields, errors } = formState;

  const isSubmitButtonDisabled = useMemo(() => {
    return isEmpty(dirtyFields) || !isValid;
  }, [dirtyFields, isValid]);

  const handleCloseDialog = useCallback(() => {
    reset(defaultValues);
    onClose?.();
  }, [onClose, reset]);

  const onSubmit = useCallback((data: FormValues) => {
    console.log(data);
  }, []);

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="xs" fullWidth disableRestoreFocus>
      <DialogHeader onClose={handleCloseDialog}>Create Project</DialogHeader>
      <DialogContent>
        <form
          name="createProjectForm"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-3 py-2"
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                autoFocus
                type="text"
                fullWidth
                label="Name"
                required
                error={!!errors.name}
                helperText={errors?.name?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                multiline
                type="text"
                fullWidth
                label="Description"
                error={!!errors.description}
                helperText={errors?.description?.message ?? "This is optional, but it's nice to have :)"}
              />
            )}
          />
          <button
            type="submit"
            disabled={isSubmitButtonDisabled}
            className="flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-3 py-3 pr-5 transition-all disabled:opacity-60"
          >
            <p>Send</p>
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
