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
        {/* Card Back (Question Mark) - Comic Style */}
        <div className="card-face card-back bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center halftone">
          {/* Comic pattern overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-2 border-4 border-dashed border-white/50 rounded-lg" />
          </div>
          
          {/* Question mark with comic style */}
          <div className="relative">
            <span className="comic-title text-6xl sm:text-7xl text-white drop-shadow-[4px_4px_0_#000]">?</span>
          </div>
          
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 text-yellow-300 text-lg">★</div>
          <div className="absolute top-2 right-2 text-cyan-300 text-lg">★</div>
          <div className="absolute bottom-2 left-2 text-pink-300 text-lg">★</div>
          <div className="absolute bottom-2 right-2 text-green-300 text-lg">★</div>
        </div>

        {/* Card Front (Image) */}
        <div
          className={`
            card-face card-front bg-gray-800 flex items-center justify-center overflow-hidden
            ${card.isMatched 
              ? 'border-green-400 shadow-[6px_6px_0_#22c55e]' 
              : 'border-black shadow-[6px_6px_0_#000]'
            }
          `}
        >
          <img
            src={card.imageUrl}
            alt="Card"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback with comic style emoji
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23374151" width="100" height="100"/><text x="50" y="60" text-anchor="middle" fill="%23fbbf24" font-size="50">🎴</text></svg>';
            }}
          />
          {card.isMatched && (
            <div className="absolute inset-0 bg-green-400/20 flex items-center justify-center">
              <span className="comic-title text-5xl text-white drop-shadow-[3px_3px_0_#000]">✓</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
