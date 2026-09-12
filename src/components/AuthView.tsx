import React, { useState } from 'react';
import { motion } from 'motion/react';
import { playClickSound, playCoinSound } from '../lib/audio';
import { Shield, KeyRound, Mail, User as UserIcon, Sparkles, ArrowRight } from 'lucide-react';

interface Props {
  onLoginSuccess: (email: string, name?: string, characterClass?: string) => void;
  onCancel?: () => void;
}

export const AuthView: React.FC<Props> = ({ onLoginSuccess, onCancel }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adventurerName, setAdventurerName] = useState('');
  const [characterClass, setCharacterClass] = useState('Wayfarer Knight');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Both guild email and secret passphrase are required!');
      return;
    }
    if (password.length < 4) {
      setError('Secret passphrase must be at least 4 glyphs long.');
      return;
    }

    playCoinSound();
    onLoginSuccess(email, adventurerName || 'Rowan the Seeker', characterClass);
  };

  const handleQuickDemoLogin = () => {
    playCoinSound();
    onLoginSuccess('hero@dungeoncrawler.guild', 'Rowan the Seeker', 'Wayfarer Knight');
  };

  return (
    <div className="flex items-center justify-center min-h-[75vh] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#231a14] border-4 border-amber-600/90 rounded-lg p-6 sm:p-8 text-[#f5ebd7] shadow-2xl retro-bevel"
      >
        {/* Guild Crest / Seal */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#18110c] border-2 border-amber-500 shadow-md mb-3">
            <span className="text-3xl select-none">🛡️</span>
          </div>
          <h2 className="font-medieval text-2xl sm:text-3xl text-amber-200">
            {isSignUp ? 'Adventurer Enlistment' : 'Adventurer Guild Log In'}
          </h2>
          <p className="font-pixel text-xs text-stone-400 mt-1">
            {isSignUp
              ? 'Inscribe thy name in the sacred registry of dungeon crawlers.'
              : 'Provide thy credentials to resume thy epic life quests.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#16100c] p-1 rounded-md border border-[#3e2c1e] mb-5">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setIsSignUp(false);
              setError('');
            }}
            className={`flex-1 py-1.5 rounded font-pixel text-xs transition-all ${
              !isSignUp
                ? 'bg-amber-600 text-amber-950 font-bold shadow-xs'
                : 'text-stone-400 hover:text-amber-200'
            }`}
          >
            Guild Log In
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setIsSignUp(true);
              setError('');
            }}
            className={`flex-1 py-1.5 rounded font-pixel text-xs transition-all ${
              isSignUp
                ? 'bg-amber-600 text-amber-950 font-bold shadow-xs'
                : 'text-stone-400 hover:text-amber-200'
            }`}
          >
            Enlist (Sign Up)
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block font-pixel text-xs text-amber-300 mb-1 uppercase tracking-wider">
                Adventurer Title / Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
                  <UserIcon className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="e.g. Sir Cedric of Elmwood"
                  value={adventurerName}
                  onChange={(e) => setAdventurerName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#17110d] border border-[#483526] focus:border-amber-400 rounded text-sm text-[#f5ebd7] placeholder:text-stone-600 focus:outline-none focus:ring-1 focus:ring-amber-400 font-sans"
                />
              </div>
            </div>
          )}

          {isSignUp && (
            <div>
              <label className="block font-pixel text-xs text-amber-300 mb-1 uppercase tracking-wider">
                Hero Archetype / Class
              </label>
              <select
                value={characterClass}
                onChange={(e) => setCharacterClass(e.target.value)}
                className="w-full px-3 py-2 bg-[#17110d] border border-[#483526] focus:border-amber-400 rounded text-sm text-amber-200 font-pixel focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
              >
                <option value="Wayfarer Knight">🗡️ Wayfarer Knight (Balanced, Resilient)</option>
                <option value="Arcane Scholar">📜 Arcane Scholar (High Intellect & Focus)</option>
                <option value="Dungeon Rogue">🏹 Dungeon Rogue (Agile, Disciplined)</option>
                <option value="Guild Bard">✨ Guild Bard (Charismatic & Inspiring)</option>
              </select>
            </div>
          )}

          <div>
            <label className="block font-pixel text-xs text-amber-300 mb-1 uppercase tracking-wider">
              Guild Pigeon Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                placeholder="hero@dungeoncrawler.guild"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                className="w-full pl-9 pr-3 py-2 bg-[#17110d] border border-[#483526] focus:border-amber-400 rounded text-sm text-[#f5ebd7] placeholder:text-stone-600 focus:outline-none focus:ring-1 focus:ring-amber-400 font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block font-pixel text-xs text-amber-300 mb-1 uppercase tracking-wider">
              Secret Passphrase
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
                <KeyRound className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                className="w-full pl-9 pr-3 py-2 bg-[#17110d] border border-[#483526] focus:border-amber-400 rounded text-sm text-[#f5ebd7] placeholder:text-stone-600 focus:outline-none focus:ring-1 focus:ring-amber-400 font-sans"
              />
            </div>
          </div>

          {error && (
            <p className="font-pixel text-xs text-rose-400 bg-rose-950/40 p-2 rounded border border-rose-800">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 mt-2 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-amber-950 font-pixel font-bold text-sm rounded border border-yellow-200 shadow-md retro-button-press flex items-center justify-center gap-2"
          >
            <span>{isSignUp ? 'Seal Enlistment' : 'Unlock Tavern Doors'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo One-Click Login */}
        <div className="mt-6 pt-4 border-t border-[#3b2b20] text-center">
          <p className="font-pixel text-[11px] text-stone-400 mb-2">
            Just testing the realm?
          </p>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2 bg-[#17110c] hover:bg-[#221812] border border-amber-700/60 rounded font-pixel text-xs text-amber-300 retro-button-press flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>Instant Demo Adventurer Login</span>
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="mt-3 font-pixel text-xs text-stone-500 hover:text-stone-300"
            >
              ← Return to Realm Gates
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
