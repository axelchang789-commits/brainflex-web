import React from 'react';
import { Play, Sparkles, Activity, Brain, Salad, Camera, CheckCircle2, Circle, Flame, ChevronRight, Award, Volume2, HeartHandshake, SunMedium } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Dashboard() {
  const { user, coins, streakDays, todayCoinsEarned, completedToday, setActiveTab, triggerSpeech, triggerSound } = useApp();

  const totalTasks = 4;
  const completedCount = [
    completedToday.workout,
    completedToday.brainGames.memory || completedToday.brainGames.mole || completedToday.brainGames.stroop,
    completedToday.diet.greens && completedToday.diet.nuts && completedToday.diet.waterCups >= 6,
    completedToday.photoShared,
  ].filter(Boolean).length;

  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  const handleStartCoreChallenge = () => {
    triggerSound('click');
    if (!completedToday.workout) {
      setActiveTab('workout');
      triggerSpeech('開始今天的運動挑戰！5分鐘椅子伸展與超慢跑！');
    } else {
      setActiveTab('games');
      triggerSpeech('開始今天的大腦訓練遊戲！活化記憶與反應！');
    }
  };

  const handleVoiceDailySummary = () => {
    triggerSpeech(`早安！${user.name}。今天您的每日任務進度為 ${completedCount} 共 4 項。今日已累積獲得 ${todayCoinsEarned} 枚健康金幣。點擊開始今天的挑戰，讓身體和大腦充滿活力！`);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8 animate-in fade-in">
      
      {/* 1. Senior Warm Greeting Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Background decorative watermark */}
        <div className="absolute -right-8 -bottom-8 opacity-10 text-9xl select-none pointer-events-none">
          🧠
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-900/60 border border-emerald-400/30 px-3 py-1 rounded-full text-xs sm:text-sm font-bold text-emerald-200 mb-3">
              <SunMedium className="w-4 h-4 text-amber-300 animate-spin-slow" />
              <span>今日防失智活力計畫</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">
              {user.name}，早安！✨
            </h1>
            <p className="text-emerald-100 text-base sm:text-lg font-medium max-w-xl">
              規律運動 15 分鐘 + 動腦遊戲 5 分鐘，配合地中海飲食，能讓腦神經突觸持續增生，維持最佳靈活力！
            </p>
          </div>

          {/* Read aloud button */}
          <button
            onClick={handleVoiceDailySummary}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-3 rounded-2xl font-black text-sm sm:text-base backdrop-blur-xs border border-white/30 shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
            title="語音播報今日狀態"
          >
            <Volume2 className="w-6 h-6 text-yellow-300" />
            <span>語音播報</span>
          </button>
        </div>
      </div>

      {/* 2. Main Hero Challenge Card (每日核心挑戰卡片) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-emerald-600/30 shadow-lg relative overflow-hidden bg-gradient-to-br from-white via-white to-emerald-50/40">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm sm:text-base">
              <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
              <span>每日核心推薦任務</span>
              <span className="bg-amber-100 text-amber-900 text-xs px-2.5 py-0.5 rounded-full font-black border border-amber-300">
                可得 +50 金幣
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight">
              【開始今天的挑戰】(運動15分 + 遊戲5分)
            </h2>

            <p className="text-stone-600 text-base sm:text-lg font-medium">
              只要跟著影片坐姿伸展與超慢跑，再通關 1 款大腦記憶對對碰，即可輕鬆達成防失智核心目標！
            </p>

            {/* Overall Daily Progress Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-sm sm:text-base font-extrabold text-stone-700">
                <span>今日整體防失智進度（已完成 {completedCount} / {totalTasks} 項）</span>
                <span className="text-emerald-700 font-black">{progressPercent}%</span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-4 overflow-hidden p-0.5 border border-stone-300">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-green-600 h-full rounded-full transition-all duration-500 shadow-xs"
                  style={{ width: `${Math.max(8, progressPercent)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Big Action Button */}
          <button
            onClick={handleStartCoreChallenge}
            className="w-full lg:w-auto py-5 px-8 sm:px-10 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xl sm:text-2xl shadow-xl shadow-emerald-700/30 flex items-center justify-center gap-3 transition-all hover:scale-103 active:scale-97 cursor-pointer shrink-0 border-2 border-emerald-400/50 animate-gentle"
          >
            <Play className="w-8 h-8 fill-white" />
            <span>開始今日挑戰</span>
          </button>
        </div>
      </div>

      {/* 3. Gold Coins & Stats Banner (金幣獎勵狀態列) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Stat 1: Today Coins */}
        <div className="bg-white rounded-2xl p-5 border-2 border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl border border-amber-300">
            🪙
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-stone-700">今日已獲得金幣</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-900">
              +{todayCoinsEarned} <span className="text-sm font-bold text-stone-700">幣</span>
            </div>
          </div>
        </div>

        {/* Stat 2: Streak Days */}
        <div className="bg-white rounded-2xl p-5 border-2 border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl border border-orange-300">
            🔥
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-stone-700">連續打卡連霸</div>
            <div className="text-2xl sm:text-3xl font-black text-orange-800">
              {streakDays} <span className="text-sm font-bold text-stone-700">天</span>
            </div>
          </div>
        </div>

        {/* Stat 3: 7-Day Target */}
        <div className="bg-white rounded-2xl p-5 border-2 border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-3xl border border-purple-300">
            🏆
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-stone-700">滿7天加碼目標</div>
            <div className="text-xl sm:text-2xl font-black text-purple-800">
              還差 {7 - (streakDays % 7 || 7)} 天 <span className="text-xs font-bold text-purple-600">(+100幣)</span>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Quick Access Area (快捷區：今日飲食打卡 | 拍張照傳給家人) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Quick 1: Diet */}
        <button
          onClick={() => {
            triggerSound('click');
            setActiveTab('diet');
            triggerSpeech('前往地中海飲食打卡');
          }}
          className="bg-white hover:bg-green-50/60 rounded-3xl p-6 border-3 border-green-300 shadow-md flex items-center justify-between text-left transition-all hover:scale-[1.02] active:scale-98 cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center text-4xl text-white shadow-md shadow-green-500/20 group-hover:rotate-6 transition-transform">
              🥗
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-stone-800">今日飲食打卡</h3>
                <span className="text-xs bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full">
                  +30 金幣
                </span>
              </div>
              <p className="text-stone-600 text-sm font-medium mt-1">
                深綠蔬菜、堅果好油與 1500cc 飲水
              </p>
            </div>
          </div>
          <ChevronRight className="w-8 h-8 text-green-700 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Quick 2: LINE Photo Sharing */}
        <button
          onClick={() => {
            triggerSound('click');
            setActiveTab('photo');
            triggerSpeech('前往拍張照傳給家人');
          }}
          className="bg-white hover:bg-blue-50/60 rounded-3xl p-6 border-3 border-blue-300 shadow-md flex items-center justify-between text-left transition-all hover:scale-[1.02] active:scale-98 cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-sky-400 flex items-center justify-center text-4xl text-white shadow-md shadow-blue-500/20 group-hover:rotate-6 transition-transform">
              📸
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-stone-800">拍張照傳給家人</h3>
                <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                  +15 金幣
                </span>
              </div>
              <p className="text-stone-600 text-sm font-medium mt-1">
                一鍵免打字關懷語，傳送生活照到 LINE
              </p>
            </div>
          </div>
          <ChevronRight className="w-8 h-8 text-blue-700 group-hover:translate-x-1 transition-transform" />
        </button>

      </div>

      {/* 5. Today's Checklist Cards */}
      <div className="bg-white rounded-3xl p-6 border-2 border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-black text-stone-800 flex items-center gap-2">
            📋 今日防失智習慣清單
          </h3>
          <span className="text-xs sm:text-sm font-bold text-stone-700">
            完成度：{completedCount} / {totalTasks}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          {/* Item 1: Workout */}
          <div
            onClick={() => {
              triggerSound('click');
              setActiveTab('workout');
            }}
            className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
              completedToday.workout
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800'
            }`}
          >
            <div className="flex items-center gap-3">
              {completedToday.workout ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-700 fill-emerald-100" />
              ) : (
                <Circle className="w-6 h-6 text-stone-700" />
              )}
              <div>
                <div className="font-extrabold text-base">每日健康運動 (15分鐘)</div>
                <div className="text-xs text-stone-700">椅上伸展操 / 高年級超慢跑</div>
              </div>
            </div>
            <span className="text-xs font-black px-2 py-1 rounded-md bg-amber-100 text-amber-900">
              +30 金幣
            </span>
          </div>

          {/* Item 2: Brain Games */}
          <div
            onClick={() => {
              triggerSound('click');
              setActiveTab('games');
            }}
            className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
              completedToday.brainGames.memory || completedToday.brainGames.mole || completedToday.brainGames.stroop
                ? 'bg-purple-50 border-purple-300 text-purple-950'
                : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800'
            }`}
          >
            <div className="flex items-center gap-3">
              {completedToday.brainGames.memory || completedToday.brainGames.mole || completedToday.brainGames.stroop ? (
                <CheckCircle2 className="w-6 h-6 text-purple-700 fill-purple-100" />
              ) : (
                <Circle className="w-6 h-6 text-stone-700" />
              )}
              <div>
                <div className="font-extrabold text-base">大腦認知遊戲 (5分鐘)</div>
                <div className="text-xs text-stone-700">記憶對對碰 / 打地鼠 / 色彩測驗</div>
              </div>
            </div>
            <span className="text-xs font-black px-2 py-1 rounded-md bg-amber-100 text-amber-900">
              +20 金幣
            </span>
          </div>

          {/* Item 3: MIND Diet */}
          <div
            onClick={() => {
              triggerSound('click');
              setActiveTab('diet');
            }}
            className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
              completedToday.diet.greens && completedToday.diet.nuts && completedToday.diet.waterCups >= 6
                ? 'bg-green-50 border-green-300 text-green-950'
                : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800'
            }`}
          >
            <div className="flex items-center gap-3">
              {completedToday.diet.greens && completedToday.diet.nuts && completedToday.diet.waterCups >= 6 ? (
                <CheckCircle2 className="w-6 h-6 text-green-700 fill-green-100" />
              ) : (
                <Circle className="w-6 h-6 text-stone-700" />
              )}
              <div>
                <div className="font-extrabold text-base">地中海飲食微任務</div>
                <div className="text-xs text-stone-700">深綠蔬菜 / 堅果橄欖油 / 1500cc水</div>
              </div>
            </div>
            <span className="text-xs font-black px-2 py-1 rounded-md bg-amber-100 text-amber-900">
              +30 金幣
            </span>
          </div>

          {/* Item 4: Photo Share */}
          <div
            onClick={() => {
              triggerSound('click');
              setActiveTab('photo');
            }}
            className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
              completedToday.photoShared
                ? 'bg-blue-50 border-blue-300 text-blue-950'
                : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800'
            }`}
          >
            <div className="flex items-center gap-3">
              {completedToday.photoShared ? (
                <CheckCircle2 className="w-6 h-6 text-blue-700 fill-blue-100" />
              ) : (
                <Circle className="w-6 h-6 text-stone-700" />
              )}
              <div>
                <div className="font-extrabold text-base">生活照分享給家人 (LINE)</div>
                <div className="text-xs text-stone-700">一鍵傳送溫馨關懷照片</div>
              </div>
            </div>
            <span className="text-xs font-black px-2 py-1 rounded-md bg-amber-100 text-amber-900">
              +15 金幣
            </span>
          </div>

        </div>
      </div>

      {/* 6. Medical & Health Tip Banner */}
      <div className="bg-amber-50 rounded-2xl p-5 border-2 border-amber-200 flex items-start gap-4 text-amber-950">
        <div className="text-3xl">💡</div>
        <div className="space-y-1">
          <h4 className="font-black text-base sm:text-lg text-amber-900">
            防失智衛教小百科：麥得飲食 (MIND Diet)
          </h4>
          <p className="text-xs sm:text-sm text-amber-900/90 font-medium leading-relaxed">
            研究證實：嚴格遵循地中海/麥得飲食長者，失智風險降低高達 53%！多攝取深綠色蔬菜、天然堅果、莓果與橄欖油，能保護大腦細胞免受自由基氧化損傷。
          </p>
        </div>
      </div>

    </div>
  );
}
