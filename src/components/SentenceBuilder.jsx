import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { LESSONS } from '../data/spanishData';
import { useUser } from '../context/UserContext';
import confetti from 'canvas-confetti';

export const SentenceBuilder = ({ initialLessonIndex = 0 }) => {
  const { speakText, addXp } = useUser();
  const validLessonsWithTasks = LESSONS.filter(l => l.sentenceTask);

  const [currentIndex, setCurrentIndex] = useState(initialLessonIndex);
  const currentLesson = validLessonsWithTasks[currentIndex] || validLessonsWithTasks[0];
  const task = currentLesson.sentenceTask;

  const getInitialWordPool = (lessonTask) => {
    if (!lessonTask) return [];
    const shuffled = [...lessonTask.words].sort(() => 0.5 - Math.random());
    return shuffled.map((w, idx) => ({ id: `word-${idx}-${w}`, text: w }));
  };

  const [availableWords, setAvailableWords] = useState(() => getInitialWordPool(task));
  const [selectedWords, setSelectedWords] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelectWord = (wordObj) => {
    if (submitted) return;
    setAvailableWords(prev => prev.filter(w => w.id !== wordObj.id));
    setSelectedWords(prev => [...prev, wordObj]);
  };

  const handleDeselectWord = (wordObj) => {
    if (submitted) return;
    setSelectedWords(prev => prev.filter(w => w.id !== wordObj.id));
    setAvailableWords(prev => [...prev, wordObj]);
  };

  const handleReset = () => {
    if (task) {
      setAvailableWords(getInitialWordPool(task));
      setSelectedWords([]);
      setSubmitted(false);
      setIsCorrect(false);
    }
  };

  const handleCheck = () => {
    if (selectedWords.length === 0) return;
    const userSentence = selectedWords.map(w => w.text).join(' ');
    const targetSentence = task.correctOrder.join(' ');

    const correct = userSentence.trim() === targetSentence.trim();
    setIsCorrect(correct);
    setSubmitted(true);

    if (correct) {
      addXp(20);
      speakText(targetSentence);
      try {
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 } });
      } catch {
        // ignore
      }
    }
  };

  const handleNext = () => {
    const nextIdx = currentIndex + 1 < validLessonsWithTasks.length ? currentIndex + 1 : 0;
    setCurrentIndex(nextIdx);
    const nextTask = validLessonsWithTasks[nextIdx]?.sentenceTask;
    setAvailableWords(getInitialWordPool(nextTask));
    setSelectedWords([]);
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            Sentence Builder Task
          </span>
          <h3 className="text-2xl font-black text-slate-800 tracking-tight mt-2">
            Build the Correct Sentence
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Lesson: {currentLesson.title} ({currentIndex + 1} of {validLessonsWithTasks.length})
          </p>
        </div>

        <button
          onClick={handleReset}
          className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          title="Reset Words"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Prompt */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
          Task Prompt:
        </span>
        <p className="text-base sm:text-lg font-extrabold text-slate-800">
          {task.prompt}
        </p>
      </div>

      {/* Drop / Construction Area */}
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Your Sentence (Tap word to remove):
        </span>
        <div className="min-h-16 p-4 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 flex flex-wrap items-center gap-2">
          {selectedWords.length === 0 ? (
            <span className="text-xs text-slate-400 font-medium italic">
              Tap words below to arrange your sentence in proper grammatical order...
            </span>
          ) : (
            selectedWords.map((word) => (
              <button
                key={word.id}
                onClick={() => handleDeselectWord(word)}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xs transition-all animate-fade-in cursor-pointer"
              >
                {word.text}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Available Word Pool */}
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Available Words:
        </span>
        <div className="flex flex-wrap gap-2">
          {availableWords.map((word) => (
            <button
              key={word.id}
              onClick={() => handleSelectWord(word)}
              className="px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-white hover:border-rose-400 hover:bg-rose-50/40 text-slate-800 font-extrabold text-sm transition-all shadow-2xs cursor-pointer"
            >
              {word.text}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Banner */}
      {submitted && (
        <div
          className={`p-4 rounded-2xl border flex items-start gap-3 animate-fade-in ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {isCorrect ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <h4 className="font-extrabold text-base">
              {isCorrect ? '¡Excelente! Correct sentence (+20 XP)' : 'Not quite right yet'}
            </h4>
            {!isCorrect && (
              <p className="text-sm font-medium">
                Correct order: <strong>"{task.correctOrder.join(' ')}"</strong>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-2">
        {!submitted ? (
          <button
            onClick={handleCheck}
            disabled={selectedWords.length === 0}
            className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-base shadow-md disabled:opacity-50 transition-all cursor-pointer"
          >
            Check Sentence
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Next Sentence Task <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
