'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { statuses } from '@/constants/task-statuses';
import { reorderTasksOnDrop } from '@/utils/dnd/reorders-tasks-on-drop';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Project, Task } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';

import { StatusColumn } from './status-column';

interface KanbanBoardProps {
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

export const KanbanBoard = ({ tasks: initialState }: KanbanBoardProps) => {
  const router = useRouter();
  const { projectId }: { projectId: string } = useParams();

  const [tasks, setTasks] = useState(initialState);

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="h-full w-full rounded-lg border">
        <div className="flex h-full w-full gap-4 overflow-x-auto p-3">
          {statuses.map((status) => (
            <StatusColumn key={status} status={status} data={tasks} />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};
