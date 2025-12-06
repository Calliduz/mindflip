import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Confetti } from '../components/Confetti';
import { usePremiumStatus } from '../hooks/usePremiumStatus';

export function Success() {
  const { refetch } = usePremiumStatus();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a12] via-[#12121f] to-[#0a0a12] flex items-center justify-center px-4 speed-lines">
      <Confetti isActive={true} duration={5000} />

      <div className="relative z-10 text-center max-w-lg mx-auto animate-fade-in">
        {/* Action Word */}
        <div className="action-word text-4xl sm:text-5xl mb-6 text-stroke-black">AWESOME!</div>

        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-28 h-28 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 mb-8 border-4 border-black shadow-[8px_8px_0_#000] animate-bounce-in">
          <span className="text-6xl">🎉</span>
        </div>

        {/* Title */}
        <h1 className="comic-title text-5xl sm:text-6xl text-green-400 text-stroke-thick mb-4">
          SUCCESS!
        </h1>

        {/* Message */}
        <p className="text-xl sm:text-2xl text-cyan-400 font-bold mb-8">
          Welcome to MindFlip PREMIUM! 🎊
        </p>

        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 rounded-2xl border-4 border-black shadow-[8px_8px_0_#000] mb-8">
          <p className="text-white font-bold mb-4 text-lg">
            You now have access to ALL premium themes:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="bg-violet-400 px-4 py-2 rounded-xl border-3 border-black shadow-[3px_3px_0_#000] text-black font-bold text-sm">
              🐾 ANIMALS
            </span>
            <span className="bg-orange-400 px-4 py-2 rounded-xl border-3 border-black shadow-[3px_3px_0_#000] text-black font-bold text-sm">
              🍕 FOOD
            </span>
            <span className="bg-pink-400 px-4 py-2 rounded-xl border-3 border-black shadow-[3px_3px_0_#000] text-black font-bold text-sm">
              🎌 ANIME
            </span>
            <span className="bg-blue-400 px-4 py-2 rounded-xl border-3 border-black shadow-[3px_3px_0_#000] text-black font-bold text-sm">
              💻 TECH
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/themes">
            <Button size="lg" className="min-w-[200px]">
              🎮 START PLAYING!
            </Button>
          </Link>
          <Link to="/">
            <Button variant="secondary" size="lg" className="min-w-[200px]">
              🏠 GO HOME
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
