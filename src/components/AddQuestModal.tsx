import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SkillTree, Difficulty } from '../types';
import { getDifficultyRewards } from '../lib/xp';
import { playClickSound, playCoinSound } from '../lib/audio';
import { X, Sparkles, ScrollText, Dumbbell, Brain, ShieldAlert } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddQuest: (data: {
    title: string;
    skill_tree: SkillTree;
    difficulty: Difficulty;
    xp_reward: number;
    gold_reward: number;
  }) => void;
}

export const AddQuestModal: React.FC<Props> = ({ isOpen, onClose, onAddQuest }) => {
  const [title, setTitle] = useState('');
  const [skillTree, setSkillTree] = useState<SkillTree>('Intellect');
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium');
  const [error, setError] = useState('');

  const rewards = getDifficultyRewards(difficulty);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('A quest must have an honorable title!');
      return;
    }

    playCoinSound();
    onAddQuest({
      title: title.trim(),
      skill_tree: skillTree,
      difficulty,
      xp_reward: rewards.xp_reward,
      gold_reward: rewards.gold_reward,
    });

    setTitle('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quest-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="relative w-full max-w-lg bg-[#241a14] border-2 border-amber-600/80 rounded-lg p-6 shadow-2xl text-[#f5ebd7] retro-bevel"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-[#3d2c20]">
            <div className="flex items-center gap-2.5">
              <ScrollText className="w-5 h-5 text-amber-400" />
              <h2 id="quest-modal-title" className="font-medieval text-xl sm:text-2xl text-amber-200">
                Post New Guild Quest
              </h2>
            </div>
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              aria-label="Close quest prompt"
              className="text-stone-400 hover:text-amber-300 p-1 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* Quest Title */}
            <div>
              <label htmlFor="quest-title-input" className="block font-pixel text-xs text-amber-300 mb-1.5 uppercase tracking-wider">
                Quest Title <span className="text-rose-400">*</span>
              </label>
              <input
                id="quest-title-input"
                type="text"
                autoFocus
                placeholder="e.g., Read 20 pages of Systems Architecture..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) setError('');
                }}
                className="w-full px-3.5 py-2.5 bg-[#17110d] border border-[#483424] focus:border-amber-400 rounded text-sm text-[#f5ebd7] placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-400 font-sans"
              />
              {error && <p className="mt-1 font-pixel text-xs text-rose-400">{error}</p>}
            </div>

            {/* Skill Tree Dropdown */}
            <div>
              <label htmlFor="quest-skill-tree-select" className="block font-pixel text-xs text-amber-300 mb-1.5 uppercase tracking-wider">
                Target Skill Tree
              </label>
              <select
                id="quest-skill-tree-select"
                value={skillTree}
                onChange={(e) => setSkillTree(e.target.value as SkillTree)}
                className="w-full px-3.5 py-2.5 bg-[#17110d] border border-[#483424] focus:border-amber-400 rounded text-sm text-amber-100 font-pixel tracking-wide focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
              >
                <option value="Strength">🗡️ Strength (Fitness, Vigor, Physical Endurance)</option>
                <option value="Intellect">📜 Intellect (Coding, Reading, Research, Study)</option>
                <option value="Discipline">🛡️ Discipline (Habits, Meditation, Nutrition, Chores)</option>
                <option value="Charisma">✨ Charisma (Networking, Family, Friends, Leadership)</option>
              </select>
            </div>

            {/* Difficulty Selector */}
            <div>
              <label className="block font-pixel text-xs text-amber-300 mb-1.5 uppercase tracking-wider">
                Encounter Difficulty
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {(['Trivial', 'Easy', 'Medium', 'Hard', 'Heroic'] as Difficulty[]).map((diff) => {
                  const isSelected = difficulty === diff;
                  return (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setDifficulty(diff);
                      }}
                      className={`py-2 px-1 rounded border text-center font-pixel text-xs transition-all retro-button-press ${
                        isSelected
                          ? 'bg-amber-600/90 border-amber-300 text-amber-950 font-bold shadow-md shadow-amber-900/40'
                          : 'bg-[#18110c] border-[#3e2c1e] text-stone-300 hover:border-amber-500/60'
                      }`}
                    >
                      {diff}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Reward Preview */}
            <div className="bg-[#18110d] border border-amber-900/50 rounded-md p-3.5 flex items-center justify-between">
              <span className="font-pixel text-xs text-stone-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Promised Bounty:
              </span>
              <div className="flex items-center gap-3 font-pixel text-xs">
                <span className="text-amber-300 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-600/50">
                  +{rewards.xp_reward} XP
                </span>
                <span className="text-yellow-300 font-bold bg-yellow-950/60 px-2 py-0.5 rounded border border-yellow-600/50">
                  +{rewards.gold_reward} Gold 🪙
                </span>
              </div>
            </div>

            {/* Submit / Cancel Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
                className="px-4 py-2 bg-[#17110d] hover:bg-[#201712] border border-[#3e2c1e] rounded font-pixel text-xs text-stone-400 retro-button-press"
              >
                Retreat
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-amber-950 font-pixel font-bold text-xs rounded border border-yellow-200 shadow-md retro-button-press flex items-center gap-1.5"
              >
                📜 Post to Guild Board
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
