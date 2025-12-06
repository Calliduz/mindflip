import type { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick: (card: CardType) => void;
  disabled?: boolean;
}

export function Card({ card, onClick, disabled }: CardProps) {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card);
    }
  };

  return (
    <div
      className={`
        card-container w-full aspect-square cursor-pointer
        ${disabled || card.isFlipped || card.isMatched ? 'pointer-events-none' : ''}
        ${card.isMatched ? 'animate-bounce-in' : ''}
      `}
      onClick={handleClick}
    >
      <div
        className={`
          card-inner w-full h-full
          ${card.isFlipped || card.isMatched ? 'flipped' : ''}
        `}
      >
        {/* Card Back (Question Mark) */}
        <div className="card-face card-back bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-xl shadow-violet-500/20 border-2 border-violet-400/30">
          <div className="relative">
            <span className="text-6xl font-bold text-white/90">?</span>
            <div className="absolute inset-0 text-6xl font-bold text-violet-300 blur-sm">?</div>
          </div>
          {/* Decorative patterns */}
          <div className="absolute inset-2 border border-violet-400/20 rounded-lg" />
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-violet-400/40 rounded-tl-lg" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-violet-400/40 rounded-tr-lg" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-violet-400/40 rounded-bl-lg" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-violet-400/40 rounded-br-lg" />
        </div>

        {/* Card Front (Image) */}
        <div
          className={`
            card-face card-front bg-gray-800 flex items-center justify-center
            shadow-xl border-2 overflow-hidden
            ${card.isMatched 
              ? 'border-emerald-400 shadow-emerald-500/30' 
              : 'border-gray-600'
            }
          `}
        >
          <img
            src={card.imageUrl}
            alt="Card"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image doesn't load
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23374151" width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%239CA3AF" font-size="40">🎴</text></svg>';
            }}
          />
          {card.isMatched && (
            <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
              <span className="text-4xl">✓</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
