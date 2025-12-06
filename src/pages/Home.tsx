import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a12] via-[#12121f] to-[#0a0a12] flex flex-col speed-lines overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] starburst rounded-full opacity-30" />
        
        {/* Floating elements */}
        <div className="absolute top-24 left-[10%] text-3xl animate-float opacity-40" style={{ animationDelay: '0s' }}>⭐</div>
        <div className="absolute top-32 right-[15%] text-2xl animate-float opacity-30" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-32 left-[15%] text-4xl animate-float opacity-35" style={{ animationDelay: '2s' }}>🎴</div>
        <div className="absolute bottom-24 right-[10%] text-3xl animate-float opacity-40" style={{ animationDelay: '3s' }}>💫</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-12 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          
          {/* Logo */}
          <div className="mb-6 inline-block animate-float">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 flex items-center justify-center border-4 border-black shadow-[8px_8px_0_#000] animate-pulse-glow">
              <span className="text-6xl">🧠</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="comic-title text-4xl sm:text-6xl md:text-7xl text-yellow-400 text-stroke-thick mb-4 animate-fade-in">
            MINDFLIP
          </h1>

          {/* Action Word */}
          <div className="mb-5 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="action-word">POW!</span>
          </div>

          {/* Speech Bubble */}
          <div className="inline-block mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="speech-bubble max-w-md">
              <strong className="text-purple-600">Challenge your memory</strong> with comic-style card matching! 
              Beat the clock and unlock <strong className="text-orange-500">premium themes!</strong> 💥
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/themes">
              <Button size="lg" className="min-w-[200px]">
                🎮 PLAY NOW
              </Button>
            </Link>
            <Link to="/unlock">
              <Button variant="secondary" size="lg" className="min-w-[200px]">
                ⭐ GO PRO
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 w-full max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-6 rounded-2xl border-4 border-black shadow-[6px_6px_0_#000] text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <span className="text-4xl block mb-3">🎯</span>
              <h3 className="comic-subtitle text-xl text-white uppercase mb-2">Match Pairs</h3>
              <p className="text-white/80 font-medium">Flip and find matching cards!</p>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-yellow-400 p-6 rounded-2xl border-4 border-black shadow-[6px_6px_0_#000] text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <span className="text-4xl block mb-3">⏱️</span>
              <h3 className="comic-subtitle text-xl text-black uppercase mb-2">Beat the Clock</h3>
              <p className="text-black/70 font-medium">Track your time and turns!</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-2xl border-4 border-black shadow-[6px_6px_0_#000] text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <span className="text-4xl block mb-3">🎨</span>
              <h3 className="comic-subtitle text-xl text-white uppercase mb-2">5 Themes</h3>
              <p className="text-white/80 font-medium">Classic + 4 premium sets!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 border-t-4 border-black/40 bg-black/30">
        <p className="text-gray-500 font-medium">
          © 2025 Juztyne Clever Dalupang • Train your brain, one flip at a time!
        </p>
      </footer>
    </div>
  );
}
