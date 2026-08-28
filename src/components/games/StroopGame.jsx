import React, { useState, useEffect } from 'react';
import { RotateCcw, Volume2, Sparkles, Award, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { playClickSound, playCoinSound, playWrongSound } from '../../utils/audio';

const COLOR_OPTIONS = [
  { name: '紅色', colorClass: 'text-red-600', bgClass: 'bg-red-500 hover:bg-red-600 border-red-400', key: 'red' },
  { name: '綠色', colorClass: 'text-emerald-600', bgClass: 'bg-emerald-500 hover:bg-emerald-600 border-emerald-400', key: 'green' },
  { name: '藍色', colorClass: 'text-blue-600', bgClass: 'bg-blue-500 hover:bg-blue-600 border-blue-400', key: 'blue' },
  { name: '黃色', colorClass: 'text-amber-500', bgClass: 'bg-amber-400 hover:bg-amber-500 border-amber-300', key: 'yellow' },
];

export function StroopGame({ onComplete }) {
  const { triggerSpeech } = useApp();

  const [questionIdx, setQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [currentQ, setCurrentQ] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong'

  const totalQuestions = 8;

  const generateQuestion = () => {
    // Mode: 'color' (ask for font color) or 'meaning' (ask for word text)
    const mode = Math.random() > 0.4 ? 'color' : 'meaning';
    const textOption = COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)];
    let colorOption = COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)];
    // Ensure interference most of the time
    if (colorOption.key === textOption.key && Math.random() > 0.3) {
      colorOption = COLOR_OPTIONS.find(c => c.key !== textOption.key) || colorOption;
    }

    const correctAnswer = mode === 'color' ? colorOption.key : textOption.key;

    return {
      mode,
      wordText: textOption.name,
      fontColorClass: colorOption.colorClass,
      correctKey: correctAnswer,
    };
  };

  const startNewGame = () => {
    setQuestionIdx(0);
    setScore(0);
    setIsGameOver(false);
    setFeedback(null);
    const firstQ = generateQuestion();
    setCurrentQ(firstQ);
    triggerSpeech('顏色干擾測驗開始！請看清楚題目指示，選擇文字的顏色或字義！');
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleAnswer = (selectedKey) => {
    if (feedback || isGameOver || !currentQ) return;

    const isCorrect = selectedKey === currentQ.correctKey;
    if (isCorrect) {
      playCoinSound();
      setScore((s) => s + 10);
      setFeedback('correct');
    } else {
      playWrongSound();
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      if (questionIdx + 1 >= totalQuestions) {
        setIsGameOver(true);
        const finalScore = Math.min(100, Math.max(60, (score + (isCorrect ? 10 : 0)) * 1.25));
        if (onComplete) onComplete(finalScore);
      } else {
        setQuestionIdx((q) => q + 1);
        setCurrentQ(generateQuestion());
      }
    }, 700);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Status Bar */}
      <div className="bg-white rounded-2xl p-4 border-2 border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <span className="font-black text-stone-700 text-base sm:text-lg">
            題目：<strong>{questionIdx + 1}</strong> / {totalQuestions} 題
          </span>
          <span className="font-black text-stone-700 text-base sm:text-lg">
            得分：<strong className="text-purple-700 text-xl">{score}</strong> 分
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => triggerSpeech('顏色干擾測驗：題目會要求您選擇文字的顏色或字體本身的文字意思。能活化大腦前額葉抑制控制能力。')}
            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold transition-all cursor-pointer"
            title="語音規則說明"
          >
            <Volume2 className="w-5 h-5 text-purple-700" />
          </button>
          <button
            onClick={startNewGame}
            className="py-2 px-4 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-black text-sm flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>重新一局</span>
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      {!isGameOver && currentQ && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-stone-200 shadow-md text-center max-w-lg mx-auto space-y-6">
          
          {/* Target Instruction Pill */}
          <div className="inline-block bg-purple-100 border-2 border-purple-300 text-purple-950 px-5 py-2 rounded-full font-black text-base sm:text-lg">
            {currentQ.mode === 'color' ? (
              <span>🎯 請選出文字的【顏色】！</span>
            ) : (
              <span>🎯 請選出文字的【意思/字義】！</span>
            )}
          </div>

          {/* Big Stroop Word */}
          <div className="py-6 sm:py-8 bg-stone-50 rounded-2xl border-2 border-stone-200">
            <div className={`text-6xl sm:text-7xl font-black tracking-wider transition-all select-none ${currentQ.fontColorClass}`}>
              {currentQ.wordText}
            </div>
          </div>

          {/* Feedback Icon */}
          {feedback && (
            <div className="text-2xl font-black animate-bounce">
              {feedback === 'correct' ? '✅ 太棒了！答對了！' : '❌ 答錯了，再接再厲！'}
            </div>
          )}

          {/* 4 Color Options Buttons */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
            {COLOR_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => handleAnswer(opt.key)}
                className={`py-4 px-4 rounded-2xl text-white font-black text-xl sm:text-2xl shadow-md transition-all transform hover:scale-103 active:scale-97 cursor-pointer border-2 ${opt.bgClass}`}
              >
                {opt.name}
              </button>
            ))}
          </div>

        </div>
      )}

      {/* Game Over Screen */}
      {isGameOver && (
        <div className="bg-purple-50 border-3 border-purple-400 rounded-3xl p-6 text-center space-y-4 max-w-lg mx-auto animate-in zoom-in-95">
          <div className="text-5xl">🧠</div>
          <h3 className="text-2xl sm:text-3xl font-black text-purple-950">
            測驗完成！大腦前額葉超敏捷！
          </h3>
          <p className="text-stone-700 font-bold text-lg">
            最終得分：<strong className="text-purple-800 text-2xl">{score}</strong> 分！已為您發放 +20 健康金幣！
          </p>
          <button
            onClick={startNewGame}
            className="py-3.5 px-8 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-lg shadow-md shadow-purple-700/30 transition-all active:scale-95 cursor-pointer"
          >
            再測驗一局 🔄
          </button>
        </div>
      )}

    </div>
  );
}
