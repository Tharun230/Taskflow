import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

const Column = ({ column, tasks, onAddTask, onDeleteTask, onEditTask }) => (
  <div className="bg-ink/[0.03] rounded-xl p-3 w-72 shrink-0 flex flex-col max-h-full">
    <div className="flex items-center justify-between mb-3 px-1">
      <h3 className="font-display font-bold text-sm uppercase tracking-wide text-ink/70">
        {column.title}
      </h3>
      <span className="text-xs text-ink/40 bg-ink/5 rounded-full px-2 py-0.5">
        {tasks.length}
      </span>
    </div>

    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`flex-1 overflow-y-auto min-h-[60px] rounded-lg transition ${
            snapshot.isDraggingOver ? 'bg-accentSoft' : ''
          }`}
        >
          {tasks.map((task, index) => (
            <TaskCard
              key={task._id}
              task={task}
              index={index}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>

    <button
      onClick={() => onAddTask(column.id)}
      className="mt-2 text-sm text-ink/40 hover:text-accent text-left px-2 py-1.5 rounded-md hover:bg-white transition"
    >
      + Add task
    </button>
  </div>
);

export default Column;
