import { Link, useLocation } from 'react-router-dom';
import { usePremiumStatus } from '../hooks/usePremiumStatus';

export function Navbar() {
  const location = useLocation();
  const { isPremium, user } = usePremiumStatus();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/themes', label: 'Themes' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <span className="text-xl">🧠</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              MindFlip
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${
                    isActive(link.path)
                      ? 'bg-violet-500/20 text-violet-300'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Status */}
          <div className="flex items-center space-x-3">
            {isPremium && (
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-xs font-semibold text-white shadow-lg shadow-amber-500/30">
                ⭐ Premium
              </span>
            )}
            {user && (
              <span className="text-sm text-gray-400">
                {user.email}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
