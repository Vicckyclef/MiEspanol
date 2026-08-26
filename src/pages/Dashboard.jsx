import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { CATEGORIES, LESSONS } from '../data/spanishData';
import {
  Flame,
  Zap,
  CheckCircle2,
  Trophy,
  Play,
  ArrowRight,
  Sparkles,
  BookOpen,
  Compass,
  MessageSquare,
  Award,
  CircleDot
} from 'lucide-react';

export const Dashboard = () => {
  const { user, level, currentLevelXp, xpForNextLevel } = useUser();

  // Determine recommended next lesson
  const uncompletedLesson = LESSONS.find((l) => !user.completedLessons.includes(l.id)) || LESSONS[0];
  const recommendedCategory = CATEGORIES.find((c) => c.id === uncompletedLesson.categoryId) || CATEGORIES[0];

  const dailyProgressPercent = Math.min(
    100,
    Math.round(((user.todayXp || 0) / (user.dailyGoalXp || 50)) * 100)
  );

  const dailyTasks = [
    { id: 'task-1', title: 'Learn or Review 5 Flashcards', xp: 15, link: '/practice' },
    { id: 'task-2', title: `Complete Next Lesson: ${uncompletedLesson.title}`, xp: 50, link: `/lesson/${uncompletedLesson.id}` },
    { id: 'task-3', title: 'Play a Word Match Game round', xp: 20, link: '/practice' },
    { id: 'task-4', title: 'Practice a simulated Spanish dialogue', xp: 30, link: '/conversations' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/10 skew-x-12 transform translate-x-12 hidden md:block" />
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-black text-white uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" /> ¡Bienvenido de nuevo, {user.name || 'Estudiante'}!
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Ready for your Spanish boost?
          </h1>
          <p className="text-white/90 text-sm sm:text-base font-medium">
            You are on <span className="font-extrabold text-white">Level {level}</span> with <span className="font-extrabold text-white">{user.xp} total XP</span>. Keep your {user.streak}-day streak burning!
          </p>
        </div>
      </div>

      {/* Core Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold shrink-0 border border-amber-200/70">
            <Flame className="w-6 h-6 fill-amber-500" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Streak</span>
            <p className="text-2xl font-black text-slate-800">{user.streak} Days</p>
          </div>
        </div>

        {/* Total XP */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center font-bold shrink-0 border border-indigo-200/70">
            <Zap className="w-6 h-6 fill-indigo-500" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total XP</span>
            <p className="text-2xl font-black text-slate-800">{user.xp} XP</p>
          </div>
        </div>

        {/* Lessons Completed */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center font-bold shrink-0 border border-emerald-200/70">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Completed</span>
            <p className="text-2xl font-black text-slate-800">{user.completedLessons.length} Lessons</p>
          </div>
        </div>

        {/* Current Level */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold shrink-0 border border-purple-200/70">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Rank</span>
            <p className="text-2xl font-black text-slate-800">Level {level}</p>
          </div>
        </div>
      </div>

      {/* Main Row: Recommended Next Lesson & Daily Progress */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recommended Next Lesson (Takes 2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                Recommended Next Step ({recommendedCategory.levelLabel || 'A1'})
              </span>
              <span className="text-xs font-bold text-slate-400">
                +{uncompletedLesson.xpReward} XP Reward
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              {uncompletedLesson.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium mt-2">
              {uncompletedLesson.subtitle}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Category: {recommendedCategory.title}</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
              Includes Vocabulary Cards, Flashcards, Sentence Tasks & Quiz
            </div>
            <Link
              to={`/lesson/${uncompletedLesson.id}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" /> Continue Learning
            </Link>
          </div>
        </div>

        {/* Daily Goal Progress Bar Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                Daily Goal
              </span>
              <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>

            <h3 className="text-xl font-black mb-1">Daily XP Progress</h3>
            <p className="text-xs text-slate-400 mb-6 font-medium">
              Earn {user.dailyGoalXp || 50} XP today to keep your streak alive!
            </p>

            {/* Progress bar */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs font-extrabold text-slate-300">
                <span>Today's Progress</span>
                <span>{user.todayXp || 0} / {user.dailyGoalXp || 50} XP</span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-rose-500 rounded-full transition-all duration-500"
                  style={{ width: `${dailyProgressPercent}%` }}
                />
              </div>
            </div>

            {/* Level up bar */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="flex justify-between text-xs font-extrabold text-slate-400">
                <span>Lvl {level} → Lvl {level + 1}</span>
                <span>{currentLevelXp} / {xpForNextLevel} XP</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${(currentLevelXp / xpForNextLevel) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10">
            <Link
              to="/practice"
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4 text-amber-400" /> Practice Workout Hub
            </Link>
          </div>
        </div>
      </div>

      {/* Daily Tasks & Missions Checklist */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" /> Daily Learning Tasks
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Complete daily tasks to accelerate your Spanish fluency and XP</p>
          </div>
          <span className="text-xs font-extrabold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            Today's Missions
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {dailyTasks.map((task) => (
            <Link
              key={task.id}
              to={task.link}
              className="p-4 rounded-2xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50/30 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-rose-100 group-hover:text-rose-600 flex items-center justify-center font-bold text-xs transition-colors shrink-0">
                  <CircleDot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-sm group-hover:text-rose-600 transition-colors">
                    {task.title}
                  </h4>
                  <span className="text-[11px] font-bold text-amber-600">+{task.xp} XP Reward</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Learning Shortcuts */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link
          to="/categories"
          className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-rose-300 shadow-2xs hover:shadow-md transition-all flex items-center gap-4 group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-black shrink-0 group-hover:scale-105 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-800 group-hover:text-rose-600 transition-colors">
              Curriculum (A1–B2)
            </h4>
            <p className="text-xs text-slate-500 font-medium">Browse Beginner to Pro topics</p>
          </div>
        </Link>

        <Link
          to="/conversations"
          className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-pink-300 shadow-2xs hover:shadow-md transition-all flex items-center gap-4 group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center font-black shrink-0 group-hover:scale-105 transition-transform">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-800 group-hover:text-pink-600 transition-colors">
              Simulated Dialogues
            </h4>
            <p className="text-xs text-slate-500 font-medium">Practice real-life roleplay</p>
          </div>
        </Link>

        <Link
          to="/progress"
          className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-purple-300 shadow-2xs hover:shadow-md transition-all flex items-center gap-4 group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black shrink-0 group-hover:scale-105 transition-transform">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-800 group-hover:text-purple-600 transition-colors">
              Progress & Badges
            </h4>
            <p className="text-xs text-slate-500 font-medium">Track vocabulary & unlocked badges</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
