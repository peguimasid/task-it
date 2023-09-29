import { DropResult } from '@hello-pangea/dnd';
import { Task } from '@prisma/client';

function updateTasks(tasks: Task[], columnTasksReordered: Task[]) {
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

function reorderInSameColumn(dropResult: DropResult, tasks: Task[], movedTask: Task) {
  const { destination, source } = dropResult;

  const columnTasks = tasks.filter((task) => task.status === destination?.droppableId);

  columnTasks.splice(source.index, 1);
  columnTasks.splice(destination!.index, 0, movedTask);

  const columnTasksReordered = columnTasks.map((task, index) => ({ ...task, index }));

  return updateTasks(tasks, columnTasksReordered);
}

function reorderBetweenColumns(dropResult: DropResult, tasks: Task[], movedTask: Task) {
  const { destination, source } = dropResult;

  const sourceColumnTasks = tasks.filter((task) => task.status === source.droppableId);
  const destinationColumnTasks = tasks.filter((task) => task.status === destination!.droppableId);

  sourceColumnTasks.splice(source.index, 1);
  destinationColumnTasks.splice(destination!.index, 0, movedTask);

  const sourceColumnTasksReordered = sourceColumnTasks.map((task, index) => ({
    ...task,
    index
  }));

  const destinationColumnTasksReordered = destinationColumnTasks.map((task, index) => ({
    ...task,
    index,
    status: destination!.droppableId
  }));

  return updateTasks(tasks, [...sourceColumnTasksReordered, ...destinationColumnTasksReordered]);
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
    return reorderBetweenColumns(dropResult, tasks, movedTask);
  }

  return reorderInSameColumn(dropResult, tasks, movedTask);
}
