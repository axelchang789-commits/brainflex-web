import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, CheckCircle2, Award, Flame, Heart, AlertCircle, Sparkles, Music } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { playTickSound } from '../utils/audio';

export function PhysicalWorkout() {
  const { completedToday, completeWorkout, triggerSound, triggerSpeech } = useApp();
  
  // Selected Workout Tab: 'chair' | 'jogging'
  const [activeWorkout, setActiveWorkout] = useState('chair');

  // Timer States
  const [chairSeconds, setChairSeconds] = useState(300); // 5 min
  const [isChairRunning, setIsChairRunning] = useState(false);
  const [chairStepIdx, setChairStepIdx] = useState(0);

  const [jogSeconds, setJogSeconds] = useState(600); // 10 min
  const [isJogRunning, setIsJogRunning] = useState(false);
  const [jogBpmEnabled, setJogBpmEnabled] = useState(false);
  const [jogSteps, setJogSteps] = useState(0);

  // Chair Exercises List
  const chairExercises = [
    { title: '1. 溫和頸部與肩部環繞', desc: '坐穩椅子，雙手垂放，緩慢左右轉頭與聳肩放鬆', duration: 75, icon: '🧘' },
    { title: '2. 坐姿擴胸與側腰伸展', desc: '雙手向兩側張開深吸氣，輕輕向左右側身拉伸腰側', duration: 75, icon: '👐' },
    { title: '3. 核心抬膝與下肢循環', desc: '背部挺直，左右輪流抬高膝蓋，鍛鍊大腿與下腹肌力', duration: 75, icon: '🦵' },
    { title: '4. 腳踝繞圈與深呼吸調息', desc: '抬起雙腳畫圈活動腳踝，配合腹式呼吸讓全身放鬆', duration: 75, icon: '✨' },
  ];

  // Chair Timer Interval
  useEffect(() => {
    let interval = null;
    if (isChairRunning && chairSeconds > 0) {
      interval = setInterval(() => {
        setChairSeconds((prev) => {
          if (prev <= 1) {
            setIsChairRunning(false);
            triggerSpeech('恭喜您完成5分鐘椅上伸展操！請點擊下方按鈕領取金幣！');
            return 0;
          }
          // Progress steps
          const elapsed = 300 - (prev - 1);
          const newStep = Math.min(3, Math.floor(elapsed / 75));
          if (newStep !== chairStepIdx) {
            setChairStepIdx(newStep);
            triggerSpeech(`現在進行下一個動作：${chairExercises[newStep].title}`);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isChairRunning, chairSeconds, chairStepIdx]);

  // Jogging Timer & 180 BPM Metronome Interval
  useEffect(() => {
    let timer = null;
    let metronome = null;

    if (isJogRunning && jogSeconds > 0) {
      timer = setInterval(() => {
        setJogSeconds((prev) => {
          if (prev <= 1) {
            setIsJogRunning(false);
            setJogBpmEnabled(false);
            triggerSpeech('太棒了！10分鐘高年級超慢跑完成！快來領取30金幣獎勵！');
            return 0;
          }
          setJogSteps((s) => s + 3); // ~180 steps per min -> 3 steps per sec
          return prev - 1;
        });
      }, 1000);

      // 180 BPM = 3 beats per second = 333ms
      if (jogBpmEnabled) {
        metronome = setInterval(() => {
          playTickSound();
        }, 333);
      }
    }

    return () => {
      clearInterval(timer);
      clearInterval(metronome);
    };
  }, [isJogRunning, jogSeconds, jogBpmEnabled]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleFinishWorkout = () => {
    completeWorkout();
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8 animate-in fade-in">
      
      {/* Title & Introduction */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-black/20 border border-white/30 px-3 py-1 rounded-full text-xs sm:text-sm font-bold text-amber-200 mb-2">
              <Flame className="w-4 h-4 text-yellow-300" />
              <span>每日有氧與肌力維持</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black">每日健康運動 🏃‍♂️</h1>
            <p className="text-amber-100 text-base sm:text-lg font-medium mt-1">
              運動能促進腦源性神經營養因子 (BDNF) 分泌，防止大腦海馬迴萎縮！
            </p>
          </div>

          <div className="bg-amber-950/40 border-2 border-yellow-300/40 rounded-2xl p-4 text-center shrink-0">
            <div className="text-xs text-amber-200 font-bold">完成今日運動獎勵</div>
            <div className="text-2xl sm:text-3xl font-black text-yellow-300">
              🪙 +30 金幣
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => {
              triggerSound('click');
              setActiveWorkout('chair');
              triggerSpeech('已切換為5分鐘椅上核心伸展操');
            }}
            className={`flex-1 py-3 px-4 rounded-2xl font-black text-base sm:text-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeWorkout === 'chair'
                ? 'bg-white text-amber-950 shadow-lg scale-102'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <span>🪑 5分鐘椅上核心伸展</span>
          </button>

          <button
            onClick={() => {
              triggerSound('click');
              setActiveWorkout('jogging');
              triggerSpeech('已切換為10分鐘在家高年級超慢跑');
            }}
            className={`flex-1 py-3 px-4 rounded-2xl font-black text-base sm:text-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeWorkout === 'jogging'
                ? 'bg-white text-amber-950 shadow-lg scale-102'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <span>🏃 10分鐘在家超慢跑</span>
          </button>
        </div>
      </div>

      {/* WORKOUT 1: CHAIR EXERCISE */}
      {activeWorkout === 'chair' && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-stone-200 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Timer Display */}
              <div className="lg:col-span-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border-2 border-amber-200 text-center flex flex-col items-center justify-center space-y-4">
                <div className="text-6xl">{chairExercises[chairStepIdx].icon}</div>
                <div>
                  <div className="text-sm font-black text-amber-800 uppercase tracking-wider">剩餘時間</div>
                  <div className="text-5xl sm:text-6xl font-black text-stone-900 tracking-tight my-1 font-mono">
                    {formatTime(chairSeconds)}
                  </div>
                  <div className="text-sm font-bold text-amber-900 bg-amber-200/70 px-3 py-1 rounded-full inline-block mt-1">
                    當前階段：第 {chairStepIdx + 1} / 4 式
                  </div>
                </div>

                {/* Controls */}
                <div className="flex gap-3 w-full pt-2">
                  <button
                    onClick={() => {
                      triggerSound('click');
                      setIsChairRunning(!isChairRunning);
                      if (!isChairRunning) triggerSpeech('開始伸展操！跟著提示動作呼吸伸展！');
                    }}
                    className={`flex-1 py-3.5 px-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 text-white shadow-md transition-all cursor-pointer ${
                      isChairRunning
                        ? 'bg-amber-600 hover:bg-amber-700'
                        : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'
                    }`}
                  >
                    {isChairRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-white" />}
                    <span>{isChairRunning ? '暫停' : '開始計時'}</span>
                  </button>

                  <button
                    onClick={() => {
                      triggerSound('click');
                      setIsChairRunning(false);
                      setChairSeconds(300);
                      setChairStepIdx(0);
                    }}
                    className="p-3.5 rounded-2xl bg-stone-200 hover:bg-stone-300 text-stone-700 transition-all cursor-pointer"
                    title="重設時間"
                  >
                    <RotateCcw className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Right Steps Guide */}
              <div className="lg:col-span-7 space-y-3">
                <h3 className="text-xl font-black text-stone-800 mb-2 flex items-center gap-2">
                  🧘 5分鐘坐姿伸展動作指引 (安全防跌)
                </h3>

                <div className="space-y-2.5">
                  {chairExercises.map((ex, idx) => {
                    const isCurrent = chairStepIdx === idx;
                    const isPast = chairStepIdx > idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setChairStepIdx(idx);
                          triggerSpeech(ex.title + '。' + ex.desc);
                        }}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                          isCurrent
                            ? 'bg-amber-50 border-amber-400 shadow-sm scale-[1.01]'
                            : isPast
                            ? 'bg-stone-50 border-stone-200 opacity-70'
                            : 'bg-white border-stone-200 hover:border-amber-300'
                        }`}
                      >
                        <div className="text-3xl shrink-0 mt-0.5">{ex.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-black text-base sm:text-lg ${isCurrent ? 'text-amber-900' : 'text-stone-800'}`}>
                              {ex.title}
                            </h4>
                            {isCurrent && (
                              <span className="text-xs font-black bg-amber-500 text-white px-2 py-0.5 rounded-md animate-pulse">
                                進行中
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1 leading-relaxed">
                            {ex.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* WORKOUT 2: HIGH SENIOR JOGGING */}
      {activeWorkout === 'jogging' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-stone-200 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Timer & BPM display */}
              <div className="lg:col-span-5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 border-2 border-emerald-200 text-center flex flex-col items-center justify-center space-y-4">
                <div className="text-6xl animate-gentle">🏃‍♀️</div>
                <div>
                  <div className="text-sm font-black text-emerald-800 uppercase tracking-wider">慢跑剩餘時間</div>
                  <div className="text-5xl sm:text-6xl font-black text-stone-900 tracking-tight my-1 font-mono">
                    {formatTime(jogSeconds)}
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-200 px-3 py-1 rounded-full">
                      累計步數：約 {jogSteps} 步
                    </span>
                  </div>
                </div>

                {/* 180 BPM Metronome Toggle */}
                <button
                  onClick={() => {
                    setJogBpmEnabled(!jogBpmEnabled);
                    triggerSpeech(jogBpmEnabled ? '已關閉節拍器' : '已開啟 180 BPM 黃金步頻節拍器！請跟隨節奏輕踏腳步！');
                  }}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
                    jogBpmEnabled
                      ? 'bg-purple-100 border-purple-400 text-purple-900 shadow-xs'
                      : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Music className={`w-4 h-4 ${jogBpmEnabled ? 'text-purple-600 animate-bounce' : ''}`} />
                  <span>180 BPM 慢跑節拍器 ({jogBpmEnabled ? '開啟中 🔊' : '點擊開啟 🔈'})</span>
                </button>

                {/* Controls */}
                <div className="flex gap-3 w-full pt-1">
                  <button
                    onClick={() => {
                      triggerSound('click');
                      setIsJogRunning(!isJogRunning);
                      if (!isJogRunning) {
                        setJogBpmEnabled(true);
                        triggerSpeech('超慢跑開始！不酸、不痛、不喘，前腳掌著地！');
                      }
                    }}
                    className={`flex-1 py-3.5 px-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 text-white shadow-md transition-all cursor-pointer ${
                      isJogRunning
                        ? 'bg-amber-600 hover:bg-amber-700'
                        : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'
                    }`}
                  >
                    {isJogRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-white" />}
                    <span>{isJogRunning ? '暫停慢跑' : '開始慢跑'}</span>
                  </button>

                  <button
                    onClick={() => {
                      triggerSound('click');
                      setIsJogRunning(false);
                      setJogBpmEnabled(false);
                      setJogSeconds(600);
                      setJogSteps(0);
                    }}
                    className="p-3.5 rounded-2xl bg-stone-200 hover:bg-stone-300 text-stone-700 transition-all cursor-pointer"
                    title="重設計時"
                  >
                    <RotateCcw className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Right: Golden Rules */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-xl font-black text-stone-800 flex items-center gap-2">
                  ⭐ 高年級超慢跑四大黃金要領
                </h3>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-stone-50 border-2 border-stone-200">
                    <h4 className="font-extrabold text-base text-stone-800">1. 不酸、不痛、不喘 💨</h4>
                    <p className="text-xs sm:text-sm text-stone-600 font-medium mt-0.5">
                      超慢跑速度以「可以輕鬆說話或唱歌」為原則，絕不造成心肺或關節過大負擔。
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border-2 border-stone-200">
                    <h4 className="font-extrabold text-base text-stone-800">2. 前腳掌先著地，腳後跟輕觸地 🦶</h4>
                    <p className="text-xs sm:text-sm text-stone-600 font-medium mt-0.5">
                      利用足弓自然避震，避免重踩造成膝蓋震盪，保護退化性關節。
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border-2 border-stone-200">
                    <h4 className="font-extrabold text-base text-stone-800">3. 膝蓋微曲、身體直立 📐</h4>
                    <p className="text-xs sm:text-sm text-stone-600 font-medium mt-0.5">
                      雙膝保持微彈性彎曲，視線往前看，雙手自然在身側擺動。
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border-2 border-stone-200">
                    <h4 className="font-extrabold text-base text-stone-800">4. 每分鐘 180 步小步伐 🎵</h4>
                    <p className="text-xs sm:text-sm text-stone-600 font-medium mt-0.5">
                      步幅小而快，即使在客廳看電視也能隨時原地開跑！
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Core Finish Workout Button (領取 30 金幣) */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 rounded-3xl p-6 sm:p-8 border-3 border-emerald-400 text-center shadow-lg space-y-4">
        <div className="inline-block p-3 rounded-full bg-emerald-100 text-emerald-800 text-3xl mb-1">
          🎉
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-stone-900">
          完成今日運動了嗎？
        </h3>
        <p className="text-stone-600 text-base sm:text-lg font-medium max-w-xl mx-auto">
          只要跟著做完 5 分鐘伸展或超慢跑，立即點擊下方按鈕領取今天的健康金幣！
        </p>

        <button
          onClick={handleFinishWorkout}
          disabled={completedToday.workout}
          className={`py-5 px-10 rounded-2xl font-black text-xl sm:text-2xl shadow-xl transition-all flex items-center justify-center gap-3 mx-auto cursor-pointer ${
            completedToday.workout
              ? 'bg-stone-200 text-stone-700 cursor-not-allowed border-2 border-stone-300'
              : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-emerald-600/30 hover:scale-105 active:scale-95 animate-gentle border-2 border-emerald-400'
          }`}
        >
          {completedToday.workout ? (
            <>
              <CheckCircle2 className="w-8 h-8 text-green-700" />
              <span>今日運動已打卡 (+30 金幣已入帳)</span>
            </>
          ) : (
            <>
              <Sparkles className="w-8 h-8 text-yellow-300 fill-yellow-300" />
              <span>我跟著做完了！領取 30 金幣</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
