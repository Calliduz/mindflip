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
    <div className="min-h-screen bg-[#1a1a2e] pt-20 pb-12 px-4 speed-lines">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <span className="action-word text-4xl">KAPOW!</span>
          <div className="mt-6 mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 border-4 border-black shadow-[8px_8px_0_#000] animate-float">
              <span className="text-5xl">👑</span>
            </div>
          </div>
          <h1 className="comic-title text-5xl sm:text-6xl text-yellow-400 mb-4">
            UNLOCK PREMIUM!
          </h1>
          <p className="text-cyan-400 font-bold text-lg max-w-xl mx-auto">
            Get LIFETIME access to all premium themes! One payment, FOREVER yours! 💪
          </p>
        </div>

        {/* Premium Themes Preview */}
        <div className="comic-panel bg-gradient-to-br from-purple-600 to-blue-600 p-8 mb-8">
          <h2 className="comic-title text-2xl text-white mb-6 text-center">
            THEMES YOU'LL UNLOCK!
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {premiumThemes.map((theme) => (
              <div
                key={theme.id}
                className="relative rounded-xl overflow-hidden aspect-square border-4 border-black shadow-[4px_4px_0_#000] group"
              >
                <img
                  src={theme.previewImage}
                  alt={theme.name}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%238b5cf6"/><stop offset="100%" style="stop-color:%23ec4899"/></linearGradient></defs><rect fill="url(%23g)" width="100" height="100"/><text x="50" y="60" text-anchor="middle" fill="white" font-size="40" font-family="Arial Black">${theme.name.charAt(0)}</text></svg>`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <p className="absolute bottom-2 left-0 right-0 text-center comic-title text-lg text-white">
                  {theme.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="comic-panel bg-gradient-to-br from-pink-500 to-rose-500 p-6 text-center">
            <span className="text-4xl mb-3 block">✨</span>
            <h3 className="comic-title text-xl text-white mb-1">4 THEMES!</h3>
            <p className="text-sm text-white/80 font-bold">Animals, Food, Anime, Logos</p>
          </div>
          <div className="comic-panel bg-gradient-to-br from-green-500 to-emerald-500 p-6 text-center">
            <span className="text-4xl mb-3 block">♾️</span>
            <h3 className="comic-title text-xl text-white mb-1">FOREVER!</h3>
            <p className="text-sm text-white/80 font-bold">One-time purchase, lifetime access</p>
          </div>
          <div className="comic-panel bg-gradient-to-br from-blue-500 to-cyan-500 p-6 text-center">
            <span className="text-4xl mb-3 block">🎮</span>
            <h3 className="comic-title text-xl text-white mb-1">UNLIMITED!</h3>
            <p className="text-sm text-white/80 font-bold">Play as much as you want</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 comic-panel bg-red-500 p-4 text-center animate-shake">
            <p className="text-white font-bold">{error}</p>
          </div>
        )}

        {/* Unlock Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={handleUnlock}
            isLoading={isLoading}
            className="min-w-[300px] text-xl animate-pulse-glow"
          >
            🔓 UNLOCK ALL THEMES!
          </Button>
          <p className="mt-4 text-gray-400 font-bold">
            🔒 Secure payment powered by PayMongo
          </p>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            to="/themes"
            className="text-cyan-400 hover:text-yellow-400 transition-colors font-bold uppercase inline-flex items-center gap-2"
          >
            ← BACK TO THEMES
          </Link>
        </div>
      </div>
    </div>
  );
}
