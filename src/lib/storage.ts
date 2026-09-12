import { User, Quest, Streak, Item, SkillTree } from '../types';

const STORAGE_KEYS = {
  USER: 'life_rpg_user_v1',
  QUESTS: 'life_rpg_quests_v1',
  STREAK: 'life_rpg_streak_v1',
  ITEMS: 'life_rpg_items_v1',
  AUTH: 'life_rpg_auth_v1',
};

export const INITIAL_USER: User = {
  id: 'usr_adventurer_1',
  email: 'hero@dungeoncrawler.guild',
  name: 'Rowan the Seeker',
  avatar: '🛡️',
  character_class: 'Wayfarer Knight',
  level: 2,
  current_xp: 140, // level 2 needs 282 XP
  gold: 180,
  attributes: {
    strength: 14,
    intellect: 18,
    discipline: 16,
    charisma: 12,
  },
};

export const INITIAL_STREAK: Streak = {
  current_streak: 4,
  longest_streak: 12,
  last_completed_date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
};

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 'qst_1',
    user_id: 'usr_adventurer_1',
    title: 'Morning Physical Conditioning (45m Workout)',
    skill_tree: 'Strength',
    difficulty: 'Medium',
    xp_reward: 150,
    gold_reward: 75,
    completed: false,
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'qst_2',
    user_id: 'usr_adventurer_1',
    title: 'Deep Work: Architectural System Design',
    skill_tree: 'Intellect',
    difficulty: 'Hard',
    xp_reward: 300,
    gold_reward: 160,
    completed: false,
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'qst_3',
    user_id: 'usr_adventurer_1',
    title: 'Mindful Stillness & Breathwork (15m)',
    skill_tree: 'Discipline',
    difficulty: 'Easy',
    xp_reward: 75,
    gold_reward: 35,
    completed: false,
    created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'qst_4',
    user_id: 'usr_adventurer_1',
    title: 'Check in on a Guildmate / Catch up with family',
    skill_tree: 'Charisma',
    difficulty: 'Easy',
    xp_reward: 75,
    gold_reward: 35,
    completed: false,
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'qst_5',
    user_id: 'usr_adventurer_1',
    title: 'Drink 2L of Pure Spring Water & Hydrate',
    skill_tree: 'Discipline',
    difficulty: 'Trivial',
    xp_reward: 35,
    gold_reward: 15,
    completed: true,
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    completed_at: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
];

export const INITIAL_ITEMS: Item[] = [
  {
    id: 'itm_sword_1',
    name: 'Rune-Forged Claymore',
    price: 120,
    description: 'A glowing blade etched with focus sigils. Gives your daily push a sharp edge.',
    owned: false,
    category: 'gear',
    icon: '⚔️',
    rarity: 'Rare',
    stat_bonus: { attribute: 'strength', amount: 3 },
  },
  {
    id: 'itm_tome_1',
    name: "Archmage's Codex",
    price: 175,
    description: 'Bound in ancient dragon-leather. Expands analytical comprehension.',
    owned: false,
    category: 'artifact',
    icon: '📜',
    rarity: 'Epic',
    stat_bonus: { attribute: 'intellect', amount: 4 },
  },
  {
    id: 'itm_torch_1',
    name: 'Eternal Hearth Torch',
    price: 90,
    description: 'Never flickers out in the darkest cavern. Casts a warm amber aura.',
    owned: true,
    equipped: true,
    category: 'gear',
    icon: '🕯️',
    rarity: 'Common',
    stat_bonus: { attribute: 'discipline', amount: 2 },
  },
  {
    id: 'itm_pet_fox',
    name: 'Dungeon Ember Fox',
    price: 240,
    description: 'A cozy 16-bit familiar that curls up by your desk while you study.',
    owned: false,
    category: 'companion',
    icon: '🦊',
    rarity: 'Epic',
    stat_bonus: { attribute: 'charisma', amount: 3 },
  },
  {
    id: 'itm_cloak_1',
    name: 'Shadow-Weave Cloak',
    price: 150,
    description: 'Blocks worldly distractions with impenetrable velvet stealth.',
    owned: false,
    category: 'gear',
    icon: '🧥',
    rarity: 'Rare',
    stat_bonus: { attribute: 'discipline', amount: 3 },
  },
  {
    id: 'itm_theme_tavern',
    name: 'Warm Tavern Fireplace Decor',
    price: 300,
    description: 'Transforms your quest dashboard background with flickering hearth flames.',
    owned: false,
    category: 'theme',
    icon: '🔥',
    rarity: 'Legendary',
  },
  {
    id: 'itm_chalice',
    name: 'Goblet of Fellowship',
    price: 110,
    description: 'Raises morale during guild summits and social encounters.',
    owned: false,
    category: 'artifact',
    icon: '🏆',
    rarity: 'Common',
    stat_bonus: { attribute: 'charisma', amount: 2 },
  },
  {
    id: 'itm_dragon_egg',
    name: 'Dormant Dragon Egg',
    price: 450,
    description: 'A mysterious iridescent relic that warms to the touch when quests are finished.',
    owned: false,
    category: 'artifact',
    icon: '🥚',
    rarity: 'Legendary',
    stat_bonus: { attribute: 'strength', amount: 5 },
  },
];

// Helper to safely load from localStorage
export function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch {
    return fallback;
  }
}

// Helper to save to localStorage
export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to save key ${key}:`, err);
  }
}

export const StorageService = {
  getUser: (): User => loadFromStorage<User>(STORAGE_KEYS.USER, INITIAL_USER),
  saveUser: (user: User) => saveToStorage(STORAGE_KEYS.USER, user),

  getQuests: (): Quest[] => loadFromStorage<Quest[]>(STORAGE_KEYS.QUESTS, INITIAL_QUESTS),
  saveQuests: (quests: Quest[]) => saveToStorage(STORAGE_KEYS.QUESTS, quests),

  getStreak: (): Streak => loadFromStorage<Streak>(STORAGE_KEYS.STREAK, INITIAL_STREAK),
  saveStreak: (streak: Streak) => saveToStorage(STORAGE_KEYS.STREAK, streak),

  getItems: (): Item[] => loadFromStorage<Item[]>(STORAGE_KEYS.ITEMS, INITIAL_ITEMS),
  saveItems: (items: Item[]) => saveToStorage(STORAGE_KEYS.ITEMS, items),

  getAuth: (): { isAuthenticated: boolean; email?: string } =>
    loadFromStorage(STORAGE_KEYS.AUTH, { isAuthenticated: true, email: 'hero@dungeoncrawler.guild' }),
  saveAuth: (auth: { isAuthenticated: boolean; email?: string }) =>
    saveToStorage(STORAGE_KEYS.AUTH, auth),

  resetToDefaults: () => {
    saveToStorage(STORAGE_KEYS.USER, INITIAL_USER);
    saveToStorage(STORAGE_KEYS.QUESTS, INITIAL_QUESTS);
    saveToStorage(STORAGE_KEYS.STREAK, INITIAL_STREAK);
    saveToStorage(STORAGE_KEYS.ITEMS, INITIAL_ITEMS);
    saveToStorage(STORAGE_KEYS.AUTH, { isAuthenticated: true, email: 'hero@dungeoncrawler.guild' });
  },
};

/**
 * Updates streak when a quest is completed
 */
export function calculateNewStreak(currentStreak: Streak): Streak {
  const today = new Date().toISOString().split('T')[0];
  
  if (currentStreak.last_completed_date === today) {
    // Already completed a quest today, streak stays intact
    return currentStreak;
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  let newCurrent = currentStreak.current_streak;

  if (currentStreak.last_completed_date === yesterday) {
    newCurrent += 1;
  } else if (!currentStreak.last_completed_date) {
    newCurrent = 1;
  } else {
    // Streak was broken
    newCurrent = 1;
  }

  const newLongest = Math.max(newCurrent, currentStreak.longest_streak);

  return {
    current_streak: newCurrent,
    longest_streak: newLongest,
    last_completed_date: today,
  };
}

/**
 * Skill tree to Attribute mapping
 */
export function getAttributeForSkillTree(skillTree: SkillTree): 'strength' | 'intellect' | 'discipline' | 'charisma' {
  switch (skillTree) {
    case 'Strength': return 'strength';
    case 'Intellect': return 'intellect';
    case 'Discipline': return 'discipline';
    case 'Charisma': return 'charisma';
  }
}
