import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, Share2, MessageCircle, Sparkles, CheckCircle2, Heart, Volume2, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function LinePhotoSharing() {
  const { user, completedToday, completePhotoShare, triggerSound, triggerSpeech } = useApp();

  // Photo state
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=800&q=80'); // Default healthy vibrant bowl photo
  const [selectedFrame, setSelectedFrame] = useState('frame1'); // 'frame1' | 'frame2' | 'frame3' | 'frame4'
  const [customGreeting, setCustomGreeting] = useState('🌸 今天天氣好拍張照，祝大家平安健康！');
  const fileInputRef = useRef(null);

  // Quick One-Click Senior Greetings (No typing needed)
  const quickGreetings = [
    { text: '🌸 今天天氣好拍張照，祝大家平安喜樂！', icon: '🌸' },
    { text: '🥗 我今天吃的很健康！地中海飲食活力滿滿！', icon: '🥗' },
    { text: '🏃 我今天完成運動了，感覺精神百倍！', icon: '🏃' },
    { text: '🧠 今天大腦訓練順利通關，頭腦很靈活喔！', icon: '🧠' },
    { text: '🍵 喝杯溫水、放鬆心情，大家今天過得好嗎？', icon: '🍵' },
  ];

  // Frame Styles
  const frames = [
    { id: 'frame1', name: '🌸 早安吉祥', border: 'border-8 border-rose-300 ring-4 ring-rose-100', banner: '🌸 早安吉祥 · 平安喜樂' },
    { id: 'frame2', name: '🥗 健康每一天', border: 'border-8 border-emerald-400 ring-4 ring-emerald-100', banner: '🥗 我今天吃得很健康！' },
    { id: 'frame3', name: '🏃 活力長青', border: 'border-8 border-amber-400 ring-4 ring-amber-100', banner: '🏃 每日運動 · 活力充沛！' },
    { id: 'frame4', name: '🌟 溫馨家庭', border: 'border-8 border-purple-400 ring-4 ring-purple-100', banner: '💖 想念大家 · 溫馨祝福！' },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
      triggerSound('click');
      triggerSpeech('照片上傳成功！可以選擇相框與問候語囉！');
    }
  };

  const handleShareToLine = async () => {
    triggerSound('coin');
    const fullShareText = `${user.name} 給家人的溫馨分享：\n${customGreeting}\n【智齡健 BrainFlex 每日健康打卡】`;

    // 1. Try Web Share API if supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: '智齡健 - 50+ 生活照分享',
          text: fullShareText,
          url: window.location.href,
        });
        completePhotoShare();
        return;
      } catch (err) {
        console.log('Web share dismissed or failed, falling back to LINE share URL');
      }
    }

    // 2. LINE Share URL fallback
    const lineShareUrl = `https://line.me/R/msg/text/?${encodeURIComponent(fullShareText)}`;
    window.open(lineShareUrl, '_blank');

    completePhotoShare();
  };

  const activeFrameObj = frames.find(f => f.id === selectedFrame) || frames[0];

  return (
    <div className="space-y-6 pb-20 md:pb-8 animate-in fade-in">
      
      {/* Title Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-sky-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-black/20 border border-white/30 px-3 py-1 rounded-full text-xs sm:text-sm font-bold text-sky-200 mb-2">
              <MessageCircle className="w-4 h-4 text-green-300" />
              <span>家人社群情感連結 · 預防失智關鍵機制</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black">生活照分享給家人 📸</h1>
            <p className="text-sky-100 text-base sm:text-lg font-medium mt-1 max-w-2xl">
              拍張照、套用長輩溫馨相框，一鍵免打字分享到 LINE！讓子女孫子隨時掌握您的健康活力！
            </p>
          </div>

          <div className="bg-blue-950/40 border-2 border-sky-300/40 rounded-2xl p-4 text-center shrink-0">
            <div className="text-xs text-sky-200 font-bold">分享生活照獎勵</div>
            <div className="text-2xl sm:text-3xl font-black text-yellow-300">
              🪙 +15 金幣
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Photo Preview & Frame Customization */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 border-2 border-stone-200 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black text-stone-800 flex items-center gap-2">
                🖼️ 溫馨照片預覽 (長輩相框)
              </h3>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="py-2 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Camera className="w-4 h-4 text-blue-600" />
                <span>更換/拍攝照片</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Photo Card with Frame & Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-stone-100 shadow-inner flex flex-col items-center justify-center p-2">
              <div className={`relative w-full max-h-[380px] rounded-2xl overflow-hidden ${activeFrameObj.border} shadow-lg transition-all`}>
                <img
                  src={photoUrl}
                  alt="Senior Life"
                  className="w-full h-80 object-cover"
                />

                {/* Top Banner overlay */}
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-3 text-white text-center">
                  <span className="font-black text-lg sm:text-xl drop-shadow-md tracking-wider">
                    {activeFrameObj.banner}
                  </span>
                </div>

                {/* Bottom Greeting overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-4 text-white">
                  <p className="font-extrabold text-base sm:text-lg drop-shadow-md leading-relaxed text-yellow-200 text-center">
                    "{customGreeting}"
                  </p>
                  <div className="text-right text-xs font-bold text-white/80 mt-1">
                    ── {user.name} 敬上
                  </div>
                </div>
              </div>
            </div>

            {/* Frame Selector */}
            <div className="mt-4 space-y-2">
              <div className="text-sm font-bold text-stone-700">選擇相框風格：</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {frames.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      triggerSound('click');
                      setSelectedFrame(f.id);
                    }}
                    className={`py-2 px-3 rounded-xl font-bold text-xs sm:text-sm border-2 transition-all cursor-pointer ${
                      selectedFrame === f.id
                        ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-xs font-black'
                        : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right 5 Cols: One-Click Greetings & LINE Share Button */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-3xl p-6 border-2 border-stone-200 shadow-md space-y-4">
            <div>
              <h3 className="text-xl font-black text-stone-800 flex items-center gap-2">
                💬 一鍵關懷語句 (免打字直接點)
              </h3>
              <p className="text-xs text-stone-500 font-medium mt-0.5">
                點擊下方句子，即自動套入問候卡片中
              </p>
            </div>

            <div className="space-y-2.5">
              {quickGreetings.map((g, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    triggerSound('click');
                    setCustomGreeting(g.text);
                    triggerSpeech(g.text);
                  }}
                  className={`w-full p-3.5 rounded-2xl text-left border-2 font-bold text-sm sm:text-base transition-all cursor-pointer flex items-start gap-2.5 ${
                    customGreeting === g.text
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs'
                      : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800'
                  }`}
                >
                  <span className="text-xl shrink-0 mt-0.5">{g.icon}</span>
                  <span className="flex-1 leading-snug">{g.text}</span>
                </button>
              ))}
            </div>

            {/* Core Action Button: LINE Share */}
            <div className="pt-2">
              <button
                onClick={handleShareToLine}
                className="w-full py-5 px-6 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] text-white font-black text-xl shadow-xl shadow-green-600/30 flex items-center justify-center gap-3 transition-all hover:scale-103 active:scale-97 cursor-pointer border-2 border-green-300 animate-gentle"
              >
                <MessageCircle className="w-8 h-8 fill-white" />
                <span>傳送給家人 (LINE)</span>
                <span className="text-xs bg-black/20 text-yellow-200 px-2 py-0.5 rounded-full font-bold">
                  +15 金幣
                </span>
              </button>
              <p className="text-center text-xs text-stone-700 font-medium mt-2">
                點擊將直接喚醒手機 LINE 發送圖文給兒女或家庭群組
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
