import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, LESSONS, LEVELS } from '../data/spanishData';
import { useUser } from '../context/UserContext';
import {
  BookOpen,
  Clock,
  Utensils,
  Compass,
  Users,
  MessageSquare,
  Sparkles,
  Hand,
  Play,
  Calculator,
  Award
} from 'lucide-react';

const ICON_MAP = {
  Hand: Hand,
  Clock: Clock,
  Utensils: Utensils,
  Compass: Compass,
  Users: Users,
  MessageSquare: MessageSquare,
  BookOpen: BookOpen,
  Sparkles: Sparkles,
  Calculator: Calculator,
  Award: Award,
};

export const CategoriesPage = () => {
  const { user } = useUser();
  const [selectedLevel, setSelectedLevel] = useState('all');

  const filteredCategories = selectedLevel === 'all'
    ? CATEGORIES
    : CATEGORIES.filter((c) => c.level === selectedLevel);

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-extrabold text-xs uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" /> Structured Learning Curriculum
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Learn Spanish: Beginner to Pro
        </h1>
        <p className="text-slate-600 font-medium text-sm sm:text-base">
          Choose your level or start with the fundamentals. Step-by-step lessons with vocabulary, flashcards, sentence building, and quizzes.
        </p>
      </div>

      {/* Level Selection Tabs (Beginner -> Intermediate -> Pro) */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 bg-slate-200/70 rounded-2xl gap-1 text-xs font-black shadow-inner max-w-full overflow-x-auto">
          {LEVELS.map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevel(lvl.id)}
              className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                selectedLevel === lvl.id
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => {
          const CategoryIcon = ICON_MAP[cat.icon] || BookOpen;
          const categoryLessons = LESSONS.filter((l) => l.categoryId === cat.id);
          const completedCount = categoryLessons.filter((l) =>
            user.completedLessons.includes(l.id)
          ).length;
          const isCategoryComplete = categoryLessons.length > 0 && completedCount === categoryLessons.length;

          return (
            <div
              key={cat.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-slate-300 relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${cat.color} text-white flex items-center justify-center font-black shadow-sm group-hover:scale-105 transition-transform`}
                  >
                    <CategoryIcon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                    cat.level === 'beginner'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : cat.level === 'intermediate'
                      ? 'bg-sky-50 text-sky-700 border-sky-200'
                      : 'bg-purple-50 text-purple-700 border-purple-200'
                  }`}>
                    {cat.levelLabel}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-800 tracking-tight mb-1.5 group-hover:text-rose-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>Progress</span>
                  <span className={isCategoryComplete ? 'text-emerald-600 font-black' : ''}>
                    {completedCount} / {categoryLessons.length} Lessons {isCategoryComplete && '✓'}
                  </span>
                </div>

                {/* Individual Lesson Links */}
                <div className="space-y-1.5">
                  {categoryLessons.map((lesson, idx) => {
                    const isDone = user.completedLessons.includes(lesson.id);
                    return (
                      <Link
                        key={lesson.id}
                        to={`/lesson/${lesson.id}`}
                        className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                          isDone
                            ? 'bg-emerald-50/60 text-emerald-800 hover:bg-emerald-100/70 border border-emerald-100'
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-extrabold ${
                            isDone ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {isDone ? '✓' : idx + 1}
                          </span>
                          <span className="truncate">{lesson.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold shrink-0">
                          +{lesson.xpReward} XP
                        </span>
                      </Link>
                    );
                  })}
                </div>

                {categoryLessons.length > 0 ? (
                  <Link
                    to={`/lesson/${categoryLessons[0].id}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" /> Start Category
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 text-slate-400 text-xs font-bold cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
