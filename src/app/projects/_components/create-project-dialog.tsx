'use client';

import { FunctionComponent, useCallback, useMemo } from 'react';

import { Dialog, DialogContent, TextField } from '@mui/material';
import { DialogHeader } from '@/components/dialog-header';
import { Button } from '@/components/button';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { isEmpty } from 'lodash';
import { useMutation } from '@tanstack/react-query';

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

const createProject = async (data: FormValues) => {
  const response = await fetch('/api/projects', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  const responseData = await response.json();
  return responseData;
};

export const CreateProjectDialog: FunctionComponent<CreateProjectDialogProps> = ({ open, onClose }) => {
  const { control, formState, handleSubmit, reset } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(createProjectSchema)
  });

  const { isValid, dirtyFields, errors } = formState;

  const handleCloseDialog = useCallback(() => {
    reset(defaultValues);
    onClose?.();
  }, [onClose, reset]);

  const onSuccess = useCallback(() => {
    handleCloseDialog();
    // TODO: Create toast provider
    alert('Created successfully');
  }, [handleCloseDialog]);

  const { isLoading, mutate } = useMutation({
    mutationFn: createProject,
    onSuccess
  });

  const isSubmitButtonDisabled = useMemo(() => {
    return isEmpty(dirtyFields) || !isValid || isLoading;
  }, [dirtyFields, isValid, isLoading]);

  const onSubmit = useCallback((formData: FormValues) => mutate(formData), [mutate]);

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
          <Button type="submit" disabled={isSubmitButtonDisabled} loading={isLoading}>
            Send
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
