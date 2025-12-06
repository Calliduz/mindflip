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
        {/* Card Back */}
        <div className="card-face card-back bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center overflow-hidden halftone">
          {/* Inner border */}
          <div className="absolute inset-3 border-2 border-white/20 rounded-xl" />
          
          {/* Question mark */}
          <span className="comic-title text-5xl sm:text-6xl text-white drop-shadow-[3px_3px_0_rgba(0,0,0,0.5)]">?</span>
          
          {/* Corner stars */}
          <span className="absolute top-2 left-2 text-yellow-300 text-sm animate-twinkle">★</span>
          <span className="absolute top-2 right-2 text-cyan-300 text-sm animate-twinkle" style={{ animationDelay: '0.5s' }}>★</span>
          <span className="absolute bottom-2 left-2 text-pink-300 text-sm animate-twinkle" style={{ animationDelay: '1s' }}>★</span>
          <span className="absolute bottom-2 right-2 text-green-300 text-sm animate-twinkle" style={{ animationDelay: '1.5s' }}>★</span>
        </div>

        {/* Card Front */}
        <div
          className={`
            card-face card-front bg-white flex items-center justify-center overflow-hidden
            ${card.isMatched 
              ? 'border-green-500 shadow-[5px_5px_0_#22c55e]' 
              : ''
            }
          `}
        >
          <img
            src={card.imageUrl}
            alt="Card"
            className="w-full h-full object-cover"
          />
          {card.isMatched && (
            <div className="absolute inset-0 bg-green-400/25 flex items-center justify-center">
              <span className="text-4xl drop-shadow-lg">✓</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
