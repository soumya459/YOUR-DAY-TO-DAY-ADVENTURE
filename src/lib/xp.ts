import { Difficulty } from '../types';

/**
 * Non-linear XP curve utility function.
 * Calculates the exact XP required to advance from the given level to the next level.
 * Formula: xpToNextLevel = Math.floor(100 * (level ^ 1.5))
 * 
 * Example milestones:
 * Level 1 -> 2: 100 XP
 * Level 2 -> 3: 282 XP
 * Level 3 -> 4: 519 XP
 * Level 4 -> 5: 800 XP
 * Level 5 -> 6: 1,118 XP
 */
export function xpToNextLevel(level: number): number {
  if (level < 1) return 100;
  return Math.floor(100 * Math.pow(level, 1.5));
}

/**
 * Maps quest difficulty to XP and Gold yields.
 */
export function getDifficultyRewards(difficulty: Difficulty): { xp_reward: number; gold_reward: number } {
  switch (difficulty) {
    case 'Trivial':
      return { xp_reward: 35, gold_reward: 15 };
    case 'Easy':
      return { xp_reward: 75, gold_reward: 35 };
    case 'Medium':
      return { xp_reward: 150, gold_reward: 75 };
    case 'Hard':
      return { xp_reward: 300, gold_reward: 160 };
    case 'Heroic':
      return { xp_reward: 600, gold_reward: 350 };
    default:
      return { xp_reward: 100, gold_reward: 50 };
  }
}

/**
 * Computes level progression handling potential multiple level-ups when a massive quest is completed.
 */
export function applyXpGain(
  currentLevel: number,
  currentXp: number,
  gainedXp: number
): {
  newLevel: number;
  newXp: number;
  leveledUp: boolean;
  levelsGained: number;
  xpThreshold: number;
} {
  let level = currentLevel;
  let xp = currentXp + gainedXp;
  let levelsGained = 0;

  while (true) {
    const needed = xpToNextLevel(level);
    if (xp >= needed) {
      xp -= needed;
      level += 1;
      levelsGained += 1;
    } else {
      break;
    }
  }

  return {
    newLevel: level,
    newXp: xp,
    leveledUp: levelsGained > 0,
    levelsGained,
    xpThreshold: xpToNextLevel(level),
  };
}

/**
 * Calculates current progress percentage within current level (0% to 100%).
 */
export function getLevelProgress(currentXp: number, level: number): {
  current: number;
  max: number;
  percent: number;
} {
  const max = xpToNextLevel(level);
  const current = Math.min(currentXp, max);
  const percent = Math.min(100, Math.max(0, Math.round((current / max) * 100)));
  return { current, max, percent };
}
