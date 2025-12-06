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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e] border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center border-4 border-black shadow-[4px_4px_0_#000] group-hover:shadow-[6px_6px_0_#000] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-all">
              <span className="text-2xl">🧠</span>
            </div>
            <span className="comic-title text-2xl bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              MINDFLIP
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-150
                  border-3 
                  ${
                    isActive(link.path)
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black border-black shadow-[4px_4px_0_#000]'
                      : 'text-gray-300 hover:text-white border-transparent hover:border-black hover:bg-purple-600 hover:shadow-[4px_4px_0_#000]'
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
              <span className="premium-badge px-4 py-1 rounded-lg text-sm font-bold text-black uppercase">
                ⭐ PREMIUM
              </span>
            )}
            {user && (
              <span className="text-sm text-gray-400 font-bold">
                {user.email}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
