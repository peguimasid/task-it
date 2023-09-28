import { DropResult } from '@hello-pangea/dnd';
import { Task } from '@prisma/client';

function reorderInSameColumn(dropResult: DropResult, tasks: Task[], movedTask: Task) {
  const { destination, source } = dropResult;

  const newTasks = tasks.filter((t) => t.status === destination!.droppableId);

  newTasks.splice(source.index, 1);
  newTasks.splice(destination!.index, 0, movedTask);

  return newTasks.map((task, index) => ({
    ...task,
    index
  }));
}

export function reorderTasksOnDrop(dropResult: DropResult, tasks: Task[]) {
  const { destination, source, draggableId } = dropResult;

  if (!destination) return;

  const hasChangedColumn = destination.droppableId !== source.droppableId;
  const hasChangedIndex = destination.index !== source.index;
  const hasChangedLocation = hasChangedColumn || hasChangedIndex;

  if (!hasChangedLocation) return;

  const movedTask = tasks.find((task) => task.id === draggableId) as Task;

  if (hasChangedIndex && hasChangedColumn) {
    // return reordedBetweenColumns(dropResult, tasks, movedTask);
    return;
  }

  return reorderInSameColumn(dropResult, tasks, movedTask);
}
