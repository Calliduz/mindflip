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
      // Redirect to unlock page if trying to access premium theme without premium status
      navigate('/unlock');
    } else {
      // Navigate to game with selected theme
      navigate(`/game/${themeId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-violet-950 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading themes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-violet-950 to-gray-900 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Choose Your Theme
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Select a card theme to start playing
          </p>

          {!isPremium && (
            <div className="mt-6 inline-flex items-center gap-3 glass rounded-2xl px-6 py-3">
              <span className="text-gray-400">Want access to all themes?</span>
              <Button size="sm" onClick={() => navigate('/unlock')}>
                ⭐ Unlock Premium
              </Button>
            </div>
          )}
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              isLocked={theme.isPremium && !isPremium}
              onClick={() => handleThemeClick(theme.id, theme.isPremium)}
            />
          ))}
        </div>

        {/* Premium Benefits (shown to non-premium users) */}
        {!isPremium && (
          <div className="mt-16 glass rounded-3xl p-8 text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 mb-6 shadow-lg shadow-amber-500/30">
              <span className="text-3xl">👑</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Unlock All Premium Themes
            </h2>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Get access to Animals, Food, Anime, and Logos themes with a one-time purchase.
              No subscriptions, just endless fun!
            </p>
            <Button size="lg" onClick={() => navigate('/unlock')}>
              🔓 Unlock All Themes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
