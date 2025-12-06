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
          <p className="comic-title text-3xl text-yellow-400 tracking-widest">LOADING...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a12] via-[#12121f] to-[#0a0a12] pt-24 pb-12 px-4 speed-lines flex flex-col">
      <Confetti isActive={isGameComplete} />

      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block relative">
            <h1 className="comic-title text-5xl sm:text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-orange-500 drop-shadow-[4px_4px_0_#000] mb-2 transform -rotate-2">
              {theme.name.toUpperCase()}
            </h1>
            <span className="absolute -top-6 -right-8 text-4xl animate-bounce-in" style={{ animationDelay: '0.5s' }}>⚡</span>
          </div>
          <div className="mt-2 bg-black/40 inline-block px-4 py-1.5 rounded-full backdrop-blur-sm border-2 border-white/10">
            <p className="text-cyan-300 font-bold text-sm tracking-wide">
              CLICK CARD TO FLIP • CLICK AGAIN TO UNFLIP
            </p>
          </div>
        </div>

        {/* Stats Section - Now bigger and better */}
        <div className="mb-8">
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
              {/* Starburst background for modal */}
              <div className="absolute inset-0 starburst opacity-20 pointer-events-none"></div>
              
              <div className="relative z-10">
                <span className="action-word text-6xl block mb-4 transform -rotate-6">VICTORY!</span>
                
                <div className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6 border-4 border-black shadow-[4px_4px_0_#000] animate-pulse-glow">
                  <span className="text-6xl">🏆</span>
                </div>
                
                <h2 className="comic-subtitle text-2xl text-white mb-2 font-black uppercase tracking-wider">Mission Complete!</h2>
                <div className="bg-black/30 rounded-xl p-4 mb-8">
                  <p className="text-white font-bold text-xl flex justify-center gap-6">
                    <span>⏱️ <span className="text-yellow-300">{formattedTime}</span></span>
                    <span>🔄 <span className="text-yellow-300">{turns}</span> Turns</span>
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

        {/* Card Grid - EXPANDED SIZE */}
        {/* Changed max-w from lg to 4xl and gap to larger values */}
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
          <Button variant="danger" onClick={handleReset} className="min-w-[140px]">
            🔄 RESET
          </Button>
          <Link to="/themes">
            <Button variant="outline" className="min-w-[140px]">
              ← EXIT
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
