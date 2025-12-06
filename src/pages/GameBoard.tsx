import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGameLogic } from '../hooks/useGameLogic';
import { useTimer } from '../hooks/useTimer';
import { usePremiumStatus } from '../hooks/usePremiumStatus';
import { getThemeById } from '../utils/themes';
import { DIFFICULTIES, type DifficultyKey } from '../utils/shuffle';
import { Card } from '../components/Card';
import { GameStats } from '../components/GameStats';
import { Confetti } from '../components/Confetti';
import { Button } from '../components/Button';

export function GameBoard() {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  const { isPremium, isLoading: isPremiumLoading } = usePremiumStatus();
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<DifficultyKey | null>(null);

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

  const pairCount = difficulty ? DIFFICULTIES[difficulty].pairs : 8;

  const {
    cards,
    turns,
    isGameComplete,
    handleCardClick,
    resetGame,
  } = useGameLogic(theme?.cardImages || [], pairCount);

  const { formattedTime, start, reset: resetTimer, pause } = useTimer();

  // Pause timer on game complete
  useEffect(() => {
    if (isGameComplete) {
      pause();
    }
  }, [isGameComplete, pause]);

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

  const handleChangeDifficulty = () => {
    setDifficulty(null);
    resetTimer();
    setGameStarted(false);
  };

  const handleSelectDifficulty = (diff: DifficultyKey) => {
    setDifficulty(diff);
    resetGame(DIFFICULTIES[diff].pairs);
    resetTimer();
    setGameStarted(false);
  };

  const matchedPairs = cards.filter((card) => card.isMatched).length / 2;
  const totalPairs = cards.length / 2;

  // Calculate grid columns based on card count



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

  // Difficulty Selection Screen
  if (!difficulty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a12] via-[#12121f] to-[#0a0a12] pt-24 pb-12 px-4 speed-lines flex flex-col items-center justify-center">
        <div className="text-center max-w-2xl mx-auto animate-fade-in">
          <h1 className="comic-title text-5xl sm:text-6xl md:text-7xl text-yellow-400 text-stroke-thick mb-2 transform -rotate-2">
            {theme.name.toUpperCase()}
          </h1>
          
          <div className="mt-4 mb-10">
            <span className="action-word text-4xl">SELECT DIFFICULTY</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {(Object.entries(DIFFICULTIES) as [DifficultyKey, typeof DIFFICULTIES[DifficultyKey]][]).map(([key, diff]) => (
              <button
                key={key}
                onClick={() => handleSelectDifficulty(key)}
                className={`
                  relative group transform transition-all duration-200 hover:scale-105
                  ${key === 'easy' ? 'rotate-[-2deg]' : key === 'medium' ? 'rotate-[1deg]' : 'rotate-[-1deg]'}
                `}
              >
                {/* Shadow layer */}
                <div className={`
                  absolute inset-0 rounded-2xl border-4 border-black shadow-[8px_8px_0_#000]
                  ${key === 'easy' ? 'bg-green-600' : key === 'medium' ? 'bg-orange-600' : 'bg-red-600'}
                `} />
                
                {/* Content layer */}
                <div className={`
                  relative rounded-2xl border-4 border-black p-6 -translate-y-1 -translate-x-1
                  ${key === 'easy' ? 'bg-gradient-to-br from-green-300 to-emerald-400' : 
                    key === 'medium' ? 'bg-gradient-to-br from-orange-300 to-amber-400' : 
                    'bg-gradient-to-br from-red-400 to-rose-500'}
                `}>
                  <span className="text-5xl block mb-3">{diff.emoji}</span>
                  <h3 className="comic-title text-3xl text-white text-stroke-black mb-2">{diff.label}</h3>
                  <p className="font-bold text-white/90 text-lg">{diff.pairs} Pairs</p>
                  <p className="text-white/70 text-sm mt-1">{diff.pairs * 2} Cards</p>
                </div>
              </button>
            ))}
          </div>

          <Link to="/themes">
            <Button variant="outline" className="min-w-[160px]">
              ← BACK TO THEMES
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a12] via-[#12121f] to-[#0a0a12] pt-24 pb-12 px-4 speed-lines flex flex-col">
      <Confetti isActive={isGameComplete} />

      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col">
        {/* Header Section */}
        <div className="text-center mb-4 sm:mb-6 animate-fade-in relative z-10">
          <div className="inline-block relative mb-2">
            <h1 className="comic-title text-4xl sm:text-6xl text-yellow-400 text-stroke-thick transform -rotate-2">
              {theme.name.toUpperCase()}
            </h1>
            <span className="absolute -top-3 -right-8 text-4xl text-stroke-black text-cyan-400 animate-bounce-in" style={{ animationDelay: '0.5s' }}>⚡</span>
          </div>
          
          {/* Difficulty Badge */}
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className={`
              inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border-3 border-black font-bold text-xs sm:text-sm uppercase shadow-[3px_3px_0_#000]
              ${difficulty === 'easy' ? 'bg-green-400 text-black' : 
                difficulty === 'medium' ? 'bg-orange-400 text-black' : 
                'bg-red-400 text-white'}
            `}>
              {DIFFICULTIES[difficulty].emoji} {DIFFICULTIES[difficulty].label}
            </span>
            <button
              onClick={handleChangeDifficulty}
              className="text-cyan-400 hover:text-cyan-300 font-bold text-sm underline underline-offset-2 transition-colors"
            >
              Change
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-4 sm:mb-8">
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
                <span className="action-word text-5xl sm:text-6xl block mb-4 transform -rotate-6 text-stroke-black">VICTORY!</span>
                
                <div className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6 border-4 border-black shadow-[4px_4px_0_#000] animate-pulse-glow">
                  <span className="text-6xl">🏆</span>
                </div>
                
                <h2 className="comic-subtitle text-xl sm:text-2xl text-white mb-2 font-black uppercase tracking-wider text-stroke-black">Mission Complete!</h2>
                
                <div className="bg-black/40 rounded-xl p-4 mb-6 border-2 border-white/20">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <span className="text-2xl">⏱️</span>
                      <p className="text-yellow-300 font-bold text-xl">{formattedTime}</p>
                      <p className="text-white/60 text-xs uppercase">Time</p>
                    </div>
                    <div>
                      <span className="text-2xl">🔄</span>
                      <p className="text-yellow-300 font-bold text-xl">{turns}</p>
                      <p className="text-white/60 text-xs uppercase">Turns</p>
                    </div>
                    <div>
                      <span className="text-2xl">{DIFFICULTIES[difficulty].emoji}</span>
                      <p className="text-yellow-300 font-bold text-xl">{DIFFICULTIES[difficulty].label}</p>
                      <p className="text-white/60 text-xs uppercase">Mode</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Button onClick={handleReset} size="lg" className="w-full shadow-[6px_6px_0_#000]">
                    🔄 PLAY AGAIN
                  </Button>
                  <Button onClick={handleChangeDifficulty} variant="secondary" size="lg" className="w-full shadow-[6px_6px_0_#000]">
                    🎯 CHANGE DIFFICULTY
                  </Button>
                  <Link to="/themes" className="w-full">
                    <Button variant="outline" size="lg" className="w-full">
                      🎨 PICK THEME
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card Grid - Dynamic sizing */}
        <div className="flex-1 flex items-center justify-center mb-8">
          <div 
            className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-5 w-full mx-auto perspective-1000 max-w-3xl"
          >
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
          <Button variant="danger" onClick={handleReset} className="min-w-[120px]">
            🔄 RESET
          </Button>
          <Button variant="outline" onClick={handleChangeDifficulty} className="min-w-[120px]">
            🎯 DIFFICULTY
          </Button>
          <Link to="/themes">
            <Button variant="outline" className="min-w-[100px]">
              ← EXIT
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
