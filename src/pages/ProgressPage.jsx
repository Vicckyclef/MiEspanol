import React from 'react';
import { useUser } from '../context/UserContext';
import { VOCABULARY, LESSONS } from '../data/spanishData';
import {
  Trophy,
  Zap,
  Flame,
  BookOpen,
  CheckCircle2,
  Volume2,
  BarChart3,
  Award
} from 'lucide-react';

export const ProgressPage = () => {
  const { user, level, currentLevelXp, xpForNextLevel, speakText } = useUser();

  const learnedWords = VOCABULARY.filter((v) => user.learnedVocabIds.includes(v.id));
  const completionPercent = Math.round(
    (user.completedLessons.length / (LESSONS.length || 1)) * 100
  );

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-xs uppercase tracking-wider mb-2">
          <BarChart3 className="w-3.5 h-3.5 text-indigo-500" /> Performance & Statistics
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Your Spanish Progress
        </h1>
        <p className="text-slate-600 font-medium text-sm sm:text-base">
          Track your learning milestones, total XP earned, and unlocked vocabulary.
        </p>
      </div>

      {/* Main Level Summary Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="grid sm:grid-cols-3 gap-6 items-center">
          <div className="sm:col-span-1 text-center sm:text-left space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Current Rank
            </span>
            <h2 className="text-4xl font-black text-white">Level {level}</h2>
            <p className="text-xs text-slate-400 font-medium">
              Keep completing lessons to unlock Level {level + 1}!
            </p>
          </div>

          <div className="sm:col-span-2 space-y-3 bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="flex justify-between text-xs font-extrabold text-slate-300">
              <span>Level {level} Progress</span>
              <span>{currentLevelXp} / {xpForNextLevel} XP</span>
            </div>
            <div className="w-full h-3.5 bg-white/10 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full transition-all duration-500"
                style={{ width: `${(currentLevelXp / xpForNextLevel) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-medium pt-1">
              <span>Total XP Earned: {user.xp} XP</span>
              <span>{xpForNextLevel - currentLevelXp} XP to next level</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <Flame className="w-6 h-6 text-amber-500 fill-amber-500 mb-2" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Streak</span>
          <p className="text-2xl font-black text-slate-800">{user.streak} Days</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <BookOpen className="w-6 h-6 text-emerald-500 mb-2" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Words Learned</span>
          <p className="text-2xl font-black text-slate-800">{user.learnedVocabIds.length}</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <CheckCircle2 className="w-6 h-6 text-rose-500 mb-2" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Lessons Completed</span>
          <p className="text-2xl font-black text-slate-800">{user.completedLessons.length}</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <Award className="w-6 h-6 text-purple-500 mb-2" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Badges Earned</span>
          <p className="text-2xl font-black text-slate-800">{user.unlockedBadges.length}</p>
        </div>
      </div>

      {/* Learned Vocabulary Bank */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900">Your Vocabulary Bank</h3>
            <p className="text-xs text-slate-500 mt-0.5">Words you have mastered during your lessons</p>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            {learnedWords.length} Words Unlocked
          </span>
        </div>

        {learnedWords.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {learnedWords.map((word) => (
              <div
                key={word.id}
                className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-100/60 transition-colors flex items-center justify-between"
              >
                <div>
                  <h4 className="font-extrabold text-slate-800 text-sm">{word.spanish}</h4>
                  <p className="text-xs text-slate-500 font-medium">{word.english}</p>
                </div>
                <button
                  onClick={() => speakText(word.spanish)}
                  className="p-2 rounded-full bg-white hover:bg-rose-100 hover:text-rose-600 text-slate-600 shadow-2xs transition-colors"
                  title="Listen"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 border border-dashed border-slate-200 rounded-2xl">
            No vocabulary words learned yet. Complete your first lesson!
          </div>
        )}
      </div>
    </div>
  );
};
