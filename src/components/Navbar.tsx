import { Link, useLocation } from 'react-router-dom';
import { usePremiumStatus } from '../hooks/usePremiumStatus';

export function Navbar() {
  const location = useLocation();
  const { isPremium, user } = usePremiumStatus();

  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/themes', label: 'Play', icon: '🎮' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a12]/95 backdrop-blur-md border-b-4 border-black">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center border-3 border-black shadow-[3px_3px_0_#000] group-hover:shadow-[4px_4px_0_#000] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-all">
              <span className="text-lg">🧠</span>
            </div>
            <span className="comic-title text-xl text-yellow-400 hidden sm:block">
              MINDFLIP
            </span>
          </Link>

          {/* Navigation - Center */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    px-4 py-2 rounded-xl font-semibold text-sm transition-all flex items-center gap-1.5
                    ${isActive(link.path)
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black border-3 border-black shadow-[3px_3px_0_#000]'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {isPremium ? (
              <span className="premium-badge px-3 py-1 rounded-lg text-xs text-black">
                ⭐ PRO
              </span>
            ) : (
              <Link to="/unlock">
                <button className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-2 border-black shadow-[2px_2px_0_#000] hover:shadow-[3px_3px_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                  ⭐ GET PRO
                </button>
              </Link>
            )}
            {user && (
              <span className="text-xs text-gray-500 hidden md:block max-w-[100px] truncate">
                {user.email}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
