import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Confetti } from '../components/Confetti';
import { usePremiumStatus } from '../hooks/usePremiumStatus';

export function Success() {
  const { refetch } = usePremiumStatus();

  // Refetch user status to update premium state
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-violet-950 to-gray-900 flex items-center justify-center px-4">
      {/* Confetti celebration */}
      <Confetti isActive={true} duration={5000} />

      <div className="relative z-10 text-center max-w-lg mx-auto animate-fade-in">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-500 to-green-500 mb-8 shadow-2xl shadow-emerald-500/40 animate-bounce-in">
          <span className="text-5xl">🎉</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            Payment Successful!
          </span>
        </h1>

        {/* Message */}
        <p className="text-xl text-gray-400 mb-8">
          Welcome to MindFlip Premium! 🎊
        </p>

        <div className="glass rounded-3xl p-6 mb-8">
          <p className="text-gray-300 mb-4">
            You now have access to all premium themes:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm">
              🐾 Animals
            </span>
            <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-sm">
              🍕 Food
            </span>
            <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-sm">
              🎌 Anime
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">
              🏢 Logos
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/themes">
            <Button size="lg" className="min-w-[200px]">
              🎮 Start Playing
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="lg" className="min-w-[200px]">
              🏠 Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
