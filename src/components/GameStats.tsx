interface GameStatsProps {
  turns: number;
  formattedTime: string;
  matchedPairs: number;
  totalPairs: number;
}

export function GameStats({ turns, formattedTime, matchedPairs, totalPairs }: GameStatsProps) {
  const progress = (matchedPairs / totalPairs) * 100;

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {/* Timer */}
      <div className="stats-card bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center gap-3 min-w-[140px]">
        <div className="w-11 h-11 rounded-xl bg-white/25 flex items-center justify-center border-2 border-black/30">
          <span className="text-2xl">⏱️</span>
        </div>
        <div>
          <p className="text-[10px] text-white/70 uppercase tracking-wider font-bold">Time</p>
          <p className="text-2xl font-bold text-white tabular-nums">{formattedTime}</p>
        </div>
      </div>

      {/* Turns */}
      <div className="stats-card bg-gradient-to-br from-purple-500 to-pink-500 flex items-center gap-3 min-w-[120px]">
        <div className="w-11 h-11 rounded-xl bg-white/25 flex items-center justify-center border-2 border-black/30">
          <span className="text-2xl">🔄</span>
        </div>
        <div>
          <p className="text-[10px] text-white/70 uppercase tracking-wider font-bold">Turns</p>
          <p className="text-2xl font-bold text-white">{turns}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="stats-card bg-gradient-to-br from-green-500 to-emerald-400 flex items-center gap-3 min-w-[180px]">
        <div className="w-11 h-11 rounded-xl bg-white/25 flex items-center justify-center border-2 border-black/30">
          <span className="text-2xl">🎯</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <p className="text-[10px] text-white/70 uppercase tracking-wider font-bold">Matches</p>
            <p className="text-lg font-bold text-white">
              {matchedPairs}/{totalPairs}
            </p>
          </div>
          <div className="w-full h-2.5 bg-black/25 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
