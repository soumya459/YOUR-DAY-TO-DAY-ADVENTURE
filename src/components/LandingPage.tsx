import React from 'react';
import { motion } from 'motion/react';
import { playClickSound, playCoinSound } from '../lib/audio';
import { Sword, Sparkles, Trophy, Flame, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Props {
  onStartJourney: () => void;
  onGoToAuth: () => void;
}

export const LandingPage: React.FC<Props> = ({ onStartJourney, onGoToAuth }) => {
  return (
    <div className="space-y-12 py-6">
      {/* Hero Section */}
      <section className="relative text-center max-w-3xl mx-auto px-4 pt-6 pb-8">
        {/* Cozy Guild badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#211711] border border-amber-500/70 rounded-full font-pixel text-xs text-amber-300 shadow-md mb-6"
        >
          <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
          <span>A Cozy 16-Bit Productivity Dungeon Crawler</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-medieval text-4xl sm:text-5xl md:text-6xl text-[#faebd2] tracking-wide leading-tight drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]"
        >
          Turn Daily Grinds Into{' '}
          <span className="text-amber-400 underline decoration-amber-600 decoration-wavy decoration-2">
            Mythic Quests
          </span>
        </motion.h1>

        {/* Pitch */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-sans text-base sm:text-lg text-[#dec5a6] mt-5 max-w-2xl mx-auto leading-relaxed"
        >
          Slay procrastination, level up real-world attributes, amass Gold in the tavern vault,
          and unlock legendary relics. Every completed task yields genuine RPG progression.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8"
        >
          <button
            onClick={() => {
              playCoinSound();
              onStartJourney();
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-amber-950 font-pixel font-bold text-base rounded-md border-2 border-yellow-200 shadow-lg shadow-amber-900/40 retro-button-press flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-amber-400 cursor-pointer"
          >
            <span>⚔️ Start Your Journey</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              playClickSound();
              onGoToAuth();
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#1f1712] hover:bg-[#2a1f18] border border-amber-700/80 rounded-md font-pixel text-sm text-amber-200 shadow-sm retro-button-press focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            📜 Adventurer Login
          </button>
        </motion.div>
      </section>

      {/* Vocabulary Translations Grid */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-medieval text-2xl sm:text-3xl text-amber-200">
            Dungeon Rules of Engagement
          </h2>
          <p className="font-pixel text-xs text-stone-400 mt-1">
            How your productivity translates into old-school tabletop RPG mechanics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#211812] border-2 border-[#423123] rounded-lg p-5 text-[#f5ebd7] retro-bevel">
            <div className="w-10 h-10 rounded bg-[#16100c] border border-rose-700/60 flex items-center justify-center text-xl mb-3">
              🗡️
            </div>
            <div className="font-pixel text-xs text-rose-400 uppercase tracking-wider mb-1">
              Tasks → "Quests"
            </div>
            <h3 className="font-medieval text-lg text-amber-200">Epic Encounters</h3>
            <p className="font-sans text-xs text-stone-300 mt-2 leading-relaxed">
              No more dull checklists. Categorized by difficulty from Trivial chores to Heroic marathons with scaling XP and Gold yields.
            </p>
          </div>

          <div className="bg-[#211812] border-2 border-[#423123] rounded-lg p-5 text-[#f5ebd7] retro-bevel">
            <div className="w-10 h-10 rounded bg-[#16100c] border border-yellow-600/60 flex items-center justify-center text-xl mb-3">
              🪙
            </div>
            <div className="font-pixel text-xs text-yellow-400 uppercase tracking-wider mb-1">
              Points → "Gold"
            </div>
            <h3 className="font-medieval text-lg text-amber-200">Tavern Currency</h3>
            <p className="font-sans text-xs text-stone-300 mt-2 leading-relaxed">
              Spend thy earned coin in Ye Olde Dungeon Bazaar to acquire custom weapons, familiars, glowing hearth decor, and relics.
            </p>
          </div>

          <div className="bg-[#211812] border-2 border-[#423123] rounded-lg p-5 text-[#f5ebd7] retro-bevel">
            <div className="w-10 h-10 rounded bg-[#16100c] border border-emerald-600/60 flex items-center justify-center text-xl mb-3">
              🌲
            </div>
            <div className="font-pixel text-xs text-emerald-400 uppercase tracking-wider mb-1">
              Categories → "Skill Trees"
            </div>
            <h3 className="font-medieval text-lg text-amber-200">Attribute Mastery</h3>
            <p className="font-sans text-xs text-stone-300 mt-2 leading-relaxed">
              Allocate your effort into Strength (fitness), Intellect (deep work), Discipline (habits), and Charisma (social bonds).
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Micro-Preview Mockup */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="bg-[#1b130e] border-2 border-amber-600/70 rounded-lg p-5 shadow-2xl retro-bevel">
          <div className="flex items-center justify-between pb-3 border-b border-[#3d2a1d] mb-4">
            <span className="font-pixel text-xs text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Real-time Dungeon Preview
            </span>
            <span className="font-pixel text-[10px] text-stone-500">Live Client-Side Scaffold</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-pixel">
            <div className="bg-[#221812] p-3 rounded border border-[#3e2c1e]">
              <div className="flex justify-between text-stone-300 mb-1">
                <span>⚡ Wayfarer Knight (Lv. 2)</span>
                <span className="text-amber-300 font-bold">140 / 282 XP</span>
              </div>
              <div className="w-full h-2 bg-[#120e0b] rounded-full overflow-hidden">
                <div className="w-[50%] h-full bg-gradient-to-r from-amber-600 to-yellow-400" />
              </div>
              <div className="flex justify-between text-stone-400 mt-2">
                <span>🪙 Gold: 180</span>
                <span>🔥 Streak: 4 Days</span>
              </div>
            </div>

            <div className="bg-[#221812] p-3 rounded border border-[#3e2c1e] flex items-center justify-between">
              <div>
                <div className="text-amber-200 font-sans font-medium text-xs">
                  Morning Physical Conditioning
                </div>
                <div className="text-stone-400 text-[10px] mt-0.5">
                  🗡️ Strength • +150 XP • +75 Gold
                </div>
              </div>
              <span className="px-2 py-1 bg-emerald-950 text-emerald-300 border border-emerald-600 rounded text-[10px]">
                Ready
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
