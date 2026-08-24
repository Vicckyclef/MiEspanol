import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  MessageSquare,
  Volume2,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Flame,
  BookOpen,
  Zap,
  Play
} from 'lucide-react';
import { CATEGORIES } from '../data/spanishData';

export const LandingPage = () => {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:py-24">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-bold text-xs uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4" /> Game-like Spanish Learning
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
            Learn Spanish, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-rose-600 via-amber-500 to-rose-500 bg-clip-text text-transparent">
              One Conversation
            </span>{' '}
            at a Time.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Master real-world vocabulary, essential grammar, natural pronunciation, and practical daily dialogues in an interactive, bite-sized format.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-base shadow-lg shadow-rose-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Start Learning Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/categories"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border-2 border-slate-200 transition-all flex items-center justify-center gap-2"
            >
              Explore Lessons <BookOpen className="w-5 h-5 text-rose-500" />
            </Link>
          </div>

          {/* Key Feature Stats Pills */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-slate-600 text-sm font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>30+ Vocabulary Master Cards</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Audio Speech Recognition</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Interactive AI Tutor Chat</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Feature Demo Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
                Interactive Learning Engine
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-snug">
                Designed for speed, fun & retention.
              </h2>
              <p className="text-slate-300 font-medium leading-relaxed">
                Forget traditional textbook boring repetition. Practice real dialogues, test your knowledge with dynamic quizzes, flip interactive 3D flashcards, and get instant pronunciation feedback.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <Flame className="w-6 h-6 text-amber-400 mb-2" />
                  <h4 className="font-extrabold text-white text-base">Daily Streaks</h4>
                  <p className="text-xs text-slate-400 mt-1">Build daily habits with motivating streak multipliers.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <Trophy className="w-6 h-6 text-indigo-400 mb-2" />
                  <h4 className="font-extrabold text-white text-base">XP & Level Ups</h4>
                  <p className="text-xs text-slate-400 mt-1">Earn points and unlock dynamic achievement badges.</p>
                </div>
              </div>
            </div>

            {/* Simulated Live UI Preview */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-2xl shadow-xl space-y-4 text-slate-900">
              <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">Spanish Phrase</span>
                  <p className="text-xl font-black text-slate-800">¡Mucho gusto en conocerte!</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">Nice to meet you!</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <Volume2 className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white/90 rounded-xl p-4 shadow-sm space-y-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">Quiz Practice</span>
                <p className="text-sm font-extrabold text-slate-800">How do you say "Good morning"?</p>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center justify-between">
                    <span>Buenos días</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200">
                    Buenas noches
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Grid Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Explore Top Learning Categories</h2>
          <p className="text-slate-600 font-medium mt-2">Bite-sized modules designed for beginner & intermediate mastery.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.slice(0, 4).map((cat) => (
            <Link
              key={cat.id}
              to="/categories"
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all group hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${cat.color} text-white flex items-center justify-center font-black text-xl shadow-md mb-4`}>
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-800 group-hover:text-rose-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2">{cat.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-rose-600">
                <span>{cat.lessonsCount} Lessons</span>
                <span>Start →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-rose-600 to-amber-500 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Ready to Speak Spanish Confidently?
          </h2>
          <p className="text-white/90 font-medium max-w-xl mx-auto mb-8 text-base sm:text-lg">
            Join thousands of learners mastering everyday conversations step by step.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-base shadow-lg transition-all"
          >
            Launch Dashboard <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};
