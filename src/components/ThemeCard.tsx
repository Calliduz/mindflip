import type { Theme } from '../types';

interface ThemeCardProps {
  theme: Theme;
  isLocked: boolean;
  onClick: () => void;
}

export function ThemeCard({ theme, isLocked, onClick }: ThemeCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative group cursor-pointer rounded-2xl overflow-hidden
        transform transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-2xl
        ${isLocked 
          ? 'hover:shadow-violet-500/20' 
          : 'hover:shadow-emerald-500/20'
        }
      `}
    >
      {/* Background Image */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={theme.previewImage}
          alt={theme.name}
          className={`
            w-full h-full object-cover transition-all duration-500
            ${isLocked ? 'filter grayscale' : ''}
            group-hover:scale-110
          `}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%231f2937" width="400" height="300"/><text x="200" y="160" text-anchor="middle" fill="%239CA3AF" font-size="60">${theme.name.charAt(0)}</text></svg>`;
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

        {/* Lock Overlay for Premium */}
        {isLocked && (
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center shadow-xl border border-gray-600">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Premium Badge */}
        {theme.isPremium && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-xs font-bold text-white shadow-lg shadow-amber-500/30">
              ⭐ PREMIUM
            </span>
          </div>
        )}

        {/* Free Badge */}
        {!theme.isPremium && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-xs font-bold text-white shadow-lg shadow-emerald-500/30">
              FREE
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-xl font-bold text-white mb-1">{theme.name}</h3>
        <p className="text-sm text-gray-400 line-clamp-2">{theme.description}</p>
        
        {/* Play Button */}
        <div className={`
          mt-3 py-2 rounded-xl text-center font-semibold text-sm
          transition-all duration-300
          ${isLocked
            ? 'bg-gray-700/80 text-gray-300 group-hover:bg-violet-600 group-hover:text-white'
            : 'bg-emerald-600/80 text-white group-hover:bg-emerald-500'
          }
        `}>
          {isLocked ? '🔓 Unlock to Play' : '▶ Play Now'}
        </div>
      </div>
    </div>
  );
}
