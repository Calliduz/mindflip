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

  // Get the selected theme
  const theme = themeId ? getThemeById(themeId) : undefined;

  // Redirect if theme not found or premium theme accessed without premium
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

  // Game logic hook
  const {
    cards,
    turns,
    isGameComplete,
    isProcessing,
    handleCardClick,
    resetGame,
  } = useGameLogic(theme?.cardImages || []);

  // Timer hook
  const { formattedTime, start, reset: resetTimer } = useTimer();

  // Start game and timer when cards are first clicked
  const onCardClick = (card: typeof cards[0]) => {
    if (!gameStarted) {
      setGameStarted(true);
      start();
    }
    handleCardClick(card);
  };

  // Handle game reset
  const handleReset = () => {
    resetGame();
    resetTimer();
    setGameStarted(false);
  };

  // Calculate matched pairs
  const matchedPairs = cards.filter((card) => card.isMatched).length / 2;
  const totalPairs = cards.length / 2;

  if (isPremiumLoading || !theme) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-violet-950 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading game...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-violet-950 to-gray-900 pt-20 pb-12 px-4">
      {/* Confetti on game completion */}
      <Confetti isActive={isGameComplete} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              {theme.name} Theme
            </span>
          </h1>
          <p className="text-gray-400">Find all matching pairs!</p>
        </div>

        {/* Game Stats */}
        <div className="mb-8">
          <GameStats
            turns={turns}
            formattedTime={formattedTime}
            matchedPairs={matchedPairs}
            totalPairs={totalPairs}
          />
        </div>

        {/* Game Complete Overlay */}
        {isGameComplete && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm animate-fade-in">
            <div className="glass rounded-3xl p-8 text-center max-w-md mx-4 animate-bounce-in">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                <span className="text-4xl">🎉</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Congratulations!
              </h2>
              <p className="text-gray-400 mb-6">
                You completed the game in <span className="text-violet-400 font-semibold">{turns} turns</span> and{' '}
                <span className="text-violet-400 font-semibold">{formattedTime}</span>!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={handleReset}>
                  🔄 Play Again
                </Button>
                <Link to="/themes">
                  <Button variant="outline">
                    🎨 Change Theme
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Card Grid */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
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
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="secondary" onClick={handleReset}>
            🔄 Reset Game
          </Button>
          <Link to="/themes">
            <Button variant="outline">
              ← Back to Themes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
