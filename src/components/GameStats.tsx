interface GameStatsProps {
  turns: number;
  formattedTime: string;
  matchedPairs: number;
  totalPairs: number;
}

export function GameStats({ turns, formattedTime, matchedPairs, totalPairs }: GameStatsProps) {
  const progress = (matchedPairs / totalPairs) * 100;

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
      {/* Timer */}
      <div className="glass rounded-2xl px-6 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
          <span className="text-lg">⏱️</span>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider">Time</p>
          <p className="text-xl font-bold text-white font-mono">{formattedTime}</p>
        </div>
      </div>

      {/* Turns */}
      <div className="glass rounded-2xl px-6 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
          <span className="text-lg">🔄</span>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider">Turns</p>
          <p className="text-xl font-bold text-white">{turns}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="glass rounded-2xl px-6 py-3 flex items-center gap-3 min-w-[180px]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <span className="text-lg">🎯</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Progress</p>
            <p className="text-sm font-semibold text-white">
              {matchedPairs}/{totalPairs}
            </p>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
