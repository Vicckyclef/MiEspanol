import React, { useState } from 'react';
import { VOCABULARY, LESSONS } from '../data/spanishData';
import { Flashcard } from '../components/Flashcard';
import { PronunciationPractice } from '../components/PronunciationPractice';
import { QuizQuestion } from '../components/QuizQuestion';
import { useUser } from '../context/UserContext';
import { Layers, Mic, HelpCircle, Sparkles } from 'lucide-react';

export const PracticePage = () => {
  const { addXp } = useUser();
  const [practiceMode, setPracticeMode] = useState('flashcards'); // 'flashcards' | 'speech' | 'quiz'

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);

  // Speech state
  const [speechIndex, setSpeechIndex] = useState(0);

  // Quiz state
  const allQuestions = LESSONS.flatMap((l) => l.quizQuestions);
  const [quizIndex, setQuizIndex] = useState(0);

  const handleSpeechSuccess = () => {
    addXp(10);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Interactive Practice Hub
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Strengthen Your Spanish Skills
        </h1>
        <p className="text-slate-600 font-medium text-sm sm:text-base">
          Choose a workout mode below to practice flashcards, pronunciation, or custom quizzes.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-3 gap-3 p-1.5 bg-slate-100 rounded-2xl max-w-md mx-auto">
        <button
          onClick={() => setPracticeMode('flashcards')}
          className={`py-3 px-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            practiceMode === 'flashcards'
              ? 'bg-white text-rose-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" /> Flashcards
        </button>
        <button
          onClick={() => setPracticeMode('speech')}
          className={`py-3 px-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            practiceMode === 'speech'
              ? 'bg-white text-rose-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Mic className="w-4 h-4" /> Speech
        </button>
        <button
          onClick={() => setPracticeMode('quiz')}
          className={`py-3 px-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            practiceMode === 'quiz'
              ? 'bg-white text-rose-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> Quiz Mode
        </button>
      </div>

      {/* Practice Display */}
      {practiceMode === 'flashcards' && (
        <div className="py-4">
          <Flashcard
            flashcard={VOCABULARY[flashcardIndex]}
            currentIndex={flashcardIndex}
            totalCards={VOCABULARY.length}
            onNext={() => setFlashcardIndex((prev) => (prev + 1) % VOCABULARY.length)}
            onPrev={() => setFlashcardIndex((prev) => (prev - 1 + VOCABULARY.length) % VOCABULARY.length)}
          />
        </div>
      )}

      {practiceMode === 'speech' && (
        <div className="py-4 space-y-6">
          <PronunciationPractice
            phrase={VOCABULARY[speechIndex]}
            onSuccess={handleSpeechSuccess}
          />
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setSpeechIndex((prev) => (prev - 1 + VOCABULARY.length) % VOCABULARY.length)}
              className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-slate-700 text-xs"
            >
              ← Previous Word
            </button>
            <button
              onClick={() => setSpeechIndex((prev) => (prev + 1) % VOCABULARY.length)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs"
            >
              Next Word →
            </button>
          </div>
        </div>
      )}

      {practiceMode === 'quiz' && (
        <div className="py-4">
          <QuizQuestion
            question={allQuestions[quizIndex]}
            questionIndex={quizIndex}
            totalQuestions={allQuestions.length}
            isLastQuestion={quizIndex === allQuestions.length - 1}
            onAnswer={() => {
              addXp(15);
              setQuizIndex((prev) => (prev + 1) % allQuestions.length);
            }}
          />
        </div>
      )}
    </div>
  );
};
