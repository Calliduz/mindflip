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
    isProcessing,
    handleCardClick,
    resetGame,
  } = useGameLogic(theme?.cardImages || []);

  const { formattedTime, start, reset: resetTimer } = useTimer();

  const onCardClick = (card: typeof cards[0]) => {
    if (!gameStarted) {
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
      <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-yellow-400 font-medium">Loading game...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] pt-24 pb-12 px-4 speed-lines">
      <Confetti isActive={isGameComplete} />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 animate-fade-in">
          <h1 className="comic-title text-4xl sm:text-5xl text-yellow-400 mb-1">
            {theme.name.toUpperCase()}
          </h1>
          <p className="text-cyan-400 font-medium">Find all matching pairs! 🎯</p>
        </div>

        {/* Stats */}
        <div className="mb-6">
          <GameStats
            turns={turns}
            formattedTime={formattedTime}
            matchedPairs={matchedPairs}
            totalPairs={totalPairs}
          />
        </div>

        {/* Victory Overlay */}
        {isGameComplete && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/85 backdrop-blur-sm animate-fade-in">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-3xl border-4 border-black shadow-[10px_10px_0_#000] text-center max-w-sm mx-4 animate-bounce-in">
              <span className="action-word text-4xl block mb-2">BOOM!</span>
              <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4 border-3 border-black/30">
                <span className="text-5xl">🎉</span>
              </div>
              <h2 className="comic-title text-4xl text-white mb-3">YOU WIN!</h2>
              <p className="text-white font-bold mb-6">
                <span className="text-yellow-300">{turns} turns</span> • <span className="text-yellow-300">{formattedTime}</span>
              </p>
              <div className="flex flex-col gap-3">
                <Button onClick={handleReset} className="w-full">
                  🔄 PLAY AGAIN
                </Button>
                <Link to="/themes" className="w-full">
                  <Button variant="secondary" className="w-full">
                    🎨 CHANGE THEME
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Card Grid */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3 max-w-xl mx-auto mb-8">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onClick={onCardClick}
              disabled={isProcessing}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="danger" onClick={handleReset}>
            🔄 RESET
          </Button>
          <Link to="/themes">
            <Button variant="outline">
              ← THEMES
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
