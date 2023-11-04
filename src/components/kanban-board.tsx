'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Project, Task } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';

import { statuses } from '@/constants/task-statuses';
import { useTaskStore } from '@/store/task-store';
import { reorderTasksOnDrop } from '@/lib/utils/reorder-tasks-on-drop';

import { StatusColumn } from './status-column';

interface KanbanBoardProps {
  projectId: Project['id'];
  tasks: Task[];
}

interface ReorderTasksProps {
  reorderedTasks: Task[];
  projectId: Project['id'];
}

const reorderTasks = async ({ projectId, reorderedTasks }: ReorderTasksProps): Promise<void> => {
  await fetch(`/api/projects/${projectId}/tasks`, {
    method: 'PATCH',
    body: JSON.stringify({ tasks: reorderedTasks })
  });
};

export const KanbanBoard = ({ projectId, tasks: initialTasks }: KanbanBoardProps) => {
  const router = useRouter();

  const { tasks, setTasks } = useTaskStore((store) => {
    return {
      tasks: store?.tasks ?? initialTasks,
      setTasks: store.setTasks
    };
  });

  const dropTaskMutation = useMutation({
    mutationFn: reorderTasks,
    onSettled: router.refresh
  });

  const onDragEnd = (dropResult: DropResult) => {
    const reorderedTasks = reorderTasksOnDrop(dropResult, tasks);
    if (!reorderedTasks?.length) return;
    setTasks(reorderedTasks);
    dropTaskMutation.mutate({ projectId, reorderedTasks });
  };

  useEffect(() => {
    setTasks(initialTasks);
  }, [setTasks, initialTasks]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-full w-full gap-3 overflow-x-auto">
        {statuses.map((status) => (
          <StatusColumn key={status} status={status} data={tasks} />
        ))}
      </div>
    </DragDropContext>
  );
};
