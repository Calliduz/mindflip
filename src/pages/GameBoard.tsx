import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGameLogic } from '../hooks/useGameLogic';
import { useTimer } from '../hooks/useTimer';
import { usePremiumStatus } from '../hooks/usePremiumStatus';
import { getThemeById } from '../utils/themes';
import { Card } from '../components/Card';
import { GameStats } from '../components/GameStats';
import { Confetti } from '../components/Confetti';
import { Button } from '../components/Button';

export function GameBoard() {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  const { isPremium, isLoading: isPremiumLoading } = usePremiumStatus();
  const [gameStarted, setGameStarted] = useState(false);

  const theme = themeId ? getThemeById(themeId) : undefined;

  useEffect(() => {
    if (!isPremiumLoading) {
      if (!theme) {
        navigate('/themes');
        return;
      }
      if (theme.isPremium && !isPremium) {
        navigate('/unlock');
        return;
      }
    }
  }, [theme, isPremium, isPremiumLoading, navigate]);

  const {
    cards,
    turns,
    isGameComplete,
    handleCardClick,
    resetGame,
  } = useGameLogic(theme?.cardImages || []);

  const { formattedTime, start, reset: resetTimer } = useTimer();

  const onCardClick = (card: typeof cards[0]) => {
    if (!gameStarted && !card.isFlipped && !card.isMatched) {
      setGameStarted(true);
      start();
    }
    handleCardClick(card);
  };

  const handleReset = () => {
    resetGame();
    resetTimer();
    setGameStarted(false);
  };

  const matchedPairs = cards.filter((card) => card.isMatched).length / 2;
  const totalPairs = cards.length / 2;

  if (isPremiumLoading || !theme) {
    return (
      <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-20 h-20 border-8 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="comic-title text-3xl text-yellow-400 tracking-widest text-stroke-black">LOADING...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a12] via-[#12121f] to-[#0a0a12] pt-24 pb-12 px-4 speed-lines flex flex-col">
      <Confetti isActive={isGameComplete} />

      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col">
        {/* Header Section with Comic Styling */}
        <div className="text-center mb-8 animate-fade-in relative z-10">
          
          {/* Main Title - Comic Style */}
          <div className="inline-block relative mb-4">
             {/* Text stroke hack using data attribute for absolute positioning if needed, but using kit-text-stroke */}
             <h1 className="comic-title text-6xl sm:text-7xl md:text-8xl text-yellow-400 text-stroke-thick mb-2 transform -rotate-2 drop-shadow-[5px_5px_0_rgba(0,0,0,1)]">
              {theme.name.toUpperCase()}
            </h1>
            
            {/* Decoration */}
            <span className="absolute -top-4 -right-10 text-5xl text-stroke-black text-cyan-400 animate-bounce-in" style={{ animationDelay: '0.5s' }}>⚡</span>
            
            {/* Comic narration box for instructions */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[120%] -rotate-1">
              <div className="bg-white border-4 border-black box-shadow-[4px_4px_0_#000] p-2 transform rotate-1 shadow-[5px_5px_0_#000]">
                 <p className="text-black font-bold text-sm sm:text-base tracking-wide uppercase font-comic">
                  CLICK CARD TO FLIP • CLICK AGAIN TO UNFLIP
                </p>
              </div>
            </div>
          </div>
          
          {/* Spacer for the absolute narration box */}
          <div className="h-10"></div>
        </div>

        {/* Stats Section */}
        <div className="mb-10">
          <GameStats
            turns={turns}
            formattedTime={formattedTime}
            matchedPairs={matchedPairs}
            totalPairs={totalPairs}
          />
        </div>

        {/* Victory Modal */}
        {isGameComplete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 sm:p-10 rounded-3xl border-[6px] border-black shadow-[15px_15px_0_#000] text-center max-w-md mx-4 animate-bounce-in relative overflow-hidden">
              <div className="absolute inset-0 starburst opacity-20 pointer-events-none"></div>
              
              <div className="relative z-10">
                <span className="action-word text-6xl block mb-4 transform -rotate-6 text-stroke-black">VICTORY!</span>
                
                <div className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6 border-4 border-black shadow-[4px_4px_0_#000] animate-pulse-glow">
                  <span className="text-6xl drop-shadow-md">🏆</span>
                </div>
                
                <h2 className="comic-subtitle text-2xl text-white mb-2 font-black uppercase tracking-wider text-stroke-black">Mission Complete!</h2>
                <div className="bg-black/40 rounded-xl p-4 mb-8 border-2 border-white/20">
                  <p className="text-white font-bold text-xl flex justify-center gap-6">
                    <span className="drop-shadow-md">⏱️ <span className="text-yellow-300">{formattedTime}</span></span>
                    <span className="drop-shadow-md">🔄 <span className="text-yellow-300">{turns}</span> Turns</span>
                  </p>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Button onClick={handleReset} size="lg" className="w-full text-xl shadow-[6px_6px_0_#000]">
                    🔄 PLAY AGAIN
                  </Button>
                  <Link to="/themes" className="w-full">
                    <Button variant="secondary" size="lg" className="w-full text-xl shadow-[6px_6px_0_#000]">
                      🎨 PICK THEME
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card Grid */}
        <div className="flex-1 flex items-center justify-center mb-8">
          <div className="grid grid-cols-4 gap-3 sm:gap-5 md:gap-6 w-full max-w-3xl mx-auto perspective-1000">
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                onClick={onCardClick}
              />
            ))}
          </div>
        </div>

        {/* Footer Controls */}
        <div className="flex justify-center gap-4 mt-auto">
          <Button variant="danger" onClick={handleReset} className="min-w-[140px] text-stroke-black shadow-[4px_4px_0_#000]">
            🔄 RESET
          </Button>
          <Link to="/themes">
            <Button variant="outline" className="min-w-[140px] text-stroke-black">
              ← EXIT
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
