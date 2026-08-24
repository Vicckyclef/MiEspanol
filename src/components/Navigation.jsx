import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import {
  Flame,
  Zap,
  BookOpen,
  Sparkles,
  MessageSquare,
  BarChart3,
  Award,
  Settings,
  Menu,
  X,
  Compass
} from 'lucide-react';

export const Navbar = () => {
  const { user, level } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: Sparkles },
    { name: 'Learn', path: '/categories', icon: BookOpen },
    { name: 'Practice', path: '/practice', icon: Compass },
    { name: 'Conversations', path: '/conversations', icon: MessageSquare },
    { name: 'Progress', path: '/progress', icon: BarChart3 },
    { name: 'Achievements', path: '/achievements', icon: Award },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              ¡V!
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
                ¡Vámonos!
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider -mt-1">
                Spanish Learning
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-rose-50 text-rose-600'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </NavLink>
              );
            })}
          </nav>

          {/* User Metrics & Level Pill */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-bold text-sm shadow-xs">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{user.streak}</span>
              <span className="text-xs text-amber-600 font-normal">days</span>
            </div>

            {/* XP Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-sm shadow-xs">
              <Zap className="w-4 h-4 text-indigo-500 fill-indigo-500" />
              <span>{user.xp}</span>
              <span className="text-xs text-indigo-600 font-normal">XP</span>
            </div>

            {/* Level Badge */}
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-900 text-white font-extrabold text-xs shadow-xs">
              <span>Lvl {level}</span>
            </div>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{user.streak}</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
          <div className="flex items-center justify-around py-2 border-b border-slate-100 mb-2">
            <div className="flex items-center gap-1 text-amber-700 font-bold text-sm">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{user.streak} Days Streak</span>
            </div>
            <div className="flex items-center gap-1 text-indigo-700 font-bold text-sm">
              <Zap className="w-4 h-4 text-indigo-500 fill-indigo-500" />
              <span>{user.xp} XP</span>
            </div>
            <div className="bg-slate-900 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              Lvl {level}
            </div>
          </div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-semibold ${
                    isActive
                      ? 'bg-rose-50 text-rose-600 font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 text-center sm:flex sm:justify-between sm:text-left">
        <div>
          <p className="font-bold text-slate-200">¡Vámonos! Spanish Learning</p>
          <p className="text-xs text-slate-500 mt-1">
            Learn Spanish interactively, one conversation at a time.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ¡Vámonos! Spanish. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
