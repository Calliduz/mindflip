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
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-3 gap-4 sm:gap-8 px-2">
        
        {/* TIME */}
        <div className="group relative transform rotate-[-2deg] transition-all hover:rotate-0 hover:scale-105 duration-300">
          <div className="absolute inset-0 bg-blue-600 rounded-xl border-4 border-black shadow-[8px_8px_0_#000]"></div>
          <div className="relative bg-gradient-to-br from-cyan-300 to-blue-400 p-2 rounded-xl border-4 border-black -translate-y-1 -translate-x-1 flex flex-col items-center justify-center h-full min-h-[100px]">
            <div className="bg-white px-4 py-1 rounded-full border-3 border-black absolute -top-4 shadow-[3px_3px_0_rgba(0,0,0,0.2)]">
              <span className="font-black text-xs sm:text-sm tracking-widest uppercase text-black">TIME</span>
            </div>
            <span className="comic-title text-4xl sm:text-5xl text-white text-stroke-black tabular-nums leading-none mt-3">
              {formattedTime}
            </span>
          </div>
        </div>

        {/* TURNS */}
        <div className="group relative transform rotate-[2deg] transition-all hover:rotate-0 hover:scale-105 duration-300">
          <div className="absolute inset-0 bg-purple-600 rounded-xl border-4 border-black shadow-[8px_8px_0_#000]"></div>
          <div className="relative bg-gradient-to-br from-purple-300 to-pink-400 p-2 rounded-xl border-4 border-black -translate-y-1 -translate-x-1 flex flex-col items-center justify-center h-full min-h-[100px]">
             <div className="bg-white px-4 py-1 rounded-full border-3 border-black absolute -top-4 shadow-[3px_3px_0_rgba(0,0,0,0.2)]">
              <span className="font-black text-xs sm:text-sm tracking-widest uppercase text-black">TURNS</span>
            </div>
            <span 
              className={`
                comic-title text-4xl sm:text-5xl text-white text-stroke-black leading-none mt-3 transition-transform duration-200
                ${turnsChanged ? 'scale-125 text-yellow-300' : 'scale-100'}
              `}
            >
              {turns}
            </span>
          </div>
        </div>

        {/* MATCHES */}
        <div className="group relative transform rotate-[-1deg] transition-all hover:rotate-0 hover:scale-105 duration-300">
          <div className="absolute inset-0 bg-green-600 rounded-xl border-4 border-black shadow-[8px_8px_0_#000]"></div>
          <div className="relative bg-gradient-to-br from-green-300 to-emerald-400 p-2 rounded-xl border-4 border-black -translate-y-1 -translate-x-1 flex flex-col items-center justify-center h-full min-h-[100px]">
             <div className="bg-white px-4 py-1 rounded-full border-3 border-black absolute -top-4 shadow-[3px_3px_0_rgba(0,0,0,0.2)]">
              <span className="font-black text-xs sm:text-sm tracking-widest uppercase text-black">PAIRS</span>
            </div>
            <div className={`flex items-baseline gap-1 mt-3 transition-transform duration-200 ${matchesChanged ? 'scale-110' : 'scale-100'}`}>
              <span className={`comic-title text-4xl sm:text-5xl text-stroke-black leading-none ${matchesChanged ? 'text-yellow-300' : 'text-white'}`}>
                {matchedPairs}
              </span>
              <span className="comic-title text-2xl sm:text-3xl text-white text-stroke-black opacity-80">
                /{totalPairs}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
