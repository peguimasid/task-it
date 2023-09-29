import { DropResult } from '@hello-pangea/dnd';
import { Task } from '@prisma/client';

function reorderInSameColumn(dropResult: DropResult, tasks: Task[], movedTask: Task) {
  const { destination, source } = dropResult;

  const columnTasks = tasks.filter((task) => task.status === destination?.droppableId);

  columnTasks.splice(source.index, 1);
  columnTasks.splice(destination!.index, 0, movedTask);

  const columnTasksReordered = columnTasks.map((task, index) => ({ ...task, index }));

  const tasksReordered = tasks?.map((task) => {
    const updatedTask = columnTasksReordered.find((ticket) => ticket.id === task.id);

    if (!updatedTask) return task;

    return {
      ...task,
      ...updatedTask
    };
  });

  tasksReordered.sort((a, b) => a.index - b.index);

  return tasksReordered ?? [];
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
