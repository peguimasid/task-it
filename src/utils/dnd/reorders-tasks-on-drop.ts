import { DropResult } from '@hello-pangea/dnd';
import { Task } from '@prisma/client';

function reorderInSameColumn(dropResult: DropResult, tasks: Task[], movedTask: Task) {
  const { destination, source } = dropResult;

  const newTasks = tasks.filter((task) => task.status === destination?.droppableId);

  console.log(newTasks);

  console.log(source, destination);

  return newTasks;
}

export function reorderTasksOnDrop(dropResult: DropResult, tasks: Task[]) {
  const { destination, source, draggableId } = dropResult;

  if (!destination) return;

  const hasChangedColumn = destination.droppableId !== source.droppableId;
  const hasChangedIndex = destination.index !== source.index;
  const hasChangedLocation = hasChangedColumn || hasChangedIndex;

  if (!hasChangedLocation) return;

  const movedTask = tasks.find((task) => task.id === draggableId) as Task;

  if (hasChangedColumn) {
    // return reorderBetweenColumns(dropResult, tasks, movedTask);
    return;
  }

  return reorderInSameColumn(dropResult, tasks, movedTask);
}
