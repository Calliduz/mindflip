import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export function Cancel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-violet-950 to-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-lg mx-auto animate-fade-in">
        {/* Cancel Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-gray-600 to-gray-700 mb-8 shadow-2xl shadow-gray-700/40">
          <span className="text-5xl">😊</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          <span className="bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
            No Problem!
          </span>
        </h1>

        {/* Message */}
        <p className="text-xl text-gray-400 mb-4">
          Payment was cancelled
        </p>
        <p className="text-gray-500 mb-8">
          You can still enjoy our free Classic theme, or come back anytime to unlock premium themes.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/themes">
            <Button size="lg" className="min-w-[200px]">
              🎮 Play Free Theme
            </Button>
          </Link>
          <Link to="/unlock">
            <Button variant="outline" size="lg" className="min-w-[200px]">
              👑 Try Again
            </Button>
          </Link>
        </div>

        {/* Home Link */}
        <div className="mt-8">
          <Link
            to="/"
            className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
