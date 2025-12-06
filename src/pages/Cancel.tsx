import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export function Cancel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a12] via-[#12121f] to-[#0a0a12] flex items-center justify-center px-4 speed-lines">
      <div className="text-center max-w-lg mx-auto animate-fade-in">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-28 h-28 rounded-2xl bg-gradient-to-br from-gray-500 to-gray-600 mb-8 border-4 border-black shadow-[8px_8px_0_#000]">
          <span className="text-6xl">😊</span>
        </div>

        {/* Title */}
        <h1 className="comic-title text-5xl sm:text-6xl text-gray-300 text-stroke-thick mb-4">
          NO WORRIES!
        </h1>

        {/* Message */}
        <p className="text-xl text-cyan-400 font-bold mb-4">
          Payment was cancelled
        </p>
        <p className="text-gray-400 mb-8 font-medium">
          You can still enjoy our FREE Classic theme! Come back anytime to unlock premium! 💪
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/themes">
            <Button size="lg" className="min-w-[200px]">
              🎮 PLAY FREE THEME!
            </Button>
          </Link>
          <Link to="/unlock">
            <Button variant="secondary" size="lg" className="min-w-[200px]">
              👑 TRY AGAIN
            </Button>
          </Link>
        </div>

        {/* Home Link */}
        <div className="mt-10">
          <Link
            to="/"
            className="text-cyan-400 hover:text-yellow-400 transition-colors font-bold uppercase"
          >
            ← BACK TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
