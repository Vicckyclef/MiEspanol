import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, LESSONS } from '../data/spanishData';
import { useUser } from '../context/UserContext';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Utensils,
  Compass,
  Users,
  MessageSquare,
  Sparkles,
  Hand,
  Play
} from 'lucide-react';

const ICON_MAP = {
  HandWave: Hand,
  Clock: Clock,
  Utensils: Utensils,
  Compass: Compass,
  Users: Users,
  MessageSquare: MessageSquare,
  BookOpen: BookOpen,
  Sparkles: Sparkles,
};

export const CategoriesPage = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Spanish Learning Categories
        </h1>
        <p className="text-slate-600 font-medium text-sm sm:text-base">
          Select a category to explore vocabulary, interactive flashcards, and quizzes.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat) => {
          const CategoryIcon = ICON_MAP[cat.icon] || BookOpen;
          const categoryLessons = LESSONS.filter((l) => l.categoryId === cat.id);
          const completedCount = categoryLessons.filter((l) =>
            user.completedLessons.includes(l.id)
          ).length;

          return (
            <div
              key={cat.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${cat.color} text-white flex items-center justify-center font-black text-2xl shadow-md mb-4 group-hover:scale-105 transition-transform`}
                >
                  <CategoryIcon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-extrabold text-slate-800 tracking-tight mb-2">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>Progress</span>
                  <span>{completedCount} / {categoryLessons.length || 1} Lessons</span>
                </div>

                {categoryLessons.length > 0 ? (
                  <Link
                    to={`/lesson/${categoryLessons[0].id}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold transition-colors flex items-center justify-center gap-2"
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
