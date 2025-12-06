import { Link, useLocation } from 'react-router-dom';
import { usePremiumStatus } from '../hooks/usePremiumStatus';

export function Navbar() {
  const location = useLocation();
  const { isPremium, user } = usePremiumStatus();

  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/themes', label: 'Themes', icon: '🎨' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f1a]/95 backdrop-blur-md border-b-4 border-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center border-3 border-black shadow-[3px_3px_0_#000] group-hover:shadow-[4px_4px_0_#000] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-all">
              <span className="text-xl">🧠</span>
            </div>
            <span className="comic-title text-2xl text-yellow-400 hidden sm:block">
              MINDFLIP
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-4 py-2 rounded-xl font-bold text-sm transition-all
                  ${isActive(link.path)
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black border-3 border-black shadow-[3px_3px_0_#000]'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                <span className="mr-1">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Status */}
          <div className="flex items-center gap-3">
            {isPremium && (
              <span className="premium-badge px-3 py-1 rounded-lg text-xs text-black hidden sm:inline-flex">
                ⭐ PREMIUM
              </span>
            )}
            {user && (
              <span className="text-xs text-gray-400 font-medium hidden md:block max-w-[120px] truncate">
                {user.email}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
