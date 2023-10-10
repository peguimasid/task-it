import { z } from 'zod';

export const projectPatchSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(30, { message: 'Name can have at most 30 characters' })
});
