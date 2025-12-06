interface GameStatsProps {
  turns: number;
  formattedTime: string;
  matchedPairs: number;
  totalPairs: number;
}

export function GameStats({ turns, formattedTime, matchedPairs, totalPairs }: GameStatsProps) {
  const progress = (matchedPairs / totalPairs) * 100;

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
      {/* Timer */}
      <div className="comic-panel bg-gradient-to-br from-blue-600 to-cyan-500 px-5 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center border-2 border-black">
          <span className="text-xl">⏱️</span>
        </div>
        <div>
          <p className="text-xs text-white/70 uppercase tracking-wider font-bold">Time</p>
          <p className="comic-title text-2xl text-white">{formattedTime}</p>
        </div>
      </div>

      {/* Turns */}
      <div className="comic-panel bg-gradient-to-br from-purple-600 to-pink-500 px-5 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center border-2 border-black">
          <span className="text-xl">🔄</span>
        </div>
        <div>
          <p className="text-xs text-white/70 uppercase tracking-wider font-bold">Turns</p>
          <p className="comic-title text-2xl text-white">{turns}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="comic-panel bg-gradient-to-br from-green-600 to-emerald-500 px-5 py-3 flex items-center gap-3 min-w-[180px]">
        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center border-2 border-black">
          <span className="text-xl">🎯</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <p className="text-xs text-white/70 uppercase tracking-wider font-bold">Matches</p>
            <p className="comic-title text-lg text-white">
              {matchedPairs}/{totalPairs}
            </p>
          </div>
          <div className="w-full h-3 bg-black/30 rounded-full overflow-hidden border-2 border-black">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
