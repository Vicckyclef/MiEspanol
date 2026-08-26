import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import {
  Flame,
  Zap,
  BookOpen,
  Compass,
  MessageSquare,
  BarChart3,
  Settings,
  Menu,
  X,
  Sliders,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';

export const Navbar = () => {
  const { user, level, updateDailyGoal, updateSettings, resetProgress } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [savedAlert, setSavedAlert] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const location = useLocation();

  // Streamlined 4 Core Navigation Items (eliminates clutter!)
  const navLinks = [
    { name: 'Learn', path: '/categories', icon: BookOpen },
    { name: 'Practice', path: '/practice', icon: Compass },
    { name: 'Conversations', path: '/conversations', icon: MessageSquare },
    { name: 'Progress', path: '/progress', icon: BarChart3 },
  ];

  const handleSaveSettings = (goal, speed) => {
    if (goal) updateDailyGoal(goal);
    if (speed) updateSettings({ ttsSpeed: speed });
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2000);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-sm group-hover:scale-105 transition-transform">
                ¡V!
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg tracking-tight bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
                  ¡Vámonos!
                </span>
                <span className="text-[9px] uppercase font-extrabold text-slate-400 tracking-wider -mt-1">
                  Spanish Mastery
                </span>
              </div>
            </Link>

            {/* Streamlined Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path || (link.path === '/categories' && location.pathname.startsWith('/lesson/'));

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-white text-rose-600 shadow-xs font-extrabold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </NavLink>
                );
              })}
            </nav>

            {/* User Metrics & Quick Settings Pill */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Streak */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200/70 text-amber-800 font-extrabold text-xs shadow-2xs">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{user.streak}d</span>
              </div>

              {/* XP */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200/70 text-indigo-800 font-extrabold text-xs shadow-2xs">
                <Zap className="w-4 h-4 text-indigo-500 fill-indigo-500" />
                <span>{user.xp} XP</span>
              </div>

              {/* Level Badge */}
              <div className="px-2.5 py-1.5 rounded-xl bg-slate-900 text-white font-extrabold text-xs shadow-2xs">
                Lvl {level}
              </div>

              {/* Quick Settings Icon */}
              <button
                onClick={() => setSettingsModalOpen(true)}
                className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Learning Settings & Preferences"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile menu toggle */}
            <div className="flex md:hidden items-center gap-2">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{user.streak}d</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
            <div className="flex items-center justify-around py-2.5 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-1 text-amber-700 font-bold text-xs">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{user.streak} Days Streak</span>
              </div>
              <div className="flex items-center gap-1 text-indigo-700 font-bold text-xs">
                <Zap className="w-4 h-4 text-indigo-500 fill-indigo-500" />
                <span>{user.xp} XP</span>
              </div>
              <div className="bg-slate-900 text-white text-xs font-black px-2.5 py-1 rounded-lg">
                Lvl {level}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl text-sm font-bold transition-colors ${
                      isActive
                        ? 'bg-rose-50 text-rose-600 border border-rose-200'
                        : 'text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-rose-500" />
                    {link.name}
                  </NavLink>
                );
              })}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSettingsModalOpen(true);
              }}
              className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 cursor-pointer"
            >
              <Settings className="w-4 h-4" /> Preferences & Audio Settings
            </button>
          </div>
        )}
      </header>

      {/* Settings Modal Popup */}
      {settingsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <Sliders className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-black text-slate-800">Learning Settings</h3>
              </div>
              <button
                onClick={() => setSettingsModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {savedAlert && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Preference updated!
              </div>
            )}

            {/* Daily Goal */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Daily XP Goal:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[30, 50, 100].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => handleSaveSettings(goal, null)}
                    className={`py-2.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                      user.dailyGoalXp === goal
                        ? 'border-rose-500 bg-rose-50 text-rose-600 shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {goal} XP / day
                  </button>
                ))}
              </div>
            </div>

            {/* Pronunciation Speed */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Audio Pronunciation Speed:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Slow (0.75x)', val: 0.75 },
                  { label: 'Normal (1.0x)', val: 1.0 },
                  { label: 'Fast (1.25x)', val: 1.25 },
                ].map((s) => (
                  <button
                    key={s.val}
                    onClick={() => handleSaveSettings(null, s.val)}
                    className={`py-2.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                      (user.settings?.ttsSpeed || 1) === s.val
                        ? 'border-rose-500 bg-rose-50 text-rose-600 shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Danger reset */}
            <div className="pt-2 border-t border-slate-100">
              {confirmReset ? (
                <div className="space-y-2">
                  <p className="text-xs text-red-600 font-bold">Clear all XP, streak, and lesson data?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        resetProgress();
                        setConfirmReset(false);
                        setSettingsModalOpen(false);
                      }}
                      className="flex-1 py-2 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 cursor-pointer"
                    >
                      Yes, Reset
                    </button>
                    <button
                      onClick={() => setConfirmReset(false)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmReset(true)}
                  className="text-xs font-bold text-slate-400 hover:text-red-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset learning progress data
                </button>
              )}
            </div>

            <button
              onClick={() => setSettingsModalOpen(false)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:justify-between sm:text-left items-center">
        <div>
          <p className="font-extrabold text-slate-200 tracking-tight">¡Vámonos! Spanish Learning</p>
          <p className="text-xs text-slate-400 mt-0.5">
            Beginner-to-Pro interactive curriculum, flashcards, numbers & conversations.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} ¡Vámonos! Spanish. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
