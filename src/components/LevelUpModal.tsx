import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Shield, Zap, X } from 'lucide-react';
import { playLevelUpFanfare, playCoinSound } from '../lib/audio';

interface Props {
  isOpen: boolean;
  level: number;
  goldBonus: number;
  onClose: () => void;
}

export const LevelUpModal: React.FC<Props> = ({ isOpen, level, goldBonus, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      playLevelUpFanfare();
      // Burst celebratory gold and amber confetti
      try {
        const count = 200;
        const defaults = {
          origin: { y: 0.7 },
          colors: ['#f59e0b', '#fbbf24', '#d97706', '#10b981', '#ffffff', '#eab308'],
        };

        const fire = (particleRatio: number, opts: confetti.Options) => {
          confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
          });
        };

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
      } catch (e) {
        console.warn('Confetti effect failed', e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="relative w-full max-w-md bg-[#241a14] border-4 border-amber-500 rounded-lg p-6 text-center text-[#fdeece] shadow-[0_0_50px_rgba(245,158,11,0.4)] retro-bevel"
        >
          {/* Close corner button */}
          <button
            onClick={onClose}
            aria-label="Close level up dialog"
            className="absolute top-3 right-3 text-stone-400 hover:text-amber-300 p-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Glowing Aura icon */}
          <div className="relative mx-auto mb-4 w-20 h-20 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/40"
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-16 h-16 rounded-full bg-gradient-to-b from-amber-400 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/50 border-2 border-yellow-200"
            >
              <Trophy className="w-8 h-8 text-amber-950" />
            </motion.div>
          </div>

          <div className="inline-block px-3 py-1 bg-amber-900/60 border border-amber-500/80 rounded font-pixel text-xs tracking-wider text-amber-300 uppercase mb-2">
            Adventurer Ascends!
          </div>

          <h2 className="font-medieval text-3xl sm:text-4xl text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2">
            LEVEL UP!
          </h2>

          <div className="flex items-center justify-center gap-3 my-4">
            <div className="px-4 py-2 bg-[#17110d] border-2 border-amber-600/70 rounded-md font-pixel text-2xl font-bold text-amber-200">
              Level {level}
            </div>
          </div>

          <p className="font-sans text-sm text-[#e6d0b3] leading-relaxed mb-5">
            Thy dedication in the realm of daily trials hath bore fruit! Thy capacity for discipline, intellect, and fortitude grows ever stronger.
          </p>

          {/* Rewards recap banner */}
          <div className="bg-[#1b130e] border border-amber-800/60 rounded-lg p-3.5 mb-6 text-left space-y-2 font-pixel text-xs">
            <div className="flex items-center justify-between text-amber-200">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" /> Guild Level Stipend:
              </span>
              <span className="font-bold text-yellow-300">+{goldBonus} Gold 🪙</span>
            </div>
            <div className="flex items-center justify-between text-emerald-300">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" /> Max Stamina & Stat Cap:
              </span>
              <span className="font-bold">+Increased</span>
            </div>
            <div className="flex items-center justify-between text-sky-300">
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-sky-400" /> Dungeon Crawl Tier:
              </span>
              <span className="font-bold">Tier {level} Unlocked</span>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={() => {
              playCoinSound();
              onClose();
            }}
            className="w-full py-3 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-amber-950 font-pixel font-bold text-base rounded-md border-2 border-yellow-200 shadow-md retro-button-press focus:outline-none focus:ring-4 focus:ring-amber-400"
          >
            ⚔️ Claim Glory & Return to Quests
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
