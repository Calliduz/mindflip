import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] flex flex-col speed-lines overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Starburst */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] starburst rounded-full opacity-50" />
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 text-4xl animate-float opacity-60" style={{ animationDelay: '0s' }}>⭐</div>
        <div className="absolute top-40 right-20 text-3xl animate-float opacity-50" style={{ animationDelay: '0.5s' }}>✨</div>
        <div className="absolute bottom-40 left-20 text-5xl animate-float opacity-40" style={{ animationDelay: '1s' }}>🎴</div>
        <div className="absolute bottom-20 right-10 text-4xl animate-float opacity-50" style={{ animationDelay: '1.5s' }}>💫</div>
        <div className="absolute top-1/3 left-1/4 text-2xl animate-twinkle opacity-30">★</div>
        <div className="absolute top-2/3 right-1/4 text-2xl animate-twinkle opacity-30" style={{ animationDelay: '1s' }}>★</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-24 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          
          {/* Logo with Glow */}
          <div className="mb-6 inline-block animate-float">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 flex items-center justify-center border-4 border-black shadow-[8px_8px_0_#000] animate-pulse-glow">
              <span className="text-7xl">🧠</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="comic-title text-7xl sm:text-8xl lg:text-9xl text-yellow-400 mb-4 animate-fade-in">
            MINDFLIP
          </h1>

          {/* Action Word */}
          <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="action-word">POW!</span>
          </div>

          {/* Speech Bubble */}
          <div className="inline-block mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="speech-bubble max-w-lg text-left">
              <span className="font-bold text-purple-600">Challenge your memory</span> with awesome themed card sets! 
              Match pairs, beat the clock, and unlock <span className="font-bold text-orange-500">PREMIUM themes!</span> 💥
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/themes">
              <Button size="lg" className="min-w-[200px] text-lg">
                🎮 PLAY NOW
              </Button>
            </Link>
            <Link to="/themes">
              <Button variant="secondary" size="lg" className="min-w-[200px] text-lg">
                🎨 THEMES
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 w-full max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Feature 1 */}
            <div 
              className="feature-card bg-gradient-to-br from-blue-500 to-cyan-400 p-6 text-center animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4 border-3 border-black/30">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="comic-subtitle text-xl text-white mb-2 uppercase">Match Pairs</h3>
              <p className="text-white/90 text-sm font-medium">
                Flip cards and find matching pairs to win the game!
              </p>
            </div>

            {/* Feature 2 */}
            <div 
              className="feature-card bg-gradient-to-br from-orange-500 to-yellow-400 p-6 text-center animate-fade-in"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4 border-3 border-black/30">
                <span className="text-4xl">⏱️</span>
              </div>
              <h3 className="comic-subtitle text-xl text-black mb-2 uppercase">Beat the Clock</h3>
              <p className="text-black/80 text-sm font-medium">
                Track your time and improve your speed!
              </p>
            </div>

            {/* Feature 3 */}
            <div 
              className="feature-card bg-gradient-to-br from-purple-500 to-pink-500 p-6 text-center animate-fade-in"
              style={{ animationDelay: '0.6s' }}
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4 border-3 border-black/30">
                <span className="text-4xl">⭐</span>
              </div>
              <h3 className="comic-subtitle text-xl text-white mb-2 uppercase">Premium Themes</h3>
              <p className="text-white/90 text-sm font-medium">
                Unlock awesome themed card collections!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 border-t-4 border-black/50 bg-black/30">
        <p className="text-gray-400 font-medium">
          © 2024 MindFlip • Train your brain, one flip at a time! 🧠
        </p>
      </footer>
    </div>
  );
}
