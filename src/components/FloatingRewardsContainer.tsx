import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface FloatingNotification {
  id: string;
  x: number;
  y: number;
  xp: number;
  gold: number;
}

interface Props {
  notifications: FloatingNotification[];
  onComplete: (id: string) => void;
}

export const FloatingRewardsContainer: React.FC<Props> = ({ notifications, onComplete }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {notifications.map((n) => (
          <FloatingRewardItem key={n.id} notification={n} onDismiss={() => onComplete(n.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const FloatingRewardItem: React.FC<{ notification: FloatingNotification; onDismiss: () => void }> = ({
  notification,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 1800);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: notification.y, x: notification.x - 60, scale: 0.7 }}
      animate={{ opacity: [0, 1, 1, 0], y: notification.y - 80, scale: [0.7, 1.15, 1, 0.9] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.6, ease: 'easeOut' }}
      className="absolute flex flex-col items-center gap-1 font-pixel text-sm select-none"
    >
      <div className="px-2.5 py-1 bg-amber-950/95 border-2 border-amber-400 text-amber-200 rounded-md shadow-lg shadow-amber-900/40 flex items-center gap-1.5">
        <span className="text-yellow-400 text-xs">✨</span>
        <span className="font-bold text-amber-300">+{notification.xp} XP</span>
        <span className="text-amber-500">|</span>
        <span className="text-yellow-300 font-bold">+{notification.gold} Gold 🪙</span>
      </div>
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 1, scale: 1, x: (i - 2) * 6 }}
            animate={{
              opacity: 0,
              y: -25 - Math.random() * 20,
              x: (i - 2) * 16 + (Math.random() * 20 - 10),
            }}
            transition={{ duration: 1, delay: i * 0.05 }}
            className="text-xs text-amber-300"
          >
            ★
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};
