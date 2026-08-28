import React, { useState } from 'react';
import { Flame, Coins, Volume2, Type, Sparkles, User, Gift } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Header() {
  const { user, coins, streakDays, streakFreezes, settings, updateSettings, setIsShopOpen, triggerSpeech, triggerSound, updateUserProfile } = useApp();
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [editName, setEditName] = useState(user.name);

  const cycleFontSize = () => {
    triggerSound('click');
    const order = ['standard', 'large', 'extra-large'];
    const nextIdx = (order.indexOf(settings.fontSize) + 1) % order.length;
    const nextSize = order[nextIdx];
    updateSettings({ fontSize: nextSize });
    const sizeName = nextSize === 'standard' ? '標準字體' : nextSize === 'large' ? '大字體' : '特大字體';
    triggerSpeech('已切換為 ' + sizeName);
  };

  const handleVoiceIntroduction = () => {
    triggerSpeech('早安！' + user.name + '。您目前已連續打卡 ' + streakDays + ' 天，累積了 ' + coins + ' 枚健康金幣。今天也要保持健康運動與大腦訓練喔！');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (editName.trim()) {
      updateUserProfile({ name: editName.trim() });
      setShowProfileEdit(false);
      triggerSpeech('稱呼已更新為 ' + editName.trim());
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b-2 border-stone-200 sticky top-0 z-30 shadow-xs px-3 sm:px-6 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Brand & Tagline */}
        <div className="flex items-center gap-3 cursor-pointer select-none" onClick={handleVoiceIntroduction} title="點擊聽取語音導覽">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 text-2xl">
            🧠
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-stone-800">BrainFlex</span>
              <span className="text-lg font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">智齡健</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-stone-700">50+ 預防失智 · 活力健康每一天</p>
          </div>
        </div>

        {/* Right: Gamification Badges & Tools */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          
          {/* User Profile Pill */}
          <button
            onClick={() => setShowProfileEdit(true)}
            className="flex items-center gap-2 bg-stone-100 hover:bg-stone-200/80 text-stone-800 px-3.5 py-1.5 rounded-full border border-stone-300 text-sm sm:text-base font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
            title="點擊更換個人稱呼"
          >
            <span className="text-xl">{user.avatar}</span>
            <span className="hidden xs:inline font-bold">{user.name}</span>
          </button>

          {/* Streak Status */}
          <div 
            className="flex items-center gap-1.5 bg-gradient-to-r from-orange-50 to-amber-100 text-orange-800 px-3.5 py-1.5 rounded-full border-2 border-orange-300 font-extrabold text-sm sm:text-base shadow-xs"
            title={'已連續打卡 ' + streakDays + ' 天！滿 7 天可獲得 +100 金幣加碼！'}
          >
            <Flame className="w-5 h-5 text-orange-600 animate-gentle fill-orange-500" />
            <span>連續 <strong className="text-orange-700 text-base sm:text-lg">{streakDays}</strong> 天</span>
            {streakFreezes > 0 && (
              <span className="inline-flex items-center text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full border border-blue-300 ml-1 font-semibold" title="已裝備凍結補卡券，防中斷">
                ❄️x{streakFreezes}
              </span>
            )}
          </div>

          {/* Gold Coin Wallet (Opens Coin Shop) */}
          <button
            onClick={() => {
              triggerSound('coin');
              setIsShopOpen(true);
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-amber-950 font-black px-4 py-1.5 rounded-full shadow-md shadow-amber-500/20 border-2 border-yellow-300 text-sm sm:text-base transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="點擊開啟金幣商店與榮譽稱號"
          >
            <Coins className="w-5 h-5 text-amber-900 fill-amber-300 animate-coin" />
            <span className="text-base sm:text-lg tracking-wide">{coins}</span>
            <span className="text-xs bg-amber-950/20 text-amber-950 px-1.5 py-0.5 rounded-md ml-0.5 font-bold">商店</span>
          </button>

          {/* Font Size Adjust Quick Button */}
          <button
            onClick={cycleFontSize}
            className="flex items-center gap-1 bg-stone-100 hover:bg-stone-200 text-stone-700 p-2 rounded-full border border-stone-300 transition-all active:scale-95 cursor-pointer"
            title="切換字體大小"
          >
            <Type className="w-5 h-5 text-stone-700" />
            <span className="text-xs font-black hidden md:inline">
              {settings.fontSize === 'standard' ? '標準' : settings.fontSize === 'large' ? '大字' : '特大'}
            </span>
          </button>

          {/* Speech Helper Button */}
          <button
            onClick={handleVoiceIntroduction}
            className="flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 p-2 rounded-full border border-emerald-300 transition-all active:scale-95 cursor-pointer"
            title="語音朗讀今日狀態"
          >
            <Volume2 className="w-5 h-5 text-emerald-700" />
          </button>
        </div>

      </div>

      {/* Edit Profile Modal */}
      {showProfileEdit && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border-4 border-emerald-100 animate-in fade-in zoom-in-95">
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">👴👵</div>
              <h3 className="text-xl font-bold text-stone-800">修改長者稱呼</h3>
              <p className="text-sm text-stone-700">設定平時對您的親切稱呼</p>
            </div>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">稱呼或姓名</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full text-lg px-4 py-2.5 rounded-xl border-2 border-stone-300 focus:border-emerald-600 focus:outline-hidden font-bold"
                  placeholder="例如：王大明 伯伯、李媽媽"
                  maxLength={15}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProfileEdit(false)}
                  className="flex-1 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-700/20"
                >
                  儲存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
