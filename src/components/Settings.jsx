import React, { useState } from 'react';
import { Type, Volume2, Music, User, Shield, Info, Check, RefreshCw, Smartphone } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Settings() {
  const { user, settings, updateSettings, updateUserProfile, triggerSound, triggerSpeech } = useApp();

  const [nameInput, setNameInput] = useState(user.name);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
  const [isSaved, setIsSaved] = useState(false);

  const avatars = ['👴', '👵', '👨‍🦳', '👩‍🦳', '🏃‍♂️', '🏃‍♀️', '🌸', '🍵'];

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (nameInput.trim()) {
      updateUserProfile({ name: nameInput.trim(), avatar: selectedAvatar });
      setIsSaved(true);
      triggerSound('coin');
      triggerSpeech(`設定已儲存！稱呼已更新為 ${nameInput.trim()}`);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const handleTestSpeech = () => {
    triggerSpeech(`您好！我是智齡健語音小助手，很高興陪伴 ${user.name} 一起維護健康與大腦活力！`);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8 animate-in fade-in max-w-4xl mx-auto">
      
      {/* Title */}
      <div className="bg-gradient-to-r from-stone-700 via-stone-800 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
            ⚙️
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-black">系統與長者偏好設定</h1>
            <p className="text-stone-300 text-sm sm:text-base font-medium mt-0.5">
              依照您的習慣調整大字體、語音導覽與個人暱稱
            </p>
          </div>
        </div>
      </div>

      {/* 1. Font Size Setting */}
      <div className="bg-white rounded-3xl p-6 border-2 border-stone-200 shadow-md space-y-4">
        <div className="flex items-center gap-3">
          <Type className="w-7 h-7 text-emerald-700" />
          <div>
            <h3 className="text-xl font-black text-stone-800">字體大小調整 (中高齡親和 UX)</h3>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">
              隨時切換清晰大字，閱讀輕鬆不吃力
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {[
            { id: 'standard', name: '標準字體 (17px)', sample: '清晰閱讀' },
            { id: 'large', name: '大字體 (20px) ⭐', sample: '舒適好讀' },
            { id: 'extra-large', name: '特大字體 (23px)', sample: '超大清晰' },
          ].map((f) => {
            const isSelected = settings.fontSize === f.id;
            return (
              <button
                key={f.id}
                onClick={() => {
                  triggerSound('click');
                  updateSettings({ fontSize: f.id });
                  triggerSpeech(`已切換為${f.name}`);
                }}
                className={`p-4 rounded-2xl border-3 text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-600 shadow-sm scale-102 font-black text-emerald-950'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 font-bold'
                }`}
              >
                <div className="text-base sm:text-lg mb-1">{f.name}</div>
                <div className="text-xs text-stone-500">{f.sample}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Voice & Audio Guide Setting */}
      <div className="bg-white rounded-3xl p-6 border-2 border-stone-200 shadow-md space-y-4">
        <div className="flex items-center gap-3">
          <Volume2 className="w-7 h-7 text-blue-700" />
          <div>
            <h3 className="text-xl font-black text-stone-800">語音導覽與提示音效</h3>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">
              支援點擊自動語音朗讀與金幣獲得慶祝音效
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* TTS Voice Toggle */}
          <div className="p-4 rounded-2xl bg-stone-50 border-2 border-stone-200 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-stone-800 text-base">語音朗讀導覽 (TTS)</div>
              <div className="text-xs text-stone-500">點擊標題與關懷語時親切發音</div>
            </div>
            <input
              type="checkbox"
              checked={settings.voiceGuide}
              onChange={(e) => {
                triggerSound('click');
                updateSettings({ voiceGuide: e.target.checked });
              }}
              className="w-6 h-6 accent-emerald-600 rounded-lg cursor-pointer"
            />
          </div>

          {/* Sound Effects Toggle */}
          <div className="p-4 rounded-2xl bg-stone-50 border-2 border-stone-200 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-stone-800 text-base">操作與金幣音效</div>
              <div className="text-xs text-stone-500">獲得金幣、通關時的歡樂音效</div>
            </div>
            <input
              type="checkbox"
              checked={settings.soundEffect}
              onChange={(e) => {
                triggerSound('click');
                updateSettings({ soundEffect: e.target.checked });
              }}
              className="w-6 h-6 accent-emerald-600 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleTestSpeech}
            className="py-2.5 px-5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 font-black text-sm flex items-center gap-2 border border-blue-200 transition-all cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>測試語音朗讀發音 🔊</span>
          </button>
        </div>
      </div>

      {/* 3. Personal Profile Setting */}
      <div className="bg-white rounded-3xl p-6 border-2 border-stone-200 shadow-md space-y-4">
        <div className="flex items-center gap-3">
          <User className="w-7 h-7 text-purple-700" />
          <div>
            <h3 className="text-xl font-black text-stone-800">長者稱呼與頭像設定</h3>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">
              設定親切的個人化尊稱
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveUser} className="space-y-4 pt-2">
          <div>
            <label className="block text-sm font-black text-stone-700 mb-2">選擇大頭貼</label>
            <div className="flex flex-wrap gap-2">
              {avatars.map((av) => (
                <button
                  type="button"
                  key={av}
                  onClick={() => setSelectedAvatar(av)}
                  className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center border-2 transition-all cursor-pointer ${
                    selectedAvatar === av
                      ? 'bg-purple-100 border-purple-600 scale-110 shadow-sm'
                      : 'bg-stone-100 border-stone-300 hover:bg-stone-200'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-black text-stone-700 mb-1">平時習慣的稱呼</label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full text-lg px-4 py-3 rounded-xl border-2 border-stone-300 focus:border-emerald-600 focus:outline-hidden font-bold"
              placeholder="例如：王大明 伯伯、秀蘭 媽媽"
              maxLength={15}
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="py-3 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base shadow-md shadow-emerald-700/20 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              <span>儲存個人設定</span>
            </button>
            {isSaved && (
              <span className="text-emerald-700 font-black text-sm animate-fade-in">
                ✓ 儲存成功！
              </span>
            )}
          </div>
        </form>
      </div>

      {/* 4. About BrainFlex */}
      <div className="bg-stone-100 rounded-3xl p-6 border border-stone-300 text-stone-700 space-y-2 text-xs sm:text-sm">
        <h4 className="font-black text-base text-stone-900 flex items-center gap-2">
          ℹ️ 關於 智齡健 (BrainFlex) 平台
        </h4>
        <p className="font-medium leading-relaxed">
          智齡健是專為 50+ 中高齡長者打造的預防失智症互動 Web MVP 平台。透過遊戲化每日運動、地中海飲食微任務、大腦認知測驗與 LINE 家人社群互動，建立長遠健康好習慣！
        </p>
        <div className="pt-2 text-stone-500 font-mono text-[11px]">
          版本：v1.0.0 (MVP Release) · $0 雲端成本敏捷架構 · 支援平板與手機跨載具 RWD
        </div>
      </div>

    </div>
  );
}
