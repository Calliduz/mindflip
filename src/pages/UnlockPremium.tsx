import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { createCheckoutSession } from '../utils/api';
import { themes } from '../utils/themes';

export function UnlockPremium() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const premiumThemes = themes.filter((t) => t.isPremium);

  const handleUnlock = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const checkoutUrl = await createCheckoutSession();
      window.location.href = checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create checkout session');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a12] via-[#12121f] to-[#0a0a12] pt-24 pb-12 px-4 speed-lines">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <span className="action-word text-2xl mb-3 inline-block">WOW!</span>
          <div className="my-5">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 border-4 border-black shadow-[8px_8px_0_#000] animate-float">
              <span className="text-5xl">👑</span>
            </div>
          </div>
          <h1 className="comic-title text-5xl sm:text-6xl text-yellow-400 text-stroke-thick mb-4">
            GO PREMIUM
          </h1>
          <p className="text-cyan-400 font-bold text-lg max-w-md mx-auto">
            One-time purchase. Lifetime access. All premium themes!
          </p>
        </div>

        {/* Theme Preview */}
        <div className="bg-gradient-to-br from-purple-600/90 to-blue-600/90 p-6 rounded-2xl border-4 border-black shadow-[8px_8px_0_#000] mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h2 className="comic-subtitle text-xl text-white mb-5 text-center uppercase">Themes You'll Unlock</h2>
          <div className="grid grid-cols-4 gap-4">
            {premiumThemes.map((theme) => (
              <div key={theme.id} className="text-center">
                <div className="aspect-square rounded-xl overflow-hidden border-4 border-black shadow-[4px_4px_0_#000] mb-2">
                  <img src={theme.previewImage} alt={theme.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-white font-bold text-sm">{theme.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-5 rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="text-3xl block mb-2">✨</span>
            <p className="text-white font-bold">4 Themes</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-5 rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] text-center animate-fade-in" style={{ animationDelay: '0.25s' }}>
            <span className="text-3xl block mb-2">♾️</span>
            <p className="text-white font-bold">Forever</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-5 rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <span className="text-3xl block mb-2">🎮</span>
            <p className="text-white font-bold">Unlimited</p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-500 p-4 rounded-2xl border-4 border-black text-center animate-shake">
            <p className="text-white font-bold">{error}</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.35s' }}>
          <Button
            size="lg"
            onClick={handleUnlock}
            isLoading={isLoading}
            className="min-w-[280px] text-lg animate-pulse-glow"
          >
            🔓 UNLOCK ALL THEMES
          </Button>
          <p className="mt-4 text-gray-400 font-medium">
            🔒 Secure payment via PayMongo
          </p>
        </div>

        {/* Back */}
        <div className="mt-10 text-center">
          <Link to="/themes" className="text-cyan-400 hover:text-yellow-400 font-bold uppercase transition-colors">
            ← Back to Themes
          </Link>
        </div>
      </div>
    </div>
  );
}
