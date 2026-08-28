import React, { useState, useEffect } from 'react';
import { RotateCcw, Volume2, Sparkles, Clock, Target, Award, Play } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { playClickSound, playCoinSound, playWrongSound } from '../../utils/audio';

export function WhackMoleGame({ onComplete }) {
  const { triggerSpeech } = useApp();

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [activeHole, setActiveHole] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hitFeedback, setHitFeedback] = useState(null); // hole index when hit

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsGameOver(false);
    setIsPlaying(true);
    setActiveHole(null);
    setHitFeedback(null);
    triggerSpeech('反應打地鼠開始！看見地鼠探出頭，立刻點擊打中得分！');
  };

  // Timer countdown
  useEffect(() => {
    let timer = null;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setIsPlaying(false);
            setIsGameOver(true);
            setActiveHole(null);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  // When game finishes, trigger onComplete
  useEffect(() => {
    if (isGameOver) {
      const finalPoints = Math.min(100, Math.max(60, score * 5));
      if (onComplete) onComplete(finalPoints);
    }
  }, [isGameOver]);

  // Mole pop-up loop
  useEffect(() => {
    let moleTimer = null;
    if (isPlaying && !isGameOver) {
      const popMole = () => {
        const randomHole = Math.floor(Math.random() * 9);
        setActiveHole(randomHole);

        // Mole stays visible for 900ms - 1300ms (senior-friendly speed)
        const stayDuration = Math.floor(Math.random() * 400) + 900;
        moleTimer = setTimeout(() => {
          setActiveHole(null);
          // Wait random interval before next pop
          const nextWait = Math.floor(Math.random() * 500) + 400;
          moleTimer = setTimeout(popMole, nextWait);
        }, stayDuration);
      };

      popMole();
    }

    return () => clearTimeout(moleTimer);
  }, [isPlaying, isGameOver]);

  const handleHoleClick = (holeIdx) => {
    if (!isPlaying || isGameOver) return;

    if (activeHole === holeIdx) {
      // Hit mole!
      playCoinSound();
      setScore((s) => s + 10);
      setHitFeedback(holeIdx);
      setActiveHole(null);
      setTimeout(() => setHitFeedback(null), 300);
    } else {
      // Missed
      playClickSound();
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Status Bar */}
      <div className="bg-white rounded-2xl p-4 border-2 border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-stone-700 font-extrabold text-base sm:text-lg">
            <Target className="w-5 h-5 text-emerald-600" />
            <span>得分：<strong className="text-emerald-700 text-xl">{score}</strong> 分</span>
          </div>
          <div className="flex items-center gap-1.5 text-stone-700 font-extrabold text-base sm:text-lg">
            <Clock className="w-5 h-5 text-amber-600" />
            <span>倒數：<strong className="text-amber-800 text-xl">{timeLeft}</strong> 秒</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => triggerSpeech('反應打地鼠：30秒內點擊冒出頭的可愛地鼠。訓練手眼協調與大腦快速反應力。')}
            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold transition-all cursor-pointer"
            title="語音規則"
          >
            <Volume2 className="w-5 h-5 text-emerald-700" />
          </button>
          <button
            onClick={startGame}
            className="py-2 px-4 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-black text-sm flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isPlaying ? '重來一局' : '開始挑戰'}</span>
          </button>
        </div>
      </div>

      {/* 3x3 Whack A Mole Grid */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto">
        {[...Array(9)].map((_, idx) => {
          const isMole = activeHole === idx;
          const isHit = hitFeedback === idx;

          return (
            <button
              key={idx}
              onClick={() => handleHoleClick(idx)}
              className={`h-28 sm:h-32 rounded-3xl border-4 flex flex-col items-center justify-center transition-all transform cursor-pointer relative overflow-hidden select-none shadow-md ${
                isHit
                  ? 'bg-amber-300 border-amber-500 scale-95'
                  : isMole
                  ? 'bg-amber-100 border-amber-400 scale-105 shadow-amber-400/40'
                  : 'bg-stone-100 border-stone-300 hover:bg-stone-200'
              }`}
            >
              {/* Hole grass background */}
              <div className="absolute bottom-1 w-16 h-3 bg-stone-300 rounded-full opacity-60" />

              {isMole ? (
                <div className="text-5xl sm:text-6xl animate-gentle drop-shadow-md z-10">
                  🐹
                </div>
              ) : isHit ? (
                <div className="text-4xl animate-ping z-10">💥</div>
              ) : (
                <div className="text-2xl text-stone-400 font-bold">🕳️</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Start Button if not started */}
      {!isPlaying && !isGameOver && (
        <div className="text-center">
          <button
            onClick={startGame}
            className="py-4 px-10 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xl shadow-xl shadow-orange-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer animate-gentle"
          >
            開始 30秒反應挑戰 🚀
          </button>
        </div>
      )}

      {/* Game Over Modal */}
      {isGameOver && (
        <div className="bg-amber-50 border-3 border-amber-400 rounded-3xl p-6 text-center space-y-3 animate-in zoom-in-95">
          <div className="text-5xl">🏆</div>
          <h3 className="text-2xl sm:text-3xl font-black text-amber-950">
            挑戰結束！反應敏捷！
          </h3>
          <p className="text-stone-700 font-bold text-lg">
            您的得分：<strong className="text-amber-800 text-2xl">{score}</strong> 分！已為您入帳大腦訓練金幣！
          </p>
          <button
            onClick={startGame}
            className="py-3 px-8 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-black text-lg shadow-md shadow-amber-700/30 transition-all active:scale-95 cursor-pointer"
          >
            再挑戰一次 🔄
          </button>
        </div>
      )}

    </div>
  );
}
