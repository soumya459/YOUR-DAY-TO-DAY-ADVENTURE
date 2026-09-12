import React, { useState } from 'react';
import { User, Streak } from '../types';
import { isSoundEnabled, setSoundEnabled, playClickSound, playCoinSound } from '../lib/audio';
import { Shield, Sparkles, Volume2, VolumeX, Coins, Flame, LogOut, Store, ScrollText, RotateCcw, Home } from 'lucide-react';

interface Props {
  currentView: 'landing' | 'dashboard' | 'shop' | 'auth';
  onNavigate: (view: 'landing' | 'dashboard' | 'shop' | 'auth') => void;
  user: User;
  streak: Streak;
  isAuthenticated: boolean;
  onLogout: () => void;
  onResetData: () => void;
}

export const Navbar: React.FC<Props> = ({
  currentView,
  onNavigate,
  user,
  streak,
  isAuthenticated,
  onLogout,
  onResetData,
}) => {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playClickSound();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#1b140f]/95 backdrop-blur-md border-b-2 border-[#3d2c20] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo / Realm Branding */}
        <button
          onClick={() => {
            playClickSound();
            onNavigate('dashboard');
          }}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-md bg-[#251b14] border-2 border-amber-600/80 flex items-center justify-center text-xl shadow-md group-hover:border-amber-400 transition-colors select-none">
            🛡️
          </div>
          <div>
            <div className="font-medieval text-base sm:text-lg font-bold text-amber-200 group-hover:text-amber-300 transition-colors leading-tight">
              Your Day to Day Adventure
            </div>
            <div className="font-pixel text-[10px] text-amber-500/80 tracking-wider">
              Cozy 16-Bit Crawler
            </div>
          </div>
        </button>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => {
              playClickSound();
              onNavigate('landing');
            }}
            className={`px-2.5 sm:px-3 py-1.5 rounded font-pixel text-xs transition-all retro-button-press flex items-center gap-1 ${
              currentView === 'landing'
                ? 'bg-amber-900/60 border border-amber-500/80 text-amber-200 font-bold'
                : 'text-stone-400 hover:text-amber-200 hover:bg-[#251a13]'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">The Gates</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              onNavigate('dashboard');
            }}
            className={`px-2.5 sm:px-3 py-1.5 rounded font-pixel text-xs transition-all retro-button-press flex items-center gap-1 ${
              currentView === 'dashboard'
                ? 'bg-amber-900/60 border border-amber-500/80 text-amber-200 font-bold'
                : 'text-stone-400 hover:text-amber-200 hover:bg-[#251a13]'
            }`}
          >
            <ScrollText className="w-3.5 h-3.5" />
            <span>Quests</span>
          </button>

          <button
            onClick={() => {
              playCoinSound();
              onNavigate('shop');
            }}
            className={`px-2.5 sm:px-3 py-1.5 rounded font-pixel text-xs transition-all retro-button-press flex items-center gap-1 ${
              currentView === 'shop'
                ? 'bg-amber-900/60 border border-amber-500/80 text-amber-200 font-bold'
                : 'text-stone-400 hover:text-amber-200 hover:bg-[#251a13]'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Bazaar</span>
          </button>
        </nav>

        {/* Right Utility Bar: Character Quick Stats & Controls */}
        <div className="flex items-center gap-2">
          {/* Audio Synthesizer Mute Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded bg-[#18110c] border border-[#3e2c1e] text-stone-400 hover:text-amber-300 hover:border-amber-600/70 transition-colors retro-button-press focus:outline-none"
            aria-label={soundOn ? 'Mute 16-bit sound effects' : 'Enable 16-bit sound effects'}
            title={soundOn ? 'Mute 16-bit retro audio' : 'Unmute 16-bit retro audio'}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
          </button>

          {/* Quick Currency display on desktop */}
          <div
            onClick={() => {
              playCoinSound();
              onNavigate('shop');
            }}
            className="hidden md:flex items-center gap-1 px-2.5 py-1 bg-[#17110c] border border-amber-700/60 rounded font-pixel text-xs text-yellow-300 cursor-pointer hover:border-amber-400"
            title="Open shop"
          >
            <Coins className="w-3.5 h-3.5 text-yellow-400" />
            <span>{user.gold}</span>
          </div>

          {/* User Profile / Auth Action */}
          {isAuthenticated ? (
            <div className="flex items-center gap-1.5">
              <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 bg-[#241a13] border border-[#3e2c1e] rounded font-pixel text-xs text-stone-300">
                <span>{user.avatar}</span>
                <span className="truncate max-w-[100px]">{user.name}</span>
                <span className="text-amber-400 font-bold">Lv.{user.level}</span>
              </div>
              <button
                onClick={() => {
                  playClickSound();
                  onLogout();
                }}
                className="p-2 rounded bg-[#18110c] border border-[#3e2c1e] text-stone-400 hover:text-rose-400 hover:border-rose-700/60 transition-colors retro-button-press focus:outline-none"
                aria-label="Log out of adventurer guild"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                playClickSound();
                onNavigate('auth');
              }}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-amber-950 font-pixel font-bold text-xs rounded border border-yellow-200 retro-button-press"
            >
              Log In
            </button>
          )}

          {/* Reset / Demo seed button */}
          <button
            onClick={() => {
              if (window.confirm('Reset local RPG progress back to initial default quest log?')) {
                onResetData();
              }
            }}
            className="p-2 rounded bg-[#18110c] border border-[#3e2c1e] text-stone-500 hover:text-amber-400 transition-colors retro-button-press focus:outline-none"
            title="Reset scaffold demo data"
            aria-label="Reset local demo data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
