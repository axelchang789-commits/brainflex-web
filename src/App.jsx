import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { BrainGames } from './components/BrainGames';
import { PhysicalWorkout } from './components/PhysicalWorkout';
import { MindDietTracker } from './components/MindDietTracker';
import { LinePhotoSharing } from './components/LinePhotoSharing';
import { Settings } from './components/Settings';
import { RewardModal } from './components/RewardModal';
import { ShopModal } from './components/ShopModal';

function MainLayout() {
  const { activeTab, settings } = useApp();

  const fontSizeClass =
    settings.fontSize === 'standard'
      ? 'font-size-standard'
      : settings.fontSize === 'extra-large'
      ? 'font-size-extra-large'
      : 'font-size-large';

  return (
    <div className={`min-h-screen bg-[#FAF7F2] text-stone-800 ${fontSizeClass} flex flex-col font-sans transition-all`}>
      {/* Top Navigation Header */}
      <Header />

      {/* Main Container: Sidebar + Page Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto max-w-5xl">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'games' && <BrainGames />}
          {activeTab === 'workout' && <PhysicalWorkout />}
          {activeTab === 'diet' && <MindDietTracker />}
          {activeTab === 'photo' && <LinePhotoSharing />}
          {activeTab === 'settings' && <Settings />}
        </main>
      </div>

      {/* Popups & Modals */}
      <RewardModal />
      <ShopModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
