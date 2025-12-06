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
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a12] via-[#12121f] to-[#0a0a12] flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-20 h-20 border-8 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="comic-title text-3xl text-yellow-400 text-stroke-black">LOADING...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a12] via-[#12121f] to-[#0a0a12] pt-24 pb-12 px-4 speed-lines">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <span className="action-word text-2xl mb-3 inline-block">ZAP!</span>
          <h1 className="comic-title text-4xl sm:text-6xl text-yellow-400 text-stroke-thick mb-4">
            PICK A THEME
          </h1>
          <p className="text-cyan-400 font-bold text-lg">
            Select a card theme to start your memory challenge!
          </p>

          {!isPremium && (
            <div className="mt-6 inline-flex items-center gap-4 bg-gradient-to-r from-purple-600/80 to-pink-500/80 px-6 py-3 rounded-2xl border-4 border-black shadow-[6px_6px_0_#000]">
              <span className="text-white font-bold">Want all themes?</span>
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
                  <p className="text-black/80 font-medium">Unlock all 4 premium themes</p>
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
