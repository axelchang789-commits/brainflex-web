import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playCoinSound, playSuccessFanfare, playClickSound } from '../utils/audio';
import { speakText, stopSpeech } from '../utils/speech';

const AppContext = createContext();

const STORAGE_KEY = 'brainflex_user_state_v1';

const INITIAL_STATE = {
  user: {
    name: '王大明 伯伯',
    avatar: '👴',
    title: '活力健康達人',
  },
  coins: 345,
  streakDays: 5,
  streakFreezes: 1,
  todayCoinsEarned: 0,
  completedToday: {
    workout: false,
    brainGames: {
      memory: false,
      mole: false,
      stroop: false,
    },
    diet: {
      greens: false,
      nuts: false,
      waterCups: 3, // 3 * 250 = 750cc initial
    },
    photoShared: false,
  },
  unlockedBadges: ['brain_1', 'move_1'],
  customRewards: [
    { id: 'r1', title: '家人帶去吃大餐 🍲', cost: 300, redeemed: false, desc: '由子女或孫子請客吃愛吃的料理' },
    { id: 'r2', title: '孫子陪散步公園 🌳', cost: 150, redeemed: true, desc: '週末下午去附近公園聊天散步' },
    { id: 'r3', title: '挑選一份健康小禮物 🎁', cost: 200, redeemed: false, desc: '換取喜歡的茶葉或保健點心' },
  ],
  settings: {
    fontSize: 'large', // 'standard' | 'large' | 'extra-large'
    voiceGuide: true,
    soundEffect: true,
  }
};

export function AppProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_STATE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load local state', e);
    }
    return INITIAL_STATE;
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [rewardModal, setRewardModal] = useState({ isOpen: false, coins: 0, title: '', message: '', icon: '' });
  const [isShopOpen, setIsShopOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state', e);
    }
  }, [state]);

  // Sound helper wrapper checking user settings
  const triggerSound = (type) => {
    if (!state.settings.soundEffect) return;
    if (type === 'coin') playCoinSound();
    else if (type === 'fanfare') playSuccessFanfare();
    else if (type === 'click') playClickSound();
  };

  // TTS helper wrapper checking user settings
  const triggerSpeech = (text) => {
    if (!state.settings.voiceGuide) return;
    speakText(text);
  };

  // Trigger celebration & reward popup
  const grantReward = ({ coins, title, message, icon = '🪙', autoSpeak = true }) => {
    setState((prev) => {
      const newStreak = (title.includes('運動') || title.includes('挑戰') || title.includes('飲食')) && prev.streakDays < 30 ? prev.streakDays : prev.streakDays;
      return {
        ...prev,
        coins: prev.coins + coins,
        todayCoinsEarned: prev.todayCoinsEarned + coins,
      };
    });

    triggerSound('fanfare');
    triggerSound('coin');

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    setRewardModal({
      isOpen: true,
      coins,
      title,
      message,
      icon,
    });

    if (autoSpeak && state.settings.voiceGuide) {
      setTimeout(() => {
        speakText('太棒了！' + title + '。恭喜獲得 ' + coins + ' 枚健康金幣！');
      }, 300);
    }
  };

  const closeRewardModal = () => {
    setRewardModal((prev) => ({ ...prev, isOpen: false }));
  };

  // Complete workout
  const completeWorkout = () => {
    if (state.completedToday.workout) return;
    setState((prev) => ({
      ...prev,
      completedToday: {
        ...prev.completedToday,
        workout: true,
      }
    }));
    grantReward({
      coins: 30,
      title: '每日健康運動達成！',
      message: '恭喜您完成了今天的運動！活動筋骨、促進血液循環，大腦更有活力！',
      icon: '🏃',
    });
  };

  // Complete Brain Game
  const completeBrainGame = (gameKey, score = 100) => {
    setState((prev) => ({
      ...prev,
      completedToday: {
        ...prev.completedToday,
        brainGames: {
          ...prev.completedToday.brainGames,
          [gameKey]: true,
        }
      }
    }));
    const bonus = score >= 90 ? 25 : 20;
    grantReward({
      coins: bonus,
      title: '大腦訓練通關成功！',
      message: '得分：' + score + ' 分！靈活思維訓練記憶力與專注力，今天的大腦又變年輕了！',
      icon: '🧠',
    });
  };

  // Diet Task Check
  const toggleDietTask = (key) => {
    const isCurrentlyDone = state.completedToday.diet[key];
    if (!isCurrentlyDone) {
      setState((prev) => ({
        ...prev,
        completedToday: {
          ...prev.completedToday,
          diet: {
            ...prev.completedToday.diet,
            [key]: true,
          }
        }
      }));
      grantReward({
        coins: 10,
        title: key === 'greens' ? '深綠色蔬菜打卡成功！' : '堅果與好油打卡成功！',
        message: '地中海/麥得飲食富含抗氧化營養素，能有效保護大腦神經元！',
        icon: key === 'greens' ? '🥦' : '🥜',
      });
    }
  };

  // Drink water (+250cc)
  const addWaterCup = () => {
    setState((prev) => {
      const currentCups = prev.completedToday.diet.waterCups;
      if (currentCups >= 6) return prev;
      const nextCups = currentCups + 1;
      const willComplete = nextCups === 6;

      if (willComplete) {
        setTimeout(() => {
          grantReward({
            coins: 10,
            title: '今日飲水達標 1500cc！',
            message: '充足水分能促進大腦代謝與血液循環，維持活力滿滿！',
            icon: '💧',
          });
        }, 100);
      } else {
        triggerSound('coin');
      }

      return {
        ...prev,
        completedToday: {
          ...prev.completedToday,
          diet: {
            ...prev.completedToday.diet,
            waterCups: nextCups,
          }
        }
      };
    });
  };

  // Complete Photo Share
  const completePhotoShare = () => {
    setState((prev) => ({
      ...prev,
      completedToday: {
        ...prev.completedToday,
        photoShared: true,
      }
    }));
    grantReward({
      coins: 15,
      title: '照片已傳送給家人！',
      message: '與家人保持溫馨互動與社交連結，是預防失智非常關鍵的一環！',
      icon: '📸',
    });
  };

  // Buy Streak Freeze in Shop
  const buyStreakFreeze = () => {
    if (state.coins < 100) {
      alert('金幣不足 100 幣喔！請多做運動與遊戲累積金幣！');
      return false;
    }
    setState((prev) => ({
      ...prev,
      coins: prev.coins - 100,
      streakFreezes: prev.streakFreezes + 1,
    }));
    triggerSound('coin');
    alert('🎉 成功兌換 1 張【凍結補卡券】！在您生病或忙碌時將自動保護連續天數！');
    return true;
  };

  // Redeem Custom Reward
  const redeemReward = (rewardId) => {
    const reward = state.customRewards.find(r => r.id === rewardId);
    if (!reward) return;
    if (state.coins < reward.cost) {
      alert('金幣不足 ' + reward.cost + ' 幣喔！再加油一下！');
      return;
    }
    setState((prev) => ({
      ...prev,
      coins: prev.coins - reward.cost,
      customRewards: prev.customRewards.map(r => r.id === rewardId ? { ...r, redeemed: true } : r),
    }));
    triggerSound('fanfare');
    alert('🎉 恭喜兌換「' + reward.title + '」！已產生兌換憑證，可以向子女出示領取獎勵囉！');
  };

  // Update Settings
  const updateSettings = (newSettings) => {
    setState((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings,
      }
    }));
  };

  // Update User Profile
  const updateUserProfile = (newProfile) => {
    setState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        ...newProfile,
      }
    }));
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        activeTab,
        setActiveTab,
        rewardModal,
        closeRewardModal,
        isShopOpen,
        setIsShopOpen,
        completeWorkout,
        completeBrainGame,
        toggleDietTask,
        addWaterCup,
        completePhotoShare,
        buyStreakFreeze,
        redeemReward,
        updateSettings,
        updateUserProfile,
        triggerSound,
        triggerSpeech,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
