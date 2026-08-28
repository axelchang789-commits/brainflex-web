import React from 'react';
import { Salad, Droplets, Sparkles, CheckCircle2, Circle, Star, Volume2, Info, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function MindDietTracker() {
  const { completedToday, toggleDietTask, addWaterCup, triggerSound, triggerSpeech } = useApp();

  const diet = completedToday.diet;
  const waterTargetCups = 6;
  const currentWaterCc = diet.waterCups * 250;
  const isWaterDone = diet.waterCups >= waterTargetCups;

  // Star Rating Calculation
  let stars = 3;
  if (diet.greens) stars++;
  if (diet.nuts) stars++;
  if (isWaterDone) stars++;

  const handleSpeechGuide = () => {
    triggerSpeech('地中海與麥得飲食每日三項微任務：一、吃到深綠色蔬菜；二、吃一把天然堅果或橄欖油；三、喝足1500毫升白開水。每完成一項可獲得10金幣！');
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8 animate-in fade-in">
      
      {/* Title & Introduction */}
      <div className="bg-gradient-to-r from-emerald-700 via-green-700 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-black/20 border border-white/30 px-3 py-1 rounded-full text-xs sm:text-sm font-bold text-emerald-200 mb-2">
              <Salad className="w-4 h-4 text-emerald-300" />
              <span>MIND Diet 麥得防失智飲食檢核</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black">地中海飲食小任務 🥗</h1>
            <p className="text-emerald-100 text-base sm:text-lg font-medium mt-1 max-w-2xl">
              每日微任務：深綠蔬菜、堅果好油、充足白開水，簡單打卡守護大腦血管！
            </p>
          </div>

          <button
            onClick={handleSpeechGuide}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-3 rounded-2xl font-black text-sm sm:text-base backdrop-blur-xs border border-white/30 shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <Volume2 className="w-6 h-6 text-yellow-300" />
            <span>語音解說</span>
          </button>
        </div>
      </div>

      {/* 3 Core Micro Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* TASK 1: GREEN VEGGIES */}
        <div className={`bg-white rounded-3xl p-6 border-3 transition-all shadow-md flex flex-col justify-between ${
          diet.greens ? 'border-emerald-500 bg-emerald-50/30' : 'border-stone-200 hover:border-emerald-300'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-4xl border-2 border-emerald-300">
                🥦
              </div>
              <span className="text-xs font-black bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full">
                +10 金幣
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-stone-900 mb-2">
              任務 1：深綠色蔬菜
            </h3>
            <p className="text-stone-600 text-sm sm:text-base font-medium mb-4 leading-relaxed">
              今天有吃菠菜、芥藍、地瓜葉或花椰菜嗎？富含葉酸與葉黃素，活化腦神經！
            </p>

            <div className="text-xs bg-stone-100 text-stone-700 p-2.5 rounded-xl font-bold mb-4">
              💡 推薦：每餐至少半碗深綠色蔬菜
            </div>
          </div>

          <button
            onClick={() => {
              triggerSound('click');
              toggleDietTask('greens');
              if (!diet.greens) triggerSpeech('深綠色蔬菜打卡成功！獲得10枚健康金幣！');
            }}
            className={`w-full py-4 px-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
              diet.greens
                ? 'bg-emerald-600 text-white shadow-emerald-600/30 cursor-default'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-2 border-emerald-400 active:scale-95'
            }`}
          >
            {diet.greens ? (
              <>
                <CheckCircle2 className="w-6 h-6" />
                <span>今天已吃深綠蔬菜 ✓</span>
              </>
            ) : (
              <>
                <Circle className="w-6 h-6 text-emerald-600" />
                <span>點擊打卡 (+10 金幣)</span>
              </>
            )}
          </button>
        </div>

        {/* TASK 2: NUTS & OLIVE OIL */}
        <div className={`bg-white rounded-3xl p-6 border-3 transition-all shadow-md flex flex-col justify-between ${
          diet.nuts ? 'border-amber-500 bg-amber-50/30' : 'border-stone-200 hover:border-amber-300'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-4xl border-2 border-amber-300">
                🥜
              </div>
              <span className="text-xs font-black bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full">
                +10 金幣
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-stone-900 mb-2">
              任務 2：堅果或橄欖油
            </h3>
            <p className="text-stone-600 text-sm sm:text-base font-medium mb-4 leading-relaxed">
              今天有吃一小把核桃、腰果、杏仁或使用冷壓初榨橄欖油拌菜嗎？
            </p>

            <div className="text-xs bg-stone-100 text-stone-700 p-2.5 rounded-xl font-bold mb-4">
              💡 推薦：天然 Omega-3 優質脂肪酸
            </div>
          </div>

          <button
            onClick={() => {
              triggerSound('click');
              toggleDietTask('nuts');
              if (!diet.nuts) triggerSpeech('堅果與好油打卡成功！獲得10枚健康金幣！');
            }}
            className={`w-full py-4 px-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
              diet.nuts
                ? 'bg-amber-600 text-white shadow-amber-600/30 cursor-default'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-2 border-amber-400 active:scale-95'
            }`}
          >
            {diet.nuts ? (
              <>
                <CheckCircle2 className="w-6 h-6" />
                <span>今天已吃堅果好油 ✓</span>
              </>
            ) : (
              <>
                <Circle className="w-6 h-6 text-amber-600" />
                <span>點擊打卡 (+10 金幣)</span>
              </>
            )}
          </button>
        </div>

        {/* TASK 3: WATER 1500 CC */}
        <div className={`bg-white rounded-3xl p-6 border-3 transition-all shadow-md flex flex-col justify-between ${
          isWaterDone ? 'border-blue-500 bg-blue-50/30' : 'border-stone-200 hover:border-blue-300'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-4xl border-2 border-blue-300">
                💧
              </div>
              <span className="text-xs font-black bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full">
                +10 金幣
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-stone-900 mb-2">
              任務 3：足量白開水 1500cc
            </h3>
            <p className="text-stone-600 text-sm sm:text-base font-medium mb-3">
              已喝 <strong className="text-blue-700 text-lg">{currentWaterCc} cc</strong> / 目標 1500 cc
            </p>

            {/* Interactive 6 Water Cups */}
            <div className="grid grid-cols-6 gap-1.5 mb-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  onClick={() => {
                    if (diet.waterCups === i) addWaterCup();
                  }}
                  className={`p-2 rounded-xl text-center border-2 transition-all cursor-pointer ${
                    i < diet.waterCups
                      ? 'bg-blue-500 border-blue-600 text-white shadow-xs'
                      : 'bg-stone-100 border-stone-300 text-stone-700 hover:bg-blue-100'
                  }`}
                  title={`第 ${i + 1} 杯 (250cc)`}
                >
                  <div className="text-xl">{i < diet.waterCups ? '🥛' : '🥤'}</div>
                  <div className="text-[10px] font-bold mt-1">250cc</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              if (!isWaterDone) {
                addWaterCup();
                triggerSpeech(`已記錄喝水一杯！目前累計 ${currentWaterCc + 250} 毫升！`);
              }
            }}
            disabled={isWaterDone}
            className={`w-full py-4 px-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-md ${
              isWaterDone
                ? 'bg-blue-600 text-white shadow-blue-600/30 cursor-default'
                : 'bg-blue-50 hover:bg-blue-100 text-blue-900 border-2 border-blue-400 active:scale-95 cursor-pointer'
            }`}
          >
            {isWaterDone ? (
              <>
                <CheckCircle2 className="w-6 h-6" />
                <span>1500cc 飲水已達標 ✓</span>
              </>
            ) : (
              <>
                <Plus className="w-6 h-6 text-blue-700" />
                <span>喝了一杯水 (+250cc)</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Weekly Star Rating & Recognition Badge */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-stone-200 shadow-md">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-5xl shadow-lg shadow-amber-400/30 border-2 border-white shrink-0">
              🏅
            </div>
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-1 mb-1">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-6 h-6 ${
                      idx < stars ? 'text-amber-400 fill-amber-400 animate-gentle' : 'text-stone-300'
                    }`}
                  />
                ))}
                <span className="ml-2 font-black text-amber-800 text-lg">{stars} 星級優良標章</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                本週健康飲食評鑑：特優防失智先鋒
              </h3>
              <p className="text-stone-600 text-sm sm:text-base font-medium mt-1">
                恭喜！您的飲食習慣富含抗氧化植化素與健康單元不飽和脂肪酸，有效維護腦部微血管健康！
              </p>
            </div>
          </div>

          <div className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 text-center shrink-0 w-full lg:w-auto">
            <div className="text-xs text-stone-700 font-bold">今日飲食金幣獲取</div>
            <div className="text-3xl font-black text-emerald-800 mt-0.5">
              +{[diet.greens, diet.nuts, isWaterDone].filter(Boolean).length * 10} <span className="text-sm">/ 30 金幣</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
