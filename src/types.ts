export type SkillTree = 'Strength' | 'Intellect' | 'Discipline' | 'Charisma';

export type Difficulty = 'Trivial' | 'Easy' | 'Medium' | 'Hard' | 'Heroic';

export interface Attributes {
  strength: number;
  intellect: number;
  discipline: number;
  charisma: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  character_class: string;
  level: number;
  current_xp: number;
  gold: number;
  attributes: Attributes;
}

export interface Quest {
  id: string;
  user_id: string;
  title: string;
  skill_tree: SkillTree;
  difficulty: Difficulty;
  xp_reward: number;
  gold_reward: number;
  completed: boolean;
  created_at: string;
  completed_at?: string | null;
}

export interface Streak {
  current_streak: number;
  longest_streak: number;
  last_completed_date: string | null;
}

export type ItemCategory = 'gear' | 'companion' | 'theme' | 'artifact';

export interface Item {
  id: string;
  name: string;
  price: number;
  description: string;
  owned: boolean;
  equipped?: boolean;
  category: ItemCategory;
  icon: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  stat_bonus?: {
    attribute: keyof Attributes;
    amount: number;
  };
}

export interface LevelUpPayload {
  oldLevel: number;
  newLevel: number;
  xpOverflow: number;
  goldBonus: number;
}
