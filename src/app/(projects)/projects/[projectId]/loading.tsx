import { statuses } from '@/constants/task-statuses';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className="flex h-full w-full flex-col space-y-8 pt-4">
      <div className="space-y-4">
        <Skeleton className="h-9 w-2/12 min-w-[200px] md:h-10" />
      </div>
      <div className="flex h-full w-full gap-3 overflow-x-auto">
        {Object.keys(statuses).map((status) => (
          <div
            key={status}
            className="h-full w-1/3 min-w-[350px] max-w-[400px] rounded-lg border border-secondary bg-secondary"
          >
            <div className="flex w-full flex-row items-center justify-between rounded-t-lg bg-card p-3">
              <div className="flex items-center gap-2 py-1">
                <Skeleton className="h-5 w-32 rounded-full" />
                <Skeleton className="h-5 w-7 rounded-full" />
              </div>
            </div>
            <div className="w-full space-y-3 p-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="group relative min-h-[6rem] space-y-3 p-3">
                  <Skeleton className="h-4 w-10/12" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-4 w-20 rounded-full" />
                    <Skeleton className="h-4 w-20 rounded-full" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
