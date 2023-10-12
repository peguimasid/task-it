import { Task } from '@prisma/client';

interface EditTaskFormProps {
  task: Task;
}

export const EditTaskForm = ({ task }: EditTaskFormProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-16 w-full rounded-lg border" />
      <div className="relative mb-[calc(30vh)] min-h-[400px] w-full rounded-lg border"></div>
    </div>
  );
};
