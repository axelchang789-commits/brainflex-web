import React, { useState } from 'react';
import { Brain, Sparkles, Volume2, Award, Zap, Palette, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MemoryGame } from './games/MemoryGame';
import { WhackMoleGame } from './games/WhackMoleGame';
import { StroopGame } from './games/StroopGame';

export function BrainGames() {
  const { completedToday, completeBrainGame, triggerSound, triggerSpeech } = useApp();
  const [activeGame, setActiveGame] = useState('memory'); // 'memory' | 'mole' | 'stroop'

  const games = [
    {
      id: 'memory',
      name: '記憶對對碰',
      subtitle: '短期工作記憶',
      icon: '🍎',
      desc: '翻開蔬果卡片，記住位置配對消除。活化顳葉海馬迴！',
      isDone: completedToday.brainGames.memory,
      color: 'emerald',
    },
    {
      id: 'mole',
      name: '反應打地鼠',
      subtitle: '注意力與手眼協調',
      icon: '🐹',
      desc: '30秒限時快速點擊冒出頭的地鼠。提升神經傳導速度！',
      isDone: completedToday.brainGames.mole,
      color: 'amber',
    },
    {
      id: 'stroop',
      name: '顏色干擾測驗',
      subtitle: 'Stroop 邏輯判斷',
      icon: '🎨',
      desc: '文字字義與字體顏色的抗干擾判斷。活化大腦前額葉！',
      isDone: completedToday.brainGames.stroop,
      color: 'purple',
    },
  ];

  const handleGameComplete = (score) => {
    completeBrainGame(activeGame, score);
  };

  const handleSpeechIntro = () => {
    triggerSpeech('大腦訓練遊戲專區：包含記憶對對碰、反應打地鼠、與顏色干擾測驗。每天玩5分鐘，能有效活化腦部神經突觸！');
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8 animate-in fade-in">
      
      {/* Title Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-purple-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-black/20 border border-white/30 px-3 py-1 rounded-full text-xs sm:text-sm font-bold text-purple-200 mb-2">
              <Brain className="w-4 h-4 text-purple-300" />
              <span>3 款大腦認知訓練 HTML5 遊戲</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black">大腦訓練遊戲 🧠</h1>
            <p className="text-purple-100 text-base sm:text-lg font-medium mt-1 max-w-2xl">
              透過遊戲化認知刺激，鍛鍊短期記憶、手眼協調與前額葉執行功能！
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleSpeechIntro}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl text-white font-bold transition-all cursor-pointer"
              title="語音介紹"
            >
              <Volume2 className="w-6 h-6 text-yellow-300" />
            </button>
            <div className="bg-purple-950/40 border-2 border-purple-300/40 rounded-2xl p-4 text-center">
              <div className="text-xs text-purple-200 font-bold">每局通關獎勵</div>
              <div className="text-2xl sm:text-3xl font-black text-yellow-300">
                🪙 +20 金幣
              </div>
            </div>
          </div>
        </div>

        {/* 3 Game Selection Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          {games.map((g) => {
            const isActive = activeGame === g.id;
            return (
              <button
                key={g.id}
                onClick={() => {
                  triggerSound('click');
                  setActiveGame(g.id);
                  triggerSpeech(`已切換為${g.name}`);
                }}
                className={`p-3.5 sm:p-4 rounded-2xl font-black text-left transition-all cursor-pointer flex items-center justify-between border-2 ${
                  isActive
                    ? 'bg-white text-purple-950 border-white shadow-lg scale-102'
                    : 'bg-white/15 text-white border-white/20 hover:bg-white/25'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{g.icon}</span>
                  <div>
                    <div className="text-base sm:text-lg leading-tight font-extrabold flex items-center gap-1.5">
                      {g.name}
                      {g.isDone && (
                        <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-md ${
                          isActive ? 'bg-green-100 text-green-800' : 'bg-green-500/30 text-green-300'
                        }`}>
                          已通關
                        </span>
                      )}
                    </div>
                    <div className={`text-xs ${isActive ? 'text-purple-700' : 'text-purple-200'}`}>
                      {g.subtitle}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Game Area */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-stone-200 shadow-md">
        {activeGame === 'memory' && <MemoryGame onComplete={handleGameComplete} />}
        {activeGame === 'mole' && <WhackMoleGame onComplete={handleGameComplete} />}
        {activeGame === 'stroop' && <StroopGame onComplete={handleGameComplete} />}
      </div>

    </div>
  );
}
