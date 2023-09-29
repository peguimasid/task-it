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
