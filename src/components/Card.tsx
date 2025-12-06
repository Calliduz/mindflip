import { useState } from 'react';
import type { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick: (card: CardType) => void;
  disabled?: boolean;
}

// Random POW words for variety
const powWords = ['POW!', 'BAM!', 'ZAP!', 'FLIP!', 'BOOM!', 'WOW!'];

export function Card({ card, onClick }: CardProps) {
  const [showPow, setShowPow] = useState(false);
  const [powWord, setPowWord] = useState('POW!');
  const [powPosition, setPowPosition] = useState({ x: 50, y: 50 });

  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (card.isFlipped || card.isMatched) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate tilt (limit to 12 degrees)
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleClick = () => {
    if (!card.isFlipped && !card.isMatched) {
      setPowWord(powWords[Math.floor(Math.random() * powWords.length)]);
      setPowPosition({
        x: 30 + Math.random() * 40,
        y: 20 + Math.random() * 30,
      });
      setShowPow(true);
      setTimeout(() => setShowPow(false), 500);
    }
    onClick(card);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div 
      className="card-container w-full aspect-square cursor-pointer relative perspective-1000" 
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.x !== 0 ? 1.05 : 1})`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* POW Effect */}
      {showPow && (
        <div
          className="absolute z-20 pointer-events-none animate-pow"
          style={{ left: `${powPosition.x}%`, top: `${powPosition.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <span className="pow-text">{powWord}</span>
        </div>
      )}

      <div
        className={`
          card-inner w-full h-full
          ${card.isFlipped || card.isMatched ? 'flipped' : ''}
          ${card.isMatched ? 'matched' : ''}
        `}
      >
        {/* Card Back - Comic Style */}
        <div className="card-face card-back overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400" />
          
          {/* Glare effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"
            style={{ 
              opacity: Math.abs(tilt.x) + Math.abs(tilt.y) > 0 ? 1 : 0,
              transition: 'opacity 0.2s',
              transform: `translate(${tilt.y * -2}px, ${tilt.x * -2}px)`
            }} 
          />
          
          {/* Animated pattern overlay */}
          <div className="absolute inset-0 card-pattern" />
          
          {/* Halftone dots */}
          <div className="absolute inset-0 halftone" />
          
          {/* Inner decorative border */}
          <div className="absolute inset-2 border-2 border-dashed border-white/30 rounded-xl" />
          
          {/* MindFlip branding */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/50 px-2 py-0.5 rounded-full z-10">
            <span className="text-[8px] font-bold text-yellow-300 tracking-wider">🧠 MINDFLIP</span>
          </div>
          
          {/* Question mark */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="comic-title text-5xl sm:text-6xl text-white select-none animate-pulse-subtle">?</span>
          </div>
          
          {/* Corner stars */}
          <span className="absolute top-1.5 left-1.5 text-yellow-300 text-xs animate-twinkle">★</span>
          <span className="absolute top-1.5 right-1.5 text-cyan-300 text-xs animate-twinkle" style={{ animationDelay: '0.5s' }}>★</span>
          <span className="absolute bottom-1.5 left-1.5 text-pink-200 text-xs animate-twinkle" style={{ animationDelay: '1s' }}>★</span>
          <span className="absolute bottom-1.5 right-1.5 text-green-300 text-xs animate-twinkle" style={{ animationDelay: '1.5s' }}>★</span>
          
          {/* Decorative corner triangles */}
          <div className="absolute top-0 left-0 w-0 h-0 border-l-[20px] border-l-yellow-400/40 border-b-[20px] border-b-transparent" />
          <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[20px] border-r-cyan-400/40 border-t-[20px] border-t-transparent" />
        </div>

        {/* Card Front */}
        <div
          className={`
            card-face card-front flex items-center justify-center
            ${card.isMatched ? 'ring-4 ring-green-400 shadow-[5px_5px_0_#22c55e]' : ''}
          `}
        >
          <img src={card.imageUrl} alt="Card" className="w-full h-full object-cover" draggable={false} />
          
          {/* Match overlay */}
          {card.isMatched && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-green-400/15">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center border-3 border-black shadow-[3px_3px_0_#000] animate-bounce-in">
                <span className="text-white text-2xl font-bold">✓</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
