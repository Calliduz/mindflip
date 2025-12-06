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
      <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-yellow-400 font-medium">Loading themes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] pt-24 pb-12 px-4 speed-lines">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <span className="action-word text-2xl mb-2 inline-block">ZAP!</span>
          <h1 className="comic-title text-5xl sm:text-6xl text-yellow-400 mb-3">
            PICK A THEME
          </h1>
          <p className="text-cyan-400 font-medium text-lg">
            Select a card theme to start your memory challenge!
          </p>

          {!isPremium && (
            <div className="mt-6 inline-flex items-center gap-4 bg-gradient-to-r from-purple-600/80 to-pink-500/80 px-5 py-3 rounded-2xl border-3 border-black shadow-[5px_5px_0_#000]">
              <span className="text-white font-bold text-sm">Want all themes?</span>
              <Button size="sm" onClick={() => navigate('/unlock')}>
                ⭐ UNLOCK
              </Button>
            </div>
          )}
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, index) => (
            <div 
              key={theme.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <ThemeCard
                theme={theme}
                isLocked={theme.isPremium && !isPremium}
                onClick={() => handleThemeClick(theme.id, theme.isPremium)}
              />
            </div>
          ))}
        </div>

        {/* Premium CTA */}
        {!isPremium && (
          <div className="mt-14 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 p-6 rounded-2xl border-4 border-black shadow-[8px_8px_0_#000] text-center animate-fade-in">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">👑</span>
                <div className="text-left">
                  <h3 className="comic-subtitle text-xl text-black uppercase">Go Premium!</h3>
                  <p className="text-black/80 font-medium text-sm">Unlock all 4 premium themes</p>
                </div>
              </div>
              <Button size="lg" onClick={() => navigate('/unlock')}>
                🔓 UNLOCK NOW
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
