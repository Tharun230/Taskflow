import { Link } from 'react-router-dom';

const BoardCard = ({ board, onDelete }) => (
  <div className="group relative bg-white border border-ink/10 rounded-xl p-5 hover:border-accent/50 hover:shadow-sm transition">
    <Link to={`/boards/${board._id}`} className="block">
      <h3 className="font-display font-bold text-lg mb-1 pr-6">{board.title}</h3>
      <p className="text-sm text-ink/50 line-clamp-2">
        {board.description || 'No description yet.'}
      </p>
    </Link>
    <button
      onClick={() => onDelete(board._id)}
      className="absolute top-4 right-4 text-ink/30 hover:text-clay opacity-0 group-hover:opacity-100 transition text-sm"
      aria-label="Delete board"
    >
      ✕
    </button>
  </div>
);

export default BoardCard;
