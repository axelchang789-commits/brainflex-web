import React, { useState } from 'react';
import { X, ShieldCheck, Award, Gift, Coins, Sparkles, Check, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function ShopModal() {
  const { isShopOpen, setIsShopOpen, coins, streakFreezes, buyStreakFreeze, customRewards, redeemReward, triggerSound, triggerSpeech } = useApp();
  const [activeShopTab, setActiveShopTab] = useState('freezes'); // 'freezes' | 'titles' | 'family'

  if (!isShopOpen) return null;

  const honoraryTitles = [
    { id: 't1', title: '大腦靈活達人 🧠', cost: 150, minStreak: 3, unlocked: true, desc: '在大腦認知訓練中表現優異的榮譽稱號' },
    { id: 't2', title: '長青運動高手 🏃', cost: 200, minStreak: 5, unlocked: true, desc: '堅持每日伸展與超慢跑的活力長者' },
    { id: 't3', title: '地中海健康模範生 🥗', cost: 250, minStreak: 7, unlocked: false, desc: '每週健康飲食達到 5 星級的優秀榮譽' },
    { id: 't4', title: '防失智百歲百步王 👑', cost: 500, minStreak: 14, unlocked: false, desc: '堅持兩週以上防失智習慣的尊榮桂冠' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/65 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col relative border-4 border-amber-300 shadow-2xl overflow-hidden">
        
        {/* Shop Header */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 p-5 sm:p-6 text-white relative">
          <button
            onClick={() => {
              triggerSound('click');
              setIsShopOpen(false);
            }}
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl border border-white/30">
                🎁
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black">健康金幣商店</h3>
                <p className="text-amber-100 text-sm font-medium">兌換補卡券、榮譽稱號與家庭好禮</p>
              </div>
            </div>

            <div className="bg-amber-950/40 border border-yellow-200/50 rounded-2xl px-4 py-2 flex items-center gap-2">
              <Coins className="w-6 h-6 text-yellow-300 fill-yellow-300 animate-coin" />
              <div>
                <div className="text-xs text-amber-200 font-bold">現有金幣</div>
                <div className="text-2xl font-black text-white">{coins}</div>
              </div>
            </div>
          </div>

          {/* Shop Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                triggerSound('click');
                setActiveShopTab('freezes');
              }}
              className={`flex-1 py-2 px-3 rounded-xl font-black text-sm sm:text-base transition-all cursor-pointer ${
                activeShopTab === 'freezes'
                  ? 'bg-white text-amber-900 shadow-md'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              ❄️ 凍結補卡券
            </button>
            <button
              onClick={() => {
                triggerSound('click');
                setActiveShopTab('titles');
              }}
              className={`flex-1 py-2 px-3 rounded-xl font-black text-sm sm:text-base transition-all cursor-pointer ${
                activeShopTab === 'titles'
                  ? 'bg-white text-amber-900 shadow-md'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              🎖️ 榮譽稱號
            </button>
            <button
              onClick={() => {
                triggerSound('click');
                setActiveShopTab('family');
              }}
              className={`flex-1 py-2 px-3 rounded-xl font-black text-sm sm:text-base transition-all cursor-pointer ${
                activeShopTab === 'family'
                  ? 'bg-white text-amber-900 shadow-md'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              🍲 家庭獎勵
            </button>
          </div>
        </div>

        {/* Shop Content (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 bg-stone-50">
          
          {/* TAB 1: STREAK FREEZES */}
          {activeShopTab === 'freezes' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border-2 border-blue-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-4xl border-2 border-blue-300">
                    ❄️
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-stone-800 flex items-center gap-2">
                      凍結補卡券 (Streak Freeze)
                    </h4>
                    <p className="text-stone-600 text-sm font-medium mt-1">
                      防止因偶爾生病、外出或忙碌中斷連續打卡天數！系統將自動替您抵用 1 天。
                    </p>
                    <div className="mt-2 text-xs font-bold text-blue-700 bg-blue-50 inline-block px-2 py-1 rounded-md">
                      您目前已擁有：{streakFreezes} 張
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => buyStreakFreeze()}
                  disabled={coins < 100}
                  className={`py-3 px-6 rounded-2xl font-black text-base flex items-center gap-2 whitespace-nowrap transition-all shadow-md cursor-pointer ${
                    coins >= 100
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30 active:scale-95'
                      : 'bg-stone-200 text-stone-700 cursor-not-allowed'
                  }`}
                >
                  <Coins className="w-5 h-5 fill-yellow-300 text-yellow-500" />
                  100 金幣兌換
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm">
                💡 <strong>專家小叮嚀：</strong> 預防失智的關鍵在於「規律與持續性」，適當使用補卡券能保持正向激勵心理，不必因一天中斷而感到挫折！
              </div>
            </div>
          )}

          {/* TAB 2: HONORARY TITLES */}
          {activeShopTab === 'titles' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {honoraryTitles.map((title) => (
                <div
                  key={title.id}
                  className={`p-4 rounded-2xl border-2 bg-white flex flex-col justify-between transition-all ${
                    title.unlocked
                      ? 'border-emerald-300 shadow-xs'
                      : 'border-stone-200 opacity-80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-lg text-stone-800">{title.title}</span>
                      {title.unlocked ? (
                        <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> 已解鎖
                        </span>
                      ) : (
                        <span className="text-xs font-bold bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                          需連霸 {title.minStreak} 天
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-600 font-medium mb-3">{title.desc}</p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs text-stone-700 font-bold">榮譽價值</span>
                    <span className="text-sm font-black text-amber-800 flex items-center gap-1">
                      🪙 {title.cost} 金幣
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: FAMILY REWARDS */}
          {activeShopTab === 'family' && (
            <div className="space-y-3">
              <p className="text-xs sm:text-sm text-stone-600 font-medium bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-emerald-900">
                👨‍👩‍👧‍👦 <strong>家庭連結激勵：</strong> 長者用認真累積的健康金幣向家人兌換實體心願，增進家庭互動與情感連結！
              </p>

              {customRewards.map((reward) => (
                <div
                  key={reward.id}
                  className="bg-white p-4 rounded-2xl border-2 border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div>
                    <h5 className="font-black text-base sm:text-lg text-stone-800 flex items-center gap-2">
                      {reward.title}
                      {reward.redeemed && (
                        <span className="text-xs bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                          已兌換憑證
                        </span>
                      )}
                    </h5>
                    <p className="text-xs text-stone-500 font-medium mt-0.5">{reward.desc}</p>
                  </div>

                  <button
                    onClick={() => redeemReward(reward.id)}
                    disabled={reward.redeemed || coins < reward.cost}
                    className={`py-2.5 px-5 rounded-xl font-black text-sm flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                      reward.redeemed
                        ? 'bg-stone-100 text-stone-700 cursor-default'
                        : coins >= reward.cost
                        ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20 active:scale-95'
                        : 'bg-stone-200 text-stone-700 cursor-not-allowed'
                    }`}
                  >
                    {reward.redeemed ? '已出示給家人' : `🪙 ${reward.cost} 金幣兌換`}
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex justify-end">
          <button
            onClick={() => {
              triggerSound('click');
              setIsShopOpen(false);
            }}
            className="py-2.5 px-6 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-sm transition-all cursor-pointer"
          >
            關閉商店
          </button>
        </div>

      </div>
    </div>
  );
}
