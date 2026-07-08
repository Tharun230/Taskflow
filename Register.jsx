import { Draggable } from '@hello-pangea/dnd';

const priorityStyles = {
  low: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-rose-100 text-rose-700',
};

const TaskCard = ({ task, index, onDelete, onEdit }) => (
  <Draggable draggableId={task._id} index={index}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`group bg-white border border-ink/10 rounded-lg p-3 mb-2 cursor-grab active:cursor-grabbing ${
          snapshot.isDragging ? 'shadow-lg ring-2 ring-accent/40' : 'hover:border-accent/40'
        }`}
        onClick={() => onEdit(task)}
      >
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium leading-snug">{task.title}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task._id);
            }}
            className="text-ink/20 hover:text-clay opacity-0 group-hover:opacity-100 transition text-xs shrink-0"
          >
            ✕
          </button>
        </div>
        {task.description && (
          <p className="text-xs text-ink/50 mt-1 line-clamp-2">{task.description}</p>
        )}
        <span
          className={`inline-block mt-2 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>
    )}
  </Draggable>
);

export default TaskCard;
