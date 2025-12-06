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
        relative cursor-pointer rounded-2xl overflow-hidden theme-card
        border-4 border-black
        ${isLocked ? 'shadow-[8px_8px_0_#000]' : 'shadow-[8px_8px_0_#22c55e]'}
      `}
    >
      {/* Preview Image */}
      <div className="aspect-[4/3] relative overflow-hidden bg-gray-900">
        <img
          src={theme.previewImage}
          alt={theme.name}
          className={`w-full h-full object-cover transition-all ${isLocked ? 'opacity-40 grayscale' : ''}`}
        />
        
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        {/* Lock */}
        {isLocked && (
          <div className="absolute inset-0 lock-container flex items-center justify-center">
            <div className="w-14 h-14 rounded-xl bg-gray-800 flex items-center justify-center border-3 border-black shadow-[4px_4px_0_#000]">
              <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        )}

        {/* Badge */}
        <div className="absolute top-2.5 right-2.5">
          {theme.isPremium ? (
            <span className="premium-badge px-2.5 py-1 rounded-lg text-[10px] text-black">⭐ PRO</span>
          ) : (
            <span className="free-badge px-2.5 py-1 rounded-lg text-[10px] text-black">✓ FREE</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className="comic-title text-xl text-white mb-0.5">{theme.name}</h3>
        <p className="text-gray-300 text-xs font-medium mb-2 line-clamp-1">{theme.description}</p>
        
        {/* Button */}
        <div className={`
          py-2 rounded-xl text-center font-bold text-xs uppercase tracking-wide
          border-3 border-black
          ${isLocked
            ? 'bg-gray-600 text-white'
            : 'bg-gradient-to-r from-green-400 to-emerald-500 text-black'
          }
        `}>
          {isLocked ? '🔓 Unlock' : '▶ Play'}
        </div>
      </div>
    </div>
  );
}
