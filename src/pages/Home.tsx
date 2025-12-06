import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-violet-950 to-gray-900 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in">
          {/* Logo */}
          <div className="mb-8 inline-flex">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-violet-500/40 animate-pulse-glow">
              <span className="text-5xl">🧠</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-7xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              MindFlip
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-400 mb-4 font-light">
            The Ultimate Memory Card Game
          </p>
          <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
            Challenge your memory with beautiful themed card sets. Match pairs, beat the clock,
            and unlock premium themes for endless fun!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/themes">
              <Button size="lg" className="min-w-[200px]">
                🎮 Start Playing
              </Button>
            </Link>
            <Link to="/themes">
              <Button variant="outline" size="lg" className="min-w-[200px]">
                🎨 Browse Themes
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="relative z-10 mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
          <div className="glass rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Match Pairs</h3>
            <p className="text-sm text-gray-400">
              Flip cards and find matching pairs to win
            </p>
          </div>

          <div className="glass rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/30">
              <span className="text-2xl">⏱️</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Beat the Clock</h3>
            <p className="text-sm text-gray-400">
              Track your time and improve your speed
            </p>
          </div>

          <div className="glass rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/30">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Premium Themes</h3>
            <p className="text-sm text-gray-400">
              Unlock beautiful themed card sets
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>© 2024 MindFlip. Train your brain, one flip at a time.</p>
      </footer>
    </div>
  );
}
