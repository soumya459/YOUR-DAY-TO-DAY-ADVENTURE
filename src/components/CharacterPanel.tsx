import React from 'react';
import { motion } from 'motion/react';
import { User, Attributes } from '../types';
import { getLevelProgress } from '../lib/xp';
import { Dumbbell, Brain, ShieldAlert, Sparkles, Coins, Flame } from 'lucide-react';

interface Props {
  user: User;
  streakCount: number;
  onOpenShop?: () => void;
}

export const CharacterPanel: React.FC<Props> = ({ user, streakCount, onOpenShop }) => {
  const { current, max, percent } = getLevelProgress(user.current_xp, user.level);

  const statConfigs: {
    key: keyof Attributes;
    label: string;
    icon: React.ReactNode;
    color: string;
    barColor: string;
    maxStat: number;
    description: string;
  }[] = [
    {
      key: 'strength',
      label: 'Strength',
      icon: <Dumbbell className="w-3.5 h-3.5 text-rose-400" />,
      color: 'text-rose-300',
      barColor: 'bg-rose-500',
      maxStat: 30,
      description: 'Physical fitness, vigor & stamina',
    },
    {
      key: 'intellect',
      label: 'Intellect',
      icon: <Brain className="w-3.5 h-3.5 text-sky-400" />,
      color: 'text-sky-300',
      barColor: 'bg-sky-500',
      maxStat: 30,
      description: 'Learning, deep work & knowledge retention',
    },
    {
      key: 'discipline',
      label: 'Discipline',
      icon: <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />,
      color: 'text-emerald-300',
      barColor: 'bg-emerald-500',
      maxStat: 30,
      description: 'Habit consistency, routine & resilience',
    },
    {
      key: 'charisma',
      label: 'Charisma',
      icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
      color: 'text-amber-300',
      barColor: 'bg-amber-500',
      maxStat: 30,
      description: 'Social connections, communication & morale',
    },
  ];

  return (
    <div className="bg-[#211913] border-2 border-[#453325] rounded-lg p-5 shadow-xl text-[#f3e5d0] retro-bevel">
      {/* Top Header: Avatar & Identification */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#3c2a1d]">
        <div className="flex items-center gap-3.5">
          {/* 16-bit Avatar Box */}
          <div className="relative">
            <div className="w-16 h-16 rounded-md bg-[#16110d] border-2 border-amber-600/80 flex items-center justify-center text-3xl shadow-inner select-none">
              {user.avatar}
            </div>
            <div className="absolute -bottom-2 -right-1 px-1.5 py-0.5 bg-amber-500 text-amber-950 font-pixel font-bold text-[10px] rounded border border-yellow-200">
              Lv.{user.level}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-medieval text-xl sm:text-2xl font-bold text-[#fde4bc] tracking-wide">
                {user.name}
              </h1>
            </div>
            <p className="font-pixel text-xs text-amber-400/90 tracking-wider">
              {user.character_class}
            </p>
          </div>
        </div>

        {/* Currency & Streak Highlights */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          {/* Gold Pill */}
          <button
            onClick={onOpenShop}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#17110d] border border-amber-500/70 hover:border-amber-400 rounded-md font-pixel text-xs text-yellow-300 shadow-sm retro-button-press group"
            title="Open cozy tavern shop"
          >
            <Coins className="w-4 h-4 text-yellow-400 group-hover:rotate-12 transition-transform" />
            <span className="font-bold text-sm tracking-wide">{user.gold}</span>
            <span className="text-[10px] text-amber-400/70">Gold</span>
          </button>

          {/* Streak Torch */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a110c] border border-orange-700/60 rounded-md font-pixel text-xs text-orange-300">
            <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
            <span className="font-bold text-sm">{streakCount}</span>
            <span className="text-[10px] text-orange-400/70">Day Streak</span>
          </div>
        </div>
      </div>

      {/* Experience Progress Bar */}
      <div className="my-4">
        <div className="flex justify-between items-baseline mb-1.5 font-pixel text-xs">
          <span className="text-amber-300/90 font-medium flex items-center gap-1.5">
            <span className="text-yellow-400">⚡</span> Level {user.level} Progress
          </span>
          <span className="text-stone-300 font-mono text-[11px]">
            <span className="text-amber-300 font-bold">{current}</span> / {max} XP ({percent}%)
          </span>
        </div>
        <div className="w-full h-3.5 bg-[#120e0b] rounded-sm p-0.5 border border-[#4a3627] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="h-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-400 rounded-xs shadow-[0_0_8px_rgba(245,158,11,0.6)]"
          />
        </div>
        <div className="flex justify-between text-[10px] font-pixel text-stone-400 mt-1">
          <span>Tier {user.level} Threshold</span>
          <span>{max - current} XP to Level {user.level + 1}</span>
        </div>
      </div>

      {/* Attribute Stats Grid */}
      <div className="pt-3 border-t border-[#3c2a1d]">
        <div className="flex items-center justify-between mb-2">
          <span className="font-pixel text-xs uppercase tracking-wider text-[#d4af37]">
            Core Attributes
          </span>
          <span className="text-[10px] font-pixel text-stone-400">
            Earned from Quests & Gear
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {statConfigs.map((stat) => {
            const value = user.attributes[stat.key];
            const statPercent = Math.min(100, Math.round((value / stat.maxStat) * 100));

            return (
              <div
                key={stat.key}
                className="bg-[#18120e] border border-[#3b2b20] p-2.5 rounded-md flex flex-col gap-1.5"
                title={stat.description}
              >
                <div className="flex items-center justify-between font-pixel text-xs">
                  <span className={`flex items-center gap-1.5 font-bold ${stat.color}`}>
                    {stat.icon}
                    {stat.label}
                  </span>
                  <span className="font-mono text-xs font-bold text-amber-200">
                    {value} <span className="text-[10px] text-stone-500">/ {stat.maxStat}</span>
                  </span>
                </div>
                {/* Micro stat bar */}
                <div className="w-full h-1.5 bg-[#100c09] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${statPercent}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={`h-full ${stat.barColor} rounded-full`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
