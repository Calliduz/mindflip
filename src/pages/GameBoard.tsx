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
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-yellow-400 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a12] via-[#12121f] to-[#0a0a12] pt-24 pb-10 px-4 speed-lines">
      <Confetti isActive={isGameComplete} />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-5 animate-fade-in">
          <h1 className="comic-title text-3xl sm:text-4xl text-yellow-400 mb-1">
            {theme.name.toUpperCase()}
          </h1>
          <p className="text-cyan-400 font-medium text-sm">
            Click a card to flip it • Click again to unflip
          </p>
        </div>

        {/* Stats */}
        <div className="mb-5">
          <GameStats
            turns={turns}
            formattedTime={formattedTime}
            matchedPairs={matchedPairs}
            totalPairs={totalPairs}
          />
        </div>

        {/* Victory Modal */}
        {isGameComplete && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 sm:p-8 rounded-2xl border-4 border-black shadow-[10px_10px_0_#000] text-center max-w-sm mx-4 animate-bounce-in">
              <span className="action-word text-3xl">BOOM!</span>
              <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mx-auto my-4 border-3 border-black/30">
                <span className="text-5xl">🎉</span>
              </div>
              <h2 className="comic-title text-4xl text-white mb-2">YOU WIN!</h2>
              <p className="text-white font-bold mb-5 text-lg">
                <span className="text-yellow-200">{turns}</span> turns • <span className="text-yellow-200">{formattedTime}</span>
              </p>
              <div className="flex flex-col gap-2.5">
                <Button onClick={handleReset} className="w-full">
                  🔄 PLAY AGAIN
                </Button>
                <Link to="/themes" className="w-full">
                  <Button variant="secondary" className="w-full">
                    🎨 THEMES
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Card Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-lg mx-auto mb-6">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onClick={onCardClick}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3">
          <Button variant="danger" onClick={handleReset}>
            🔄 RESET
          </Button>
          <Link to="/themes">
            <Button variant="outline">← THEMES</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
