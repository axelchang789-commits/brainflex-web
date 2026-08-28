import React from 'react';
import { X, Sparkles, Coins, CheckCircle, Volume2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function RewardModal() {
  const { rewardModal, closeRewardModal, triggerSpeech, triggerSound } = useApp();

  if (!rewardModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/65 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center relative border-4 border-amber-300 shadow-2xl transform animate-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={() => {
            triggerSound('click');
            closeRewardModal();
          }}
          className="absolute top-4 right-4 text-stone-700 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-all cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Big Icon & Coin Animation */}
        <div className="relative inline-block mb-3">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-5xl sm:text-6xl mx-auto shadow-lg shadow-amber-400/40 border-4 border-white animate-gentle">
            {rewardModal.icon}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white rounded-full p-2 border-2 border-white shadow-md">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-black text-stone-800 mb-2 flex items-center justify-center gap-2">
          {rewardModal.title}
        </h3>

        {/* Coins Earned Banner */}
        <div className="my-4 bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100 border-2 border-amber-300 rounded-2xl py-3 px-4 flex items-center justify-center gap-2 shadow-inner">
          <Coins className="w-8 h-8 text-amber-700 fill-amber-400 animate-coin" />
          <span className="text-3xl sm:text-4xl font-black text-amber-900 tracking-wider">
            +{rewardModal.coins}
          </span>
          <span className="text-lg font-black text-amber-800">健康金幣</span>
        </div>

        {/* Message */}
        <p className="text-base sm:text-lg font-medium text-stone-600 mb-6 leading-relaxed">
          {rewardModal.message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => triggerSpeech(rewardModal.title + '。' + rewardModal.message + '。獲得' + rewardModal.coins + '枚健康金幣！')}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer text-base"
          >
            <Volume2 className="w-5 h-5 text-emerald-700" />
            語音朗讀
          </button>
          <button
            onClick={() => {
              triggerSound('click');
              closeRewardModal();
            }}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-black text-lg shadow-lg shadow-emerald-700/30 transition-all hover:scale-102 active:scale-98 cursor-pointer"
          >
            太棒了！收下
          </button>
        </div>

      </div>
    </div>
  );
}
