import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="border-b border-ink/10 bg-canvas/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-xl font-bold tracking-tight">
          Task<span className="text-accent">Flow</span>
        </Link>
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-ink/60">{user.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm font-medium px-3 py-1.5 rounded-md border border-ink/15 hover:bg-ink/5 transition"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
