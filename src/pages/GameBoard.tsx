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
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="comic-title text-2xl text-yellow-400">LOADING...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] pt-20 pb-12 px-4 speed-lines">
      {/* Confetti on game completion */}
      <Confetti isActive={isGameComplete} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="comic-title text-4xl sm:text-5xl text-yellow-400 mb-2">
            {theme.name.toUpperCase()} THEME!
          </h1>
          <p className="text-cyan-400 font-bold uppercase">Find all matching pairs! 🎯</p>
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
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="comic-panel bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-center max-w-md mx-4 animate-bounce-in">
              <div className="action-word text-5xl mb-4">BOOM!</div>
              <div className="w-24 h-24 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6 border-4 border-black">
                <span className="text-5xl">🎉</span>
              </div>
              <h2 className="comic-title text-4xl text-white mb-4">
                YOU WIN!
              </h2>
              <p className="text-white font-bold mb-6 text-lg">
                Finished in <span className="text-yellow-300">{turns} TURNS</span> and{' '}
                <span className="text-yellow-300">{formattedTime}</span>!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleReset}>
                  🔄 PLAY AGAIN!
                </Button>
                <Link to="/themes">
                  <Button variant="secondary">
                    🎨 CHANGE THEME
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
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button variant="danger" onClick={handleReset}>
            🔄 RESET GAME
          </Button>
          <Link to="/themes">
            <Button variant="outline">
              ← BACK TO THEMES
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
