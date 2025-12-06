import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export function Home() {
  return (
    <div className="min-h-screen bg-[#1a1a2e] flex flex-col speed-lines">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        {/* Starburst Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] starburst rounded-full" />
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in">
          {/* Logo */}
          <div className="mb-8 inline-flex animate-float">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 flex items-center justify-center border-4 border-black shadow-[8px_8px_0_#000] animate-pulse-glow">
              <span className="text-6xl">🧠</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="comic-title text-6xl sm:text-8xl mb-6 text-yellow-400">
            MINDFLIP!
          </h1>

          {/* Action Word */}
          <div className="mb-4">
            <span className="action-word text-4xl">POW!</span>
          </div>

          {/* Subtitle */}
          <p className="text-2xl sm:text-3xl text-cyan-400 mb-4 font-bold uppercase tracking-wider">
            The Ultimate Memory Card Game
          </p>
          
          {/* Speech Bubble */}
          <div className="inline-block mb-12">
            <div className="speech-bubble max-w-xl">
              Challenge your memory with AWESOME themed card sets! Match pairs, beat the clock, and unlock PREMIUM themes! 💥
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/themes">
              <Button size="lg" className="min-w-[220px]">
                🎮 START PLAYING!
              </Button>
            </Link>
            <Link to="/themes">
              <Button variant="secondary" size="lg" className="min-w-[220px]">
                🎨 BROWSE THEMES
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="relative z-10 mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
          <div className="comic-panel bg-gradient-to-br from-blue-600 to-cyan-500 p-6 text-center hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0_#000] transition-all">
            <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4 border-3 border-black">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="comic-title text-xl text-white mb-2">MATCH PAIRS!</h3>
            <p className="text-sm text-white/80 font-bold">
              Flip cards and find matching pairs to WIN!
            </p>
          </div>

          <div className="comic-panel bg-gradient-to-br from-orange-500 to-yellow-400 p-6 text-center hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0_#000] transition-all">
            <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4 border-3 border-black">
              <span className="text-3xl">⏱️</span>
            </div>
            <h3 className="comic-title text-xl text-black mb-2">BEAT THE CLOCK!</h3>
            <p className="text-sm text-black/80 font-bold">
              Track your time and improve your SPEED!
            </p>
          </div>

          <div className="comic-panel bg-gradient-to-br from-purple-600 to-pink-500 p-6 text-center hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0_#000] transition-all">
            <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4 border-3 border-black">
              <span className="text-3xl">⭐</span>
            </div>
            <h3 className="comic-title text-xl text-white mb-2">PREMIUM THEMES!</h3>
            <p className="text-sm text-white/80 font-bold">
              Unlock AWESOME themed card sets!
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 border-t-4 border-black bg-black/30">
        <p className="text-gray-400 font-bold uppercase tracking-wider">
          © 2024 MindFlip • Train your brain, one flip at a time! 🧠💪
        </p>
      </footer>
    </div>
  );
}
