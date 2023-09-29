import { z } from 'zod';

export const taskPatchSchema = z.object({
  tasks: z.array(
    z.object({
      id: z.string(),
      index: z.number(),
      status: z.string()
    })
  )
});

export const taskPostSchema = z.object({
  status: z.string(),
  title: z
    .string()
    .min(1, { message: 'This field is required' })
    .max(500, { message: 'Title can have at most 500 characters' })
});
