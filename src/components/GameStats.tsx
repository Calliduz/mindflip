import { useEffect, useState } from 'react';

interface GameStatsProps {
  turns: number;
  formattedTime: string;
  matchedPairs: number;
  totalPairs: number;
}

export function GameStats({ turns, formattedTime, matchedPairs, totalPairs }: GameStatsProps) {
  const [prevTurns, setPrevTurns] = useState(turns);
  const [prevMatches, setPrevMatches] = useState(matchedPairs);
  const [turnsChanged, setTurnsChanged] = useState(false);
  const [matchesChanged, setMatchesChanged] = useState(false);

  useEffect(() => {
    if (turns !== prevTurns) {
      setTurnsChanged(true);
      const timer = setTimeout(() => setTurnsChanged(false), 300);
      setPrevTurns(turns);
      return () => clearTimeout(timer);
    }
  }, [turns, prevTurns]);

  useEffect(() => {
    if (matchedPairs !== prevMatches) {
      setMatchesChanged(true);
      const timer = setTimeout(() => setMatchesChanged(false), 300);
      setPrevMatches(matchedPairs);
      return () => clearTimeout(timer);
    }
  }, [matchedPairs, prevMatches]);

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="grid grid-cols-3 gap-4 sm:gap-8">
        
        {/* TIME */}
        <div className="relative transform rotate-[-2deg] transition-transform hover:rotate-0 hover:scale-105 duration-300">
          <div className="absolute inset-0 bg-blue-500 rounded-xl border-4 border-black shadow-[6px_6px_0_#000]"></div>
          <div className="relative bg-gradient-to-br from-cyan-300 to-blue-400 p-3 sm:p-4 rounded-xl border-4 border-black -translate-y-1 -translate-x-1 flex flex-col items-center justify-center h-full">
            <div className="bg-white/90 px-3 py-1 rounded-full border-2 border-black mb-1 shadow-sm">
              <span className="font-black text-xs sm:text-sm tracking-wider uppercase text-black">TIME</span>
            </div>
            <span className="comic-title text-3xl sm:text-5xl text-white drop-shadow-[2px_2px_0_#000] tabular-nums leading-none mt-1">
              {formattedTime}
            </span>
          </div>
        </div>

        {/* TURNS */}
        <div className="relative transform rotate-[1deg] transition-transform hover:rotate-0 hover:scale-105 duration-300">
          <div className="absolute inset-0 bg-purple-500 rounded-xl border-4 border-black shadow-[6px_6px_0_#000]"></div>
          <div className="relative bg-gradient-to-br from-purple-300 to-pink-400 p-3 sm:p-4 rounded-xl border-4 border-black -translate-y-1 -translate-x-1 flex flex-col items-center justify-center h-full">
             <div className="bg-white/90 px-3 py-1 rounded-full border-2 border-black mb-1 shadow-sm">
              <span className="font-black text-xs sm:text-sm tracking-wider uppercase text-black">TURNS</span>
            </div>
            <span 
              className={`
                comic-title text-3xl sm:text-5xl text-white drop-shadow-[2px_2px_0_#000] leading-none mt-1 transition-all duration-300
                ${turnsChanged ? 'scale-125 text-yellow-300' : 'scale-100'}
              `}
            >
              {turns}
            </span>
          </div>
        </div>

        {/* MATCHES */}
        <div className="relative transform rotate-[-1deg] transition-transform hover:rotate-0 hover:scale-105 duration-300">
          <div className="absolute inset-0 bg-green-500 rounded-xl border-4 border-black shadow-[6px_6px_0_#000]"></div>
          <div className="relative bg-gradient-to-br from-green-300 to-emerald-400 p-3 sm:p-4 rounded-xl border-4 border-black -translate-y-1 -translate-x-1 flex flex-col items-center justify-center h-full">
             <div className="bg-white/90 px-3 py-1 rounded-full border-2 border-black mb-1 shadow-sm">
              <span className="font-black text-xs sm:text-sm tracking-wider uppercase text-black">MATCHES</span>
            </div>
            <div className={`flex items-baseline gap-1 mt-1 transition-all duration-300 ${matchesChanged ? 'scale-110' : 'scale-100'}`}>
              <span className={`comic-title text-3xl sm:text-5xl drop-shadow-[2px_2px_0_#000] leading-none ${matchesChanged ? 'text-yellow-300' : 'text-white'}`}>
                {matchedPairs}
              </span>
              <span className="comic-title text-xl sm:text-2xl text-white/80 drop-shadow-[1px_1px_0_#000]">
                /{totalPairs}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
