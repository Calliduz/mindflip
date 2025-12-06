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
      // Redirect to Stripe checkout
      window.location.href = checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create checkout session');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-violet-950 to-gray-900 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-500 mb-6 shadow-2xl shadow-amber-500/40">
            <span className="text-4xl">👑</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              Unlock Premium
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Get lifetime access to all premium themes with a one-time purchase.
            No subscriptions, no hidden fees!
          </p>
        </div>

        {/* Premium Themes Preview */}
        <div className="glass rounded-3xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">
            Themes You'll Unlock
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {premiumThemes.map((theme) => (
              <div
                key={theme.id}
                className="relative rounded-2xl overflow-hidden aspect-square group"
              >
                <img
                  src={theme.previewImage}
                  alt={theme.name}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%231f2937" width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%239CA3AF" font-size="30">${theme.name.charAt(0)}</text></svg>`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                <p className="absolute bottom-2 left-0 right-0 text-center text-sm font-medium text-white">
                  {theme.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-2xl p-6 text-center">
            <span className="text-3xl mb-3 block">✨</span>
            <h3 className="font-semibold text-white mb-1">4 Premium Themes</h3>
            <p className="text-sm text-gray-400">Animals, Food, Anime, Logos</p>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <span className="text-3xl mb-3 block">♾️</span>
            <h3 className="font-semibold text-white mb-1">Lifetime Access</h3>
            <p className="text-sm text-gray-400">One-time purchase, forever yours</p>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <span className="text-3xl mb-3 block">🎮</span>
            <h3 className="font-semibold text-white mb-1">Unlimited Play</h3>
            <p className="text-sm text-gray-400">No limits, no restrictions</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-center animate-shake">
            {error}
          </div>
        )}

        {/* Unlock Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={handleUnlock}
            isLoading={isLoading}
            className="min-w-[280px] text-lg"
          >
            🔓 Unlock All Themes
          </Button>
          <p className="mt-4 text-sm text-gray-500">s
            Secure payment powered by PayMongo
          </p>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            to="/themes"
            className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            ← Back to Themes
          </Link>
        </div>
      </div>
    </div>
  );
}
