import { useNavigate } from 'react-router-dom';
import { themes } from '../utils/themes';
import { ThemeCard } from '../components/ThemeCard';
import { usePremiumStatus } from '../hooks/usePremiumStatus';
import { Button } from '../components/Button';

export function ThemeSelection() {
  const navigate = useNavigate();
  const { isPremium, isLoading } = usePremiumStatus();

  const handleThemeClick = (themeId: string, isPremiumTheme: boolean) => {
    if (isPremiumTheme && !isPremium) {
      navigate('/unlock');
    } else {
      navigate(`/game/${themeId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="comic-title text-2xl text-yellow-400">LOADING THEMES...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] pt-20 pb-12 px-4 speed-lines">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <span className="action-word text-3xl">ZAP!</span>
          <h1 className="comic-title text-5xl sm:text-6xl text-yellow-400 mt-4 mb-4">
            CHOOSE YOUR THEME!
          </h1>
          <p className="text-cyan-400 font-bold text-lg uppercase tracking-wider">
            Pick a card theme to start playing! 🎴
          </p>

          {!isPremium && (
            <div className="mt-6 inline-flex items-center gap-4 comic-panel bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3">
              <span className="text-white font-bold">Want ALL themes?</span>
              <Button size="sm" onClick={() => navigate('/unlock')}>
                ⭐ UNLOCK PREMIUM!
              </Button>
            </div>
          )}
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme, index) => (
            <div 
              key={theme.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ThemeCard
                theme={theme}
                isLocked={theme.isPremium && !isPremium}
                onClick={() => handleThemeClick(theme.id, theme.isPremium)}
              />
            </div>
          ))}
        </div>

        {/* Premium Benefits */}
        {!isPremium && (
          <div className="mt-16 comic-panel bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 p-8 text-center animate-fade-in">
            <div className="action-word text-4xl mb-4 text-white">WOW!</div>
            <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6 border-4 border-black">
              <span className="text-4xl">👑</span>
            </div>
            <h2 className="comic-title text-3xl text-black mb-4">
              UNLOCK ALL PREMIUM THEMES!
            </h2>
            <p className="text-black font-bold mb-6 max-w-lg mx-auto text-lg">
              Get Animals, Food, Anime, and Logos themes with ONE purchase! No subscriptions! 💪
            </p>
            <Button size="lg" onClick={() => navigate('/unlock')}>
              🔓 UNLOCK NOW!
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
