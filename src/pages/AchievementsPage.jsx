import React from 'react';
import { BADGES } from '../data/spanishData';
import { useUser } from '../context/UserContext';
import {
  Flame,
  Book,
  MessageCircle,
  Trophy,
  Zap,
  Lock,
  CheckCircle2,
  Award
} from 'lucide-react';

const BADGE_ICON_MAP = {
  Flame: Flame,
  Book: Book,
  MessageCircle: MessageCircle,
  Trophy: Trophy,
  Zap: Zap,
};

export const AchievementsPage = () => {
  const { user } = useUser();

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 font-bold text-xs uppercase tracking-wider mb-2">
          <Award className="w-3.5 h-3.5 text-purple-500" /> Trophies & Milestones
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Achievements & Badges
        </h1>
        <p className="text-slate-600 font-medium text-sm sm:text-base">
          Earn XP, complete lessons, and keep your daily streak to unlock badges!
        </p>
      </div>

      {/* Badges Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {BADGES.map((badge) => {
          const isUnlocked = user.unlockedBadges.includes(badge.id);
          const Icon = BADGE_ICON_MAP[badge.icon] || Award;
          const unlockDate = user.badgeUnlockDates?.[badge.id];

          return (
            <div
              key={badge.id}
              className={`rounded-3xl border p-6 transition-all relative flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                  : 'bg-slate-50/70 border-slate-200 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md ${
                      isUnlocked ? badge.color : 'bg-slate-300'
                    }`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  {isUnlocked ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                      <Lock className="w-3.5 h-3.5" /> Locked
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-extrabold text-slate-800 tracking-tight mb-1">
                  {badge.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {badge.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-400">
                {isUnlocked ? (
                  <span>Unlocked on {unlockDate || 'Recently'}</span>
                ) : (
                  <span>Keep practicing to unlock!</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
