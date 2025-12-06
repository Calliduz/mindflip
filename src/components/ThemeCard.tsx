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
        relative cursor-pointer rounded-2xl overflow-hidden
        border-4 border-black theme-card-hover
        ${isLocked 
          ? 'shadow-[8px_8px_0_#000]' 
          : 'shadow-[8px_8px_0_#22c55e]'
        }
      `}
    >
      {/* Background Image */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={theme.previewImage}
          alt={theme.name}
          className={`
            w-full h-full object-cover transition-all duration-300
            ${isLocked ? 'filter grayscale brightness-50' : ''}
          `}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%238b5cf6"/><stop offset="100%" style="stop-color:%23ec4899"/></linearGradient></defs><rect fill="url(%23g)" width="400" height="300"/><text x="200" y="160" text-anchor="middle" fill="white" font-size="80" font-family="Arial Black">${theme.name.charAt(0)}</text></svg>`;
          }}
        />
        
        {/* Halftone overlay */}
        <div className="absolute inset-0 halftone" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Lock Overlay for Premium */}
        {isLocked && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="comic-lock w-16 h-16 rounded-xl flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Premium Badge */}
        {theme.isPremium && (
          <div className="absolute top-3 right-3">
            <span className="premium-badge px-3 py-1 rounded-lg text-xs font-bold text-black uppercase">
              ⭐ PREMIUM
            </span>
          </div>
        )}

        {/* Free Badge */}
        {!theme.isPremium && (
          <div className="absolute top-3 right-3">
            <span className="free-badge px-3 py-1 rounded-lg text-xs font-bold text-black uppercase">
              ✓ FREE
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="comic-title text-2xl text-white mb-1">{theme.name}</h3>
        <p className="text-sm text-gray-300 font-bold line-clamp-2">{theme.description}</p>
        
        {/* Play Button */}
        <div className={`
          mt-3 py-2 rounded-xl text-center font-bold text-sm uppercase tracking-wide
          border-3 border-black transition-all duration-200
          ${isLocked
            ? 'bg-gray-600 text-white hover:bg-purple-500'
            : 'bg-gradient-to-r from-green-400 to-emerald-500 text-black hover:from-yellow-400 hover:to-orange-500'
          }
        `}>
          {isLocked ? '🔓 UNLOCK TO PLAY' : '▶ PLAY NOW!'}
        </div>
      </div>
    </div>
  );
}
