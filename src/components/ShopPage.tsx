import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Item, ItemCategory, User } from '../types';
import { playClickSound, playBuySound } from '../lib/audio';
import { Coins, Sparkles, Check, ShieldCheck, ShoppingBag, Store } from 'lucide-react';

interface Props {
  user: User;
  items: Item[];
  onBuyItem: (item: Item) => void;
  onEquipItem: (item: Item) => void;
  onBackToDashboard: () => void;
}

export const ShopPage: React.FC<Props> = ({
  user,
  items,
  onBuyItem,
  onEquipItem,
  onBackToDashboard,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ItemCategory>('All');

  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const getRarityBadge = (rarity: Item['rarity']) => {
    switch (rarity) {
      case 'Common':
        return 'text-stone-300 border-stone-600 bg-stone-900/60';
      case 'Rare':
        return 'text-sky-300 border-sky-600 bg-sky-950/60';
      case 'Epic':
        return 'text-purple-300 border-purple-600 bg-purple-950/60 font-bold';
      case 'Legendary':
        return 'text-amber-300 border-amber-500 bg-amber-950/80 font-bold shadow-xs shadow-amber-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Merchant Tavern Header */}
      <div className="bg-[#211913] border-2 border-[#453325] rounded-lg p-5 shadow-xl text-[#f3e5d0] retro-bevel">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-md bg-[#16110c] border-2 border-amber-600/70 flex items-center justify-center text-3xl shadow-inner select-none">
              🧙‍♂️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-medieval text-2xl sm:text-3xl text-amber-200">
                  Ye Olde Dungeon Bazaar
                </h1>
                <span className="px-2 py-0.5 bg-amber-950/80 border border-amber-600/60 rounded font-pixel text-[11px] text-amber-300">
                  Tavern Vault
                </span>
              </div>
              <p className="font-pixel text-xs text-stone-400 mt-1">
                "Welcome, weary traveler. Trade thy hard-earned Gold for weapons, familiars, and tavern spoils!"
              </p>
            </div>
          </div>

          {/* Current Gold Purse */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#16100c] border-2 border-yellow-500/70 rounded-md font-pixel shadow-inner">
              <Coins className="w-5 h-5 text-yellow-400 animate-bounce" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-amber-400 uppercase tracking-wider">Thy Purse</span>
                <span className="text-lg font-bold text-yellow-300 leading-tight">
                  {user.gold} Gold
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                playClickSound();
                onBackToDashboard();
              }}
              className="px-3.5 py-2 bg-[#17110d] hover:bg-[#221812] border border-amber-700/60 rounded font-pixel text-xs text-amber-300 retro-button-press"
            >
              ← Back to Quests
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-[#3b2b20] overflow-x-auto pb-1 scrollbar-none">
          <span className="font-pixel text-xs text-stone-400 flex items-center gap-1 mr-1">
            <Store className="w-3.5 h-3.5 text-amber-500" /> Wares:
          </span>
          {(['All', 'gear', 'companion', 'artifact', 'theme'] as const).map((cat) => {
            const isSelected = selectedCategory === cat;
            const labels: Record<string, string> = {
              All: 'All Wares',
              gear: 'Armor & Weapons',
              companion: 'Pets & Familiars',
              artifact: 'Relics & Elixirs',
              theme: 'Tavern Decor',
            };

            return (
              <button
                key={cat}
                onClick={() => {
                  playClickSound();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1 rounded-full border font-pixel text-xs transition-all retro-button-press ${
                  isSelected
                    ? 'bg-amber-950 border-amber-400 text-amber-300 font-bold'
                    : 'bg-[#18110c] border-[#3b2b20] text-stone-400 hover:text-amber-200 hover:border-amber-700'
                }`}
              >
                {labels[cat]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Item Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((item) => {
          const canAfford = user.gold >= item.price;
          const rarityClass = getRarityBadge(item.rarity);

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col justify-between bg-[#1f1712] border rounded-lg p-4 text-[#f5ebd7] transition-all duration-200 ${
                item.owned
                  ? 'border-emerald-800/60 bg-[#191512]'
                  : 'border-[#403023] hover:border-amber-500/70 shadow-md'
              }`}
            >
              <div>
                {/* Item Top: Icon and Rarity */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-12 h-12 rounded bg-[#15100c] border border-amber-700/60 flex items-center justify-center text-2xl shadow-inner">
                    {item.icon}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-2 py-0.5 rounded border text-[10px] font-pixel ${rarityClass}`}>
                      {item.rarity}
                    </span>
                    <span className="text-[10px] font-pixel text-stone-400 capitalize">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Item Details */}
                <h3 className="font-medieval text-base font-bold text-amber-200 leading-tight">
                  {item.name}
                </h3>
                <p className="font-sans text-xs text-stone-300 mt-1.5 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                {/* Attribute Bonus tag if present */}
                {item.stat_bonus && (
                  <div className="mt-2.5 inline-flex items-center gap-1 px-2 py-0.5 bg-amber-950/60 border border-amber-700/40 rounded text-[11px] font-pixel text-amber-300">
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                    <span>+{item.stat_bonus.amount} {item.stat_bonus.attribute.toUpperCase()}</span>
                  </div>
                )}
              </div>

              {/* Bottom Price & Purchase Button */}
              <div className="pt-4 mt-4 border-t border-[#38281d] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 font-pixel text-xs text-yellow-300">
                  <Coins className="w-4 h-4 text-yellow-400" />
                  <span className="font-bold text-sm">{item.price}</span>
                  <span className="text-[10px] text-amber-400/80">Gold</span>
                </div>

                {item.owned ? (
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 bg-emerald-950/80 border border-emerald-600/70 text-emerald-300 rounded font-pixel text-xs flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Owned
                    </span>
                    {item.category === 'gear' && (
                      <button
                        onClick={() => {
                          playClickSound();
                          onEquipItem(item);
                        }}
                        className={`px-2.5 py-1 rounded font-pixel text-xs border transition-all retro-button-press ${
                          item.equipped
                            ? 'bg-amber-600 text-amber-950 font-bold border-amber-300'
                            : 'bg-[#18110c] text-amber-200 border-amber-700/60 hover:border-amber-400'
                        }`}
                      >
                        {item.equipped ? 'Equipped' : 'Equip'}
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    disabled={!canAfford}
                    onClick={() => {
                      playBuySound();
                      onBuyItem(item);
                    }}
                    className={`px-3.5 py-1.5 rounded font-pixel text-xs border transition-all retro-button-press flex items-center gap-1 ${
                      canAfford
                        ? 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-amber-950 font-bold border-yellow-200 shadow-sm cursor-pointer'
                        : 'bg-[#16100c] text-stone-500 border-stone-800 cursor-not-allowed opacity-70'
                    }`}
                    title={canAfford ? 'Purchase this item' : `Thou needest ${item.price - user.gold} more Gold`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{canAfford ? 'Buy Ware' : 'Too Costly'}</span>
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
