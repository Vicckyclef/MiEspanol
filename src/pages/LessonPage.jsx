import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { LESSONS, VOCABULARY, CATEGORIES } from '../data/spanishData';
import { useUser } from '../context/UserContext';
import { VocabularyCard } from '../components/VocabularyCard';
import { Flashcard } from '../components/Flashcard';
import { QuizQuestion } from '../components/QuizQuestion';
import { SentenceBuilder } from '../components/SentenceBuilder';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Trophy,
  Zap,
  RotateCcw,
  BookOpen,
  HelpCircle,
  Layers,
  ListOrdered
} from 'lucide-react';

export const LessonPage = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { completeLesson, markVocabLearned } = useUser();

  const lesson = LESSONS.find((l) => l.id === lessonId) || LESSONS[0];
  const category = CATEGORIES.find((c) => c.id === lesson.categoryId) || CATEGORIES[0];
  const lessonVocab = VOCABULARY.filter((v) => (lesson.vocabIds || []).includes(v.id));

  const [activeStep, setActiveStep] = useState('vocab'); // 'vocab' | 'flashcards' | 'sentence' | 'quiz' | 'complete'
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const handleQuizAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1);
    }

    if (quizIndex + 1 < lesson.quizQuestions.length) {
      setQuizIndex((prev) => prev + 1);
    } else {
      // Quiz finished!
      const finalScore = Math.round(
        ((correctAnswersCount + (isCorrect ? 1 : 0)) / lesson.quizQuestions.length) * 100
      );

      completeLesson(lesson.id, finalScore, lesson.vocabIds);
      setActiveStep('complete');

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // fallback ignore
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/categories"
          className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Curriculum
        </Link>
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          Lesson Mode: {category.levelLabel || 'A1'}
        </div>
      </div>

      {/* Lesson Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
        <span className="text-xs uppercase font-extrabold tracking-wider bg-white/20 px-3 py-1 rounded-full">
          {category.title}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mt-2">{lesson.title}</h1>
        <p className="text-white/90 font-medium text-sm sm:text-base mt-1">{lesson.subtitle}</p>
      </div>

      {/* Step Navigation Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto text-xs font-black">
        <button
          onClick={() => setActiveStep('vocab')}
          className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeStep === 'vocab'
              ? 'border-rose-600 text-rose-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" /> 1. Vocabulary ({lessonVocab.length})
        </button>
        <button
          onClick={() => setActiveStep('flashcards')}
          className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeStep === 'flashcards'
              ? 'border-rose-600 text-rose-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" /> 2. Flashcards Drill
        </button>
        {lesson.sentenceTask && (
          <button
            onClick={() => setActiveStep('sentence')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeStep === 'sentence'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ListOrdered className="w-4 h-4" /> 3. Sentence Task
          </button>
        )}
        <button
          onClick={() => setActiveStep('quiz')}
          className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeStep === 'quiz'
              ? 'border-rose-600 text-rose-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> {lesson.sentenceTask ? '4' : '3'}. Mastery Quiz ({lesson.quizQuestions.length})
        </button>
      </div>

      {/* Step 1: Vocab Preview */}
      {activeStep === 'vocab' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {lessonVocab.map((vocab) => (
              <VocabularyCard
                key={vocab.id}
                vocab={vocab}
                isLearned={false}
                onMarkLearned={markVocabLearned}
              />
            ))}
          </div>
          <div className="text-center pt-4">
            <button
              onClick={() => setActiveStep('flashcards')}
              className="px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm transition-all shadow-md cursor-pointer"
            >
              Start Flashcards Drill →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Flashcards */}
      {activeStep === 'flashcards' && (
        <div className="py-4 space-y-6">
          <Flashcard
            flashcard={lessonVocab[flashcardIndex]}
            currentIndex={flashcardIndex}
            totalCards={lessonVocab.length}
            onNext={() => setFlashcardIndex((prev) => Math.min(lessonVocab.length - 1, prev + 1))}
            onPrev={() => setFlashcardIndex((prev) => Math.max(0, prev - 1))}
          />
          <div className="text-center">
            <button
              onClick={() => setActiveStep(lesson.sentenceTask ? 'sentence' : 'quiz')}
              className="px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm transition-all shadow-md cursor-pointer"
            >
              {lesson.sentenceTask ? 'Proceed to Sentence Task →' : 'Take Lesson Quiz →'}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Sentence Task */}
      {activeStep === 'sentence' && lesson.sentenceTask && (
        <div className="py-4 space-y-6">
          <SentenceBuilder initialLessonIndex={LESSONS.findIndex(l => l.id === lesson.id)} />
          <div className="text-center">
            <button
              onClick={() => setActiveStep('quiz')}
              className="px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm transition-all shadow-md cursor-pointer"
            >
              Take Lesson Quiz →
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Quiz */}
      {activeStep === 'quiz' && (
        <div className="py-4">
          <QuizQuestion
            question={lesson.quizQuestions[quizIndex]}
            questionIndex={quizIndex}
            totalQuestions={lesson.quizQuestions.length}
            isLastQuestion={quizIndex === lesson.quizQuestions.length - 1}
            onAnswer={handleQuizAnswer}
          />
        </div>
      )}

      {/* Complete Step */}
      {activeStep === 'complete' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-6 shadow-xl max-w-xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900">¡Felicidades!</h2>
            <p className="text-slate-600 font-medium">You completed {lesson.title}!</p>
          </div>

          {/* XP & Score Summary */}
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800">
              <span className="text-xs uppercase font-bold text-amber-600 block">XP Earned</span>
              <p className="text-2xl font-black flex items-center justify-center gap-1">
                <Zap className="w-5 h-5 fill-amber-500 text-amber-500" /> +50 XP
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800">
              <span className="text-xs uppercase font-bold text-emerald-600 block">Quiz Score</span>
              <p className="text-2xl font-black">
                {Math.round((correctAnswersCount / lesson.quizQuestions.length) * 100)}%
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
            <button
              onClick={() => {
                setQuizIndex(0);
                setCorrectAnswersCount(0);
                setActiveStep('vocab');
              }}
              className="py-3 px-6 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-slate-700 text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Review Lesson Again
            </button>
            <button
              onClick={() => navigate('/categories')}
              className="py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm cursor-pointer"
            >
              Back to Curriculum
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
