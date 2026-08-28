import React from 'react';
import { Home, Brain, Activity, Salad, Camera, Settings, Gift, Sparkles, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Sidebar() {
  const { activeTab, setActiveTab, completedToday, streakDays, triggerSound, triggerSpeech, setIsShopOpen } = useApp();

  const navItems = [
    {
      id: 'dashboard',
      label: '儀表板',
      sublabel: '首頁總覽',
      icon: Home,
      color: 'emerald',
      done: false,
    },
    {
      id: 'games',
      label: '大腦訓練遊戲',
      sublabel: '3 款認知活腦遊戲',
      icon: Brain,
      color: 'purple',
      badge: '+20 金幣',
      done: completedToday.brainGames.memory || completedToday.brainGames.mole || completedToday.brainGames.stroop,
    },
    {
      id: 'workout',
      label: '每日健康運動',
      sublabel: '伸展操與超慢跑',
      icon: Activity,
      color: 'amber',
      badge: '+30 金幣',
      done: completedToday.workout,
    },
    {
      id: 'diet',
      label: '地中海飲食打卡',
      sublabel: '麥得防失智小任務',
      icon: Salad,
      color: 'green',
      badge: '+30 金幣',
      done: completedToday.diet.greens && completedToday.diet.nuts && completedToday.diet.waterCups >= 6,
    },
    {
      id: 'photo',
      label: '生活照傳給家人',
      sublabel: 'LINE 一鍵溫馨分享',
      icon: Camera,
      color: 'blue',
      badge: '+15 金幣',
      done: completedToday.photoShared,
    },
    {
      id: 'settings',
      label: '系統設定',
      sublabel: '字體 / 語音 / 音效',
      icon: Settings,
      color: 'stone',
      done: false,
    },
  ];

  const handleNavClick = (item) => {
    triggerSound('click');
    setActiveTab(item.id);
    triggerSpeech(item.label);
  };

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white/80 backdrop-blur-xs border-r-2 border-stone-200 p-4 shrink-0 min-h-[calc(100vh-75px)] justify-between">
        <nav className="space-y-2">
          <div className="px-3 py-2 text-xs font-black uppercase tracking-wider text-stone-700">
            功能選單 (Navigation)
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-bold transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-700/20 scale-[1.02]'
                    : 'bg-stone-50/80 hover:bg-stone-100 text-stone-700 hover:text-stone-900 border border-stone-200/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all ${
                      isActive ? 'bg-white/20 text-white' : 'bg-stone-200/70 text-stone-700'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-base leading-tight font-extrabold flex items-center gap-1.5">
                      {item.label}
                      {item.done && (
                        <span className="text-xs bg-green-500/20 text-green-300 font-bold px-1.5 py-0.2 rounded-md">
                          ✓ 完成
                        </span>
                      )}
                    </div>
                    <div className={`text-xs ${isActive ? 'text-emerald-100' : 'text-stone-700'}`}>
                      {item.sublabel}
                    </div>
                  </div>
                </div>

                {item.badge && !item.done && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-black ${
                      isActive ? 'bg-amber-400 text-amber-950' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* 7-Day Retention Milestone Box */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md shadow-orange-500/20 border-2 border-amber-300/60">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-6 h-6 text-yellow-200 animate-gentle" />
            <h4 className="font-black text-base">7天連續打卡加碼</h4>
          </div>
          <p className="text-xs font-medium text-amber-100 mb-3">
            滿 7 天即享額外 <strong className="text-yellow-200 font-black text-sm">+100 金幣</strong> 大獎勵！
          </p>
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-amber-100">
              <span>當前進度：{streakDays % 7} / 7 天</span>
              <span>{Math.round(((streakDays % 7 || 7) / 7) * 100)}%</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden p-0.5 border border-white/20">
              <div
                className="bg-gradient-to-r from-yellow-300 to-amber-200 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(14, ((streakDays % 7 || 7) / 7) * 100))}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => {
              triggerSound('coin');
              setIsShopOpen(true);
            }}
            className="mt-3 w-full py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 border border-white/30 cursor-pointer"
          >
            <Gift className="w-4 h-4" /> 前往金幣商店兌換
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-stone-200 px-2 py-1.5 flex justify-around items-center shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-emerald-700 scale-105 font-black' : 'text-stone-700 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : ''}`} />
                {item.done && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white" />
                )}
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight font-bold">{item.label.slice(0, 4)}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
