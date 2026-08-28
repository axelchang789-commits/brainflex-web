import React, { useState, useEffect } from 'react';
import { RotateCcw, Sparkles, Award, Volume2, CheckCircle2, Clock, Footprints } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { playClickSound, playCoinSound, playWrongSound } from '../../utils/audio';

const CARD_ICONS = ['🍎', '🥦', '🥑', '🍇', '🍓', '🥕'];

export function MemoryGame({ onComplete }) {
  const { triggerSpeech } = useApp();

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const initGame = () => {
    const deck = [...CARD_ICONS, ...CARD_ICONS]
      .sort(() => Math.random() - 0.5)
      .map((icon, idx) => ({ id: idx, icon }));
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setSeconds(0);
    setIsGameOver(false);
    setIsPlaying(true);
    triggerSpeech('記憶對對碰開始！翻開兩張相同圖案的蔬果卡片把它們配對消除！');
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    let timer = null;
    if (isPlaying && !isGameOver) {
      timer = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isGameOver]);

  const handleCardClick = (idx) => {
    if (!isPlaying || isGameOver || flipped.length >= 2 || flipped.includes(idx) || matched.includes(idx)) {
      return;
    }

    playClickSound();
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx].icon === cards[secondIdx].icon) {
        // Match!
        setTimeout(() => {
          playCoinSound();
          const newMatched = [...matched, firstIdx, secondIdx];
          setMatched(newMatched);
          setFlipped([]);

          if (newMatched.length === cards.length) {
            setIsGameOver(true);
            setIsPlaying(false);
            const score = Math.max(70, 100 - moves * 2 - Math.floor(seconds / 2));
            if (onComplete) onComplete(score);
          }
        }, 500);
      } else {
        // Not Match
        setTimeout(() => {
          playWrongSound();
          setFlipped([]);
        }, 900);
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Game Top Info Bar */}
      <div className="bg-white rounded-2xl p-4 border-2 border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-stone-700 font-extrabold text-base sm:text-lg">
            <Footprints className="w-5 h-5 text-emerald-600" />
            <span>翻牌步數：<strong>{moves}</strong> 步</span>
          </div>
          <div className="flex items-center gap-1.5 text-stone-700 font-extrabold text-base sm:text-lg">
            <Clock className="w-5 h-5 text-amber-600" />
            <span>時間：<strong>{seconds}</strong> 秒</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => triggerSpeech('記憶對對碰：找出所有相同的蔬果配對。訓練短期工作記憶與專注力。')}
            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold transition-all cursor-pointer"
            title="語音規則說明"
          >
            <Volume2 className="w-5 h-5 text-emerald-700" />
          </button>
          <button
            onClick={initGame}
            className="py-2 px-4 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-black text-sm flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>重新一局</span>
          </button>
        </div>
      </div>

      {/* Cards Grid 4x3 */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 max-w-xl mx-auto">
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(idx);
          const isDone = matched.includes(idx);

          return (
            <button
              key={idx}
              onClick={() => handleCardClick(idx)}
              disabled={isDone}
              className={`h-24 sm:h-28 rounded-2xl sm:rounded-3xl border-3 flex items-center justify-center text-4xl sm:text-5xl transition-all duration-300 transform cursor-pointer select-none shadow-md ${
                isDone
                  ? 'bg-emerald-100 border-emerald-400 opacity-60 scale-95'
                  : isFlipped
                  ? 'bg-amber-100 border-amber-400 rotate-y-180 scale-102'
                  : 'bg-gradient-to-br from-emerald-600 to-green-700 border-emerald-500 hover:scale-103 text-white shadow-emerald-700/20 active:scale-95'
              }`}
            >
              {isFlipped ? (
                <span>{card.icon}</span>
              ) : (
                <span className="text-2xl font-black text-white/90">❓</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Game Over Message */}
      {isGameOver && (
        <div className="bg-emerald-50 border-3 border-emerald-400 rounded-3xl p-6 text-center space-y-3 animate-in zoom-in-95">
          <div className="text-5xl">🎉</div>
          <h3 className="text-2xl sm:text-3xl font-black text-emerald-950">
            恭喜通關！大腦記憶力超強！
          </h3>
          <p className="text-stone-600 font-bold text-base">
            總共使用 {moves} 步，耗時 {seconds} 秒！已發放大腦訓練獎勵金幣！
          </p>
          <button
            onClick={initGame}
            className="py-3 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg shadow-md shadow-emerald-700/30 transition-all active:scale-95 cursor-pointer"
          >
            再玩一局 🔄
          </button>
        </div>
      )}

    </div>
  );
}
