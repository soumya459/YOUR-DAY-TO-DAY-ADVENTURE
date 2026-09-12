/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User, Quest, Streak, Item, SkillTree, Difficulty } from './types';
import { StorageService, calculateNewStreak, getAttributeForSkillTree } from './lib/storage';
import { applyXpGain } from './lib/xp';
import { playQuestCompleteSound, playCoinSound } from './lib/audio';

import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { CharacterPanel } from './components/CharacterPanel';
import { QuestList } from './components/QuestList';
import { AddQuestModal } from './components/AddQuestModal';
import { ShopPage } from './components/ShopPage';
import { AuthView } from './components/AuthView';
import { LevelUpModal } from './components/LevelUpModal';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { FloatingRewardsContainer, FloatingNotification } from './components/FloatingRewardsContainer';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'shop' | 'auth'>('dashboard');
  const [isLoading, setIsLoading] = useState(false);

  // Core RPG Data Models (Client-Side Scaffold ready for Supabase / Backend)
  const [user, setUser] = useState<User>(() => StorageService.getUser());
  const [quests, setQuests] = useState<Quest[]>(() => StorageService.getQuests());
  const [streak, setStreak] = useState<Streak>(() => StorageService.getStreak());
  const [items, setItems] = useState<Item[]>(() => StorageService.getItems());
  const [auth, setAuth] = useState(() => StorageService.getAuth());

  // Modals & Micro-interaction States
  const [isAddQuestOpen, setIsAddQuestOpen] = useState(false);
  const [levelUpData, setLevelUpData] = useState<{ isOpen: boolean; level: number; goldBonus: number }>({
    isOpen: false,
    level: 1,
    goldBonus: 100,
  });
  const [floatingRewards, setFloatingRewards] = useState<FloatingNotification[]>([]);

  // Sync to local storage
  useEffect(() => {
    StorageService.saveUser(user);
  }, [user]);

  useEffect(() => {
    StorageService.saveQuests(quests);
  }, [quests]);

  useEffect(() => {
    StorageService.saveStreak(streak);
  }, [streak]);

  useEffect(() => {
    StorageService.saveItems(items);
  }, [items]);

  useEffect(() => {
    StorageService.saveAuth(auth);
  }, [auth]);

  // Optimistic Quest Completion Handler
  const handleCompleteQuest = (questId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    const targetQuest = quests.find((q) => q.id === questId);
    if (!targetQuest || targetQuest.completed) return;

    // 1. Trigger Micro-interaction Audio & Floating Reward Particles
    playQuestCompleteSound();
    const rect = event.currentTarget.getBoundingClientRect();
    const notificationId = `float_${Date.now()}_${Math.random()}`;
    setFloatingRewards((prev) => [
      ...prev,
      {
        id: notificationId,
        x: rect.left + rect.width / 2,
        y: rect.top,
        xp: targetQuest.xp_reward,
        gold: targetQuest.gold_reward,
      },
    ]);

    // 2. Optimistically update quests
    const updatedQuests = quests.map((q) =>
      q.id === questId
        ? {
            ...q,
            completed: true,
            completed_at: new Date().toISOString(),
          }
        : q
    );
    setQuests(updatedQuests);

    // 3. Calculate Non-linear XP curve progression & Level Up threshold
    const xpProgression = applyXpGain(user.level, user.current_xp, targetQuest.xp_reward);
    const targetAttribute = getAttributeForSkillTree(targetQuest.skill_tree);
    const goldEarned = targetQuest.gold_reward;

    // If level-up occurred, grant guild gold stipend & open LevelUpModal
    let additionalGold = 0;
    if (xpProgression.leveledUp) {
      additionalGold = 100 * xpProgression.levelsGained;
      setTimeout(() => {
        setLevelUpData({
          isOpen: true,
          level: xpProgression.newLevel,
          goldBonus: additionalGold,
        });
      }, 400);
    }

    // 4. Update Character attributes and gold
    setUser((prev) => ({
      ...prev,
      level: xpProgression.newLevel,
      current_xp: xpProgression.newXp,
      gold: prev.gold + goldEarned + additionalGold,
      attributes: {
        ...prev.attributes,
        [targetAttribute]: prev.attributes[targetAttribute] + 1,
      },
    }));

    // 5. Update Daily Streak
    const newStreak = calculateNewStreak(streak);
    setStreak(newStreak);
  };

  // Add new quest to active list
  const handleAddQuest = (newQuestData: {
    title: string;
    skill_tree: SkillTree;
    difficulty: Difficulty;
    xp_reward: number;
    gold_reward: number;
  }) => {
    const newQuest: Quest = {
      id: `qst_${Date.now()}`,
      user_id: user.id,
      title: newQuestData.title,
      skill_tree: newQuestData.skill_tree,
      difficulty: newQuestData.difficulty,
      xp_reward: newQuestData.xp_reward,
      gold_reward: newQuestData.gold_reward,
      completed: false,
      created_at: new Date().toISOString(),
    };

    setQuests((prev) => [newQuest, ...prev]);
  };

  // Delete / purge completed quest
  const handleDeleteQuest = (questId: string) => {
    setQuests((prev) => prev.filter((q) => q.id !== questId));
  };

  // Shop item purchase
  const handleBuyItem = (item: Item) => {
    if (user.gold < item.price || item.owned) return;

    setUser((prev) => {
      const updatedAttributes = { ...prev.attributes };
      if (item.stat_bonus) {
        updatedAttributes[item.stat_bonus.attribute] += item.stat_bonus.amount;
      }
      return {
        ...prev,
        gold: prev.gold - item.price,
        attributes: updatedAttributes,
      };
    });

    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, owned: true, equipped: i.category === 'gear' } : i
      )
    );
  };

  // Shop item equip / unequip toggle
  const handleEquipItem = (item: Item) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id === item.id) {
          return { ...i, equipped: !i.equipped };
        }
        return i;
      })
    );
  };

  // Auth login / signup
  const handleLoginSuccess = (email: string, name?: string, characterClass?: string) => {
    setAuth({ isAuthenticated: true, email });
    if (name) {
      setUser((prev) => ({
        ...prev,
        email,
        name,
        character_class: characterClass || prev.character_class,
      }));
    }
    setCurrentView('dashboard');
  };

  // Reset demo data back to default scaffold
  const handleResetData = () => {
    StorageService.resetToDefaults();
    setUser(StorageService.getUser());
    setQuests(StorageService.getQuests());
    setStreak(StorageService.getStreak());
    setItems(StorageService.getItems());
    setAuth(StorageService.getAuth());
  };

  // Dismiss floating reward notification
  const handleDismissReward = (id: string) => {
    setFloatingRewards((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#140f0c] text-[#f5ebd7] font-sans flex flex-col selection:bg-amber-600 selection:text-amber-950">
      {/* Floating Particles for Quest Completion */}
      <FloatingRewardsContainer
        notifications={floatingRewards}
        onComplete={handleDismissReward}
      />

      {/* Level Up Celebration Modal */}
      <LevelUpModal
        isOpen={levelUpData.isOpen}
        level={levelUpData.level}
        goldBonus={levelUpData.goldBonus}
        onClose={() => setLevelUpData((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Add Quest Modal */}
      <AddQuestModal
        isOpen={isAddQuestOpen}
        onClose={() => setIsAddQuestOpen(false)}
        onAddQuest={handleAddQuest}
      />

      {/* Retro Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        user={user}
        streak={streak}
        isAuthenticated={auth.isAuthenticated}
        onLogout={() => {
          setAuth({ isAuthenticated: false });
          setCurrentView('landing');
        }}
        onResetData={handleResetData}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* Screen 1: Landing Page */}
            {currentView === 'landing' && (
              <LandingPage
                onStartJourney={() => setCurrentView('dashboard')}
                onGoToAuth={() => setCurrentView('auth')}
              />
            )}

            {/* Screen 2: Auth Pages */}
            {currentView === 'auth' && (
              <AuthView
                onLoginSuccess={handleLoginSuccess}
                onCancel={() => setCurrentView('landing')}
              />
            )}

            {/* Screen 3: Dashboard (Main Screen) */}
            {currentView === 'dashboard' && (
              <div className="space-y-6">
                {/* Character Panel with Avatar, Level, XP Bar & Attribute Stats */}
                <CharacterPanel
                  user={user}
                  streakCount={streak.current_streak}
                  onOpenShop={() => setCurrentView('shop')}
                />

                {/* Active Quest List with Optimistic Complete & Filter Pills */}
                <QuestList
                  quests={quests}
                  onCompleteQuest={handleCompleteQuest}
                  onDeleteQuest={handleDeleteQuest}
                  onOpenAddModal={() => setIsAddQuestOpen(true)}
                />
              </div>
            )}

            {/* Screen 5: Shop Page (Ye Olde Dungeon Bazaar) */}
            {currentView === 'shop' && (
              <ShopPage
                user={user}
                items={items}
                onBuyItem={handleBuyItem}
                onEquipItem={handleEquipItem}
                onBackToDashboard={() => setCurrentView('dashboard')}
              />
            )}
          </>
        )}
      </main>

      {/* Cozy Footer with Scaffold & Supabase note */}
      <footer className="border-t border-[#312318] py-5 px-4 text-center font-pixel text-xs text-stone-500 bg-[#120d0a]">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-[11px]">
          <span>🏰 Your Day to Day Adventure • Cozy 16-Bit Crawler</span>
          <span className="hidden sm:inline">•</span>
          <span>⚡ Formula: XP = 100 × Level^1.5</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-amber-500/80">Client-Side Scaffold Ready for Supabase</span>
        </div>
      </footer>
    </div>
  );
}
