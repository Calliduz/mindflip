import type { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick: (card: CardType) => void;
  disabled?: boolean;
}

export function Card({ card, onClick, disabled }: CardProps) {
  const handleClick = () => {
    if (!disabled) {
      onClick(card);
    }
  };

  return (
    <div
      className="card-container w-full aspect-square cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={`
          card-inner w-full h-full
          ${card.isFlipped || card.isMatched ? 'flipped' : ''}
          ${card.isMatched ? 'matched' : ''}
        `}
      >
        {/* Card Back - Comic Style */}
        <div className="card-face card-back bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center overflow-hidden halftone">
          {/* Decorative inner border */}
          <div className="absolute inset-2.5 border-2 border-white/30 rounded-xl" />
          
          {/* Question mark */}
          <span className="comic-title text-5xl sm:text-6xl text-white select-none">?</span>
          
          {/* Corner decorations */}
          <span className="absolute top-2 left-2 text-yellow-300 text-xs animate-twinkle opacity-80">★</span>
          <span className="absolute top-2 right-2 text-cyan-300 text-xs animate-twinkle opacity-80" style={{ animationDelay: '0.7s' }}>★</span>
          <span className="absolute bottom-2 left-2 text-pink-200 text-xs animate-twinkle opacity-80" style={{ animationDelay: '1.4s' }}>★</span>
          <span className="absolute bottom-2 right-2 text-green-300 text-xs animate-twinkle opacity-80" style={{ animationDelay: '2.1s' }}>★</span>
        </div>

        {/* Card Front - Shows Image */}
        <div
          className={`
            card-face card-front flex items-center justify-center
            ${card.isMatched 
              ? 'border-green-400 shadow-[5px_5px_0_#22c55e] bg-green-50' 
              : 'bg-white'
            }
          `}
        >
          <img
            src={card.imageUrl}
            alt="Card"
            className="w-full h-full object-cover"
            draggable={false}
          />
          
          {/* Match indicator */}
          {card.isMatched && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute inset-0 bg-green-400/20" />
              <span className="text-green-500 text-4xl font-bold drop-shadow-lg animate-bounce-in">✓</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
