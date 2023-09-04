export const KanbanBoard = () => {
  return (
    <div className="h-full w-full rounded-lg border">
      <div className="flex h-full w-full gap-4 overflow-x-auto p-3">
        {/* COLUM */}
        <div className="h-full min-w-[300px] space-y-3 rounded-sm bg-muted p-3">
          <div className="flex w-full flex-row justify-between">
            <h1>TODO</h1>
            <button>+</button>
          </div>
          <div id="task" className="h-20 w-full bg-blue-900" />
          <div id="task" className="h-20 w-full bg-blue-900" />
          <div id="task" className="h-20 w-full bg-blue-900" />
          <div id="task" className="h-20 w-full bg-blue-900" />
          <div id="task" className="h-20 w-full bg-blue-900" />
          <div id="task" className="h-20 w-full bg-blue-900" />
          <div id="task" className="h-20 w-full bg-blue-900" />
          <div id="task" className="h-20 w-full bg-blue-900" />
          <div id="task" className="h-20 w-full bg-blue-900" />
        </div>
        {/* COLUM */}
      </div>
    </div>
  );
};
