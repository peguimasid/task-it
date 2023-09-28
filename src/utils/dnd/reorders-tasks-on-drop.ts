import { DropResult } from '@hello-pangea/dnd';
import { Task } from '@prisma/client';

export function reorderTasksOnDrop(dropResult: DropResult, tasks: Task[]): Task[] {
  return tasks;
}
