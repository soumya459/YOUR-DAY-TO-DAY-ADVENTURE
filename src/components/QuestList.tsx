import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quest, SkillTree } from '../types';
import { playClickSound, playQuestCompleteSound } from '../lib/audio';
import { CheckCircle2, Circle, Flame, Sparkles, Filter, Plus, Clock, Trash2 } from 'lucide-react';

interface Props {
  quests: Quest[];
  onCompleteQuest: (questId: string, event: React.MouseEvent<HTMLButtonElement>) => void;
  onDeleteQuest: (questId: string) => void;
  onOpenAddModal: () => void;
}

export const QuestList: React.FC<Props> = ({
  quests,
  onCompleteQuest,
  onDeleteQuest,
  onOpenAddModal,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | SkillTree>('All');
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const filteredQuests = quests.filter((q) => {
    const matchesTab = activeTab === 'active' ? !q.completed : q.completed;
    const matchesTree = selectedFilter === 'All' || q.skill_tree === selectedFilter;
    return matchesTab && matchesTree;
  });

  const activeCount = quests.filter((q) => !q.completed).length;
  const completedCount = quests.filter((q) => q.completed).length;

  const getTreeBadge = (tree: SkillTree) => {
    switch (tree) {
      case 'Strength':
        return {
          label: 'Strength',
          bg: 'bg-rose-950/70 border-rose-600/50 text-rose-300',
          icon: '⚔️',
        };
      case 'Intellect':
        return {
          label: 'Intellect',
          bg: 'bg-sky-950/70 border-sky-600/50 text-sky-300',
          icon: '📜',
        };
      case 'Discipline':
        return {
          label: 'Discipline',
          bg: 'bg-emerald-950/70 border-emerald-600/50 text-emerald-300',
          icon: '🛡️',
        };
      case 'Charisma':
        return {
          label: 'Charisma',
          bg: 'bg-amber-950/70 border-amber-500/50 text-amber-300',
          icon: '✨',
        };
    }
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Trivial':
        return 'text-stone-400 border-stone-600/60 bg-stone-900/50';
      case 'Easy':
        return 'text-emerald-400 border-emerald-700/60 bg-emerald-950/50';
      case 'Medium':
        return 'text-amber-300 border-amber-700/60 bg-amber-950/50';
      case 'Hard':
        return 'text-orange-400 border-orange-700/60 bg-orange-950/50';
      case 'Heroic':
        return 'text-purple-300 border-purple-600/60 bg-purple-950/50 font-bold';
      default:
        return 'text-stone-300 border-stone-700 bg-stone-900';
    }
  };

  return (
    <div className="bg-[#211913] border-2 border-[#453325] rounded-lg p-5 shadow-xl text-[#f3e5d0] retro-bevel">
      {/* Top Controls: Notice Board Header, Add Quest CTA & Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#3c2a1d]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-medieval text-xl sm:text-2xl text-amber-200">
              Adventurer's Quest Log
            </h2>
            <span className="px-2 py-0.5 bg-[#17110d] border border-amber-700/60 rounded font-pixel text-xs text-amber-400">
              {activeCount} active
            </span>
          </div>
          <p className="font-pixel text-[11px] text-stone-400 mt-0.5">
            Slay procrastination. Savor the glory of completed trials.
          </p>
        </div>

        <button
          onClick={() => {
            playClickSound();
            onOpenAddModal();
          }}
          className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-amber-950 font-pixel font-bold text-xs rounded border border-yellow-200 shadow-md retro-button-press flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <Plus className="w-4 h-4" />
          <span>New Quest</span>
        </button>
      </div>

      {/* Tabs & Skill Tree Filter Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 my-4">
        {/* Active vs Completed toggle */}
        <div className="flex items-center gap-1 bg-[#16100c] p-1 rounded-md border border-[#3b2b20]">
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('active');
            }}
            className={`px-3 py-1 rounded font-pixel text-xs transition-all ${
              activeTab === 'active'
                ? 'bg-amber-600 text-amber-950 font-bold shadow-xs'
                : 'text-stone-400 hover:text-amber-200'
            }`}
          >
            Active Quests ({activeCount})
          </button>
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('completed');
            }}
            className={`px-3 py-1 rounded font-pixel text-xs transition-all ${
              activeTab === 'completed'
                ? 'bg-amber-600 text-amber-950 font-bold shadow-xs'
                : 'text-stone-400 hover:text-amber-200'
            }`}
          >
            Chronicle ({completedCount})
          </button>
        </div>

        {/* Skill Tree Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
          <span className="text-[11px] font-pixel text-stone-400 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3 text-amber-500" /> Filter:
          </span>
          {(['All', 'Strength', 'Intellect', 'Discipline', 'Charisma'] as const).map((tree) => {
            const isSelected = selectedFilter === tree;
            return (
              <button
                key={tree}
                onClick={() => {
                  playClickSound();
                  setSelectedFilter(tree);
                }}
                className={`px-2.5 py-0.5 rounded-full border text-[11px] font-pixel transition-all retro-button-press ${
                  isSelected
                    ? 'bg-amber-950 border-amber-400 text-amber-300 font-bold'
                    : 'bg-[#18110c] border-[#3a2a1d] text-stone-400 hover:text-amber-200 hover:border-amber-700'
                }`}
              >
                {tree}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quest Cards List */}
      <div className="space-y-3">
        {filteredQuests.length === 0 ? (
          <div className="text-center py-10 px-4 bg-[#18120e] border border-dashed border-[#3c2a1d] rounded-lg">
            <div className="text-3xl mb-2">🏕️</div>
            <h3 className="font-medieval text-lg text-amber-300">
              {activeTab === 'active'
                ? 'The Tavern Board is Empty!'
                : 'No Completed Quests in this Tree Yet'}
            </h3>
            <p className="font-pixel text-xs text-stone-400 max-w-md mx-auto mt-1">
              {activeTab === 'active'
                ? 'Thou hast cleared all active dungeon duties! Relax by the cozy campfire or post a new trial.'
                : 'Complete quests in this skill tree to write them into your eternal guild chronicle.'}
            </p>
            {activeTab === 'active' && (
              <button
                onClick={() => {
                  playClickSound();
                  onOpenAddModal();
                }}
                className="mt-4 px-4 py-2 bg-amber-700/60 hover:bg-amber-600 border border-amber-400 text-amber-100 font-pixel text-xs rounded retro-button-press"
              >
                + Enlist A Quest
              </button>
            )}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredQuests.map((quest) => {
              const treeBadge = getTreeBadge(quest.skill_tree);
              const diffBadge = getDifficultyBadge(quest.difficulty);

              return (
                <motion.div
                  key={quest.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`group relative bg-[#18110c] border rounded-lg p-4 transition-all duration-150 ${
                    quest.completed
                      ? 'border-[#2d2117] opacity-75'
                      : 'border-[#3f2e21] hover:border-amber-500/70 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    {/* Left: Checkmark / Status and Title */}
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {!quest.completed ? (
                        <button
                          onClick={(e) => onCompleteQuest(quest.id, e)}
                          aria-label={`Complete quest: ${quest.title}`}
                          className="mt-0.5 p-1 rounded-md text-stone-500 hover:text-amber-400 hover:bg-amber-950/40 border border-stone-700 hover:border-amber-500 transition-colors retro-button-press focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                          <Circle className="w-5 h-5" />
                        </button>
                      ) : (
                        <div className="mt-0.5 p-1 text-emerald-400">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <h4
                          className={`font-sans font-medium text-sm sm:text-base leading-snug break-words ${
                            quest.completed
                              ? 'line-through text-stone-500'
                              : 'text-[#f5ebd7]'
                          }`}
                        >
                          {quest.title}
                        </h4>

                        {/* Metadata Tags */}
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {/* Skill Tree Badge */}
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-pixel ${treeBadge.bg}`}
                          >
                            <span>{treeBadge.icon}</span>
                            <span>{treeBadge.label}</span>
                          </span>

                          {/* Difficulty Tag */}
                          <span
                            className={`px-2 py-0.5 rounded border text-[10px] font-pixel ${diffBadge}`}
                          >
                            {quest.difficulty}
                          </span>

                          {/* Created date note */}
                          <span className="text-[10px] font-pixel text-stone-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(quest.created_at).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Bounty & Action Button */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#2d2117]">
                      {/* Reward Pill */}
                      <div className="flex items-center gap-2 font-pixel text-xs">
                        <span className="text-amber-300 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-700/50">
                          +{quest.xp_reward} XP
                        </span>
                        <span className="text-yellow-300 font-bold bg-yellow-950/60 px-2 py-0.5 rounded border border-yellow-700/50">
                          +{quest.gold_reward} 🪙
                        </span>
                      </div>

                      {/* Complete CTA Button */}
                      {!quest.completed ? (
                        <button
                          onClick={(e) => onCompleteQuest(quest.id, e)}
                          className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-stone-950 font-pixel font-bold text-xs rounded border border-emerald-300 shadow-sm retro-button-press focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        >
                          Complete
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            playClickSound();
                            onDeleteQuest(quest.id);
                          }}
                          aria-label="Remove completed quest from log"
                          className="text-stone-500 hover:text-rose-400 p-1 rounded focus:outline-none"
                          title="Purge from chronicle"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
