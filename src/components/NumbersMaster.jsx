import React, { useState } from 'react';
import { Volume2, RefreshCw, CheckCircle2, XCircle, Calculator } from 'lucide-react';
import { numberToSpanish, generateRandomNumberQuiz } from '../utils/spanishNumbers';
import { useUser } from '../context/UserContext';

export const NumbersMaster = () => {
  const { speakText, addXp } = useUser();

  // Converter State
  const [inputNum, setInputNum] = useState(1234567);
  const spanishResult = numberToSpanish(inputNum);

  // Quiz Mode State
  const [quiz, setQuiz] = useState(generateRandomNumberQuiz);
  const [selectedOption, setSelectedOption] = useState('');
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizIsCorrect, setQuizIsCorrect] = useState(false);

  const presets = [
    { label: '0', value: 0 },
    { label: '7', value: 7 },
    { label: '16', value: 16 },
    { label: '25', value: 25 },
    { label: '99', value: 99 },
    { label: '100', value: 100 },
    { label: '250', value: 250 },
    { label: '1,500', value: 1500 },
    { label: '2,026', value: 2026 },
    { label: '1,000,000', value: 1000000 },
    { label: '1,000,000,000', value: 1000000000 },
    { label: '1,000,000,000,000 (Trillion)', value: 1000000000000 },
  ];

  const handleCheckQuiz = () => {
    if (!selectedOption) return;
    const isCorrect = selectedOption === quiz.answer;
    setQuizIsCorrect(isCorrect);
    setQuizSubmitted(true);
    if (isCorrect) {
      addXp(15);
      speakText(quiz.answer);
    }
  };

  const handleNextQuiz = () => {
    setQuiz(generateRandomNumberQuiz());
    setSelectedOption('');
    setQuizSubmitted(false);
    setQuizIsCorrect(false);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Tool Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider w-fit mb-3">
          <Calculator className="w-4 h-4" /> Spanish Numbers Engine
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
          Master Numbers: 1 to Trillions!
        </h2>
        <p className="text-white/90 text-sm font-medium mt-1">
          Type any number (or select a preset) to instantly convert it into proper Spanish words with voice audio.
        </p>
      </div>

      {/* Interactive Number Converter */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Enter Any Number (0 to 1,000,000,000,000+):
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              value={inputNum}
              onChange={(e) => setInputNum(Math.max(0, Math.min(10000000000000, Number(e.target.value) || 0)))}
              className="flex-1 p-4 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-hidden text-2xl font-black text-slate-800"
            />
            <button
              onClick={() => speakText(spanishResult)}
              className="px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold flex items-center gap-2 shadow-md transition-all shrink-0"
            >
              <Volume2 className="w-5 h-5" /> Listen
            </button>
          </div>
        </div>

        {/* Quick Presets */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Quick Number Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.value}
                onClick={() => setInputNum(p.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  inputNum === p.value
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Spanish Translation Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-inner space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
            Spanish Translation for {inputNum.toLocaleString()}:
          </span>
          <p className="text-2xl sm:text-3xl font-black text-white capitalize leading-snug">
            "{spanishResult}"
          </p>
        </div>
      </div>

      {/* Unlimited Random Numbers Quiz Practice */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              Unlimited Workout
            </span>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight mt-1">
              Random Numbers Challenge
            </h3>
          </div>
          <button
            onClick={handleNextQuiz}
            className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            title="Generate New Question"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-xl font-extrabold text-slate-800">{quiz.question}</p>

          <div className="grid sm:grid-cols-2 gap-3">
            {quiz.options.map((option, idx) => {
              let btnStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-700';

              if (selectedOption === option) {
                btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold';
              }

              if (quizSubmitted) {
                if (option === quiz.answer) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold';
                } else if (selectedOption === option && !quizIsCorrect) {
                  btnStyle = 'border-red-500 bg-red-50 text-red-700 line-through';
                } else {
                  btnStyle = 'opacity-50 border-slate-200 bg-slate-50 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={quizSubmitted}
                  onClick={() => setSelectedOption(option)}
                  className={`p-4 rounded-2xl border-2 text-left font-semibold text-sm transition-all ${btnStyle}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {quizSubmitted && (
            <div
              className={`p-4 rounded-2xl border flex items-center gap-3 ${
                quizIsCorrect
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              {quizIsCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 shrink-0" />
              )}
              <div>
                <h4 className="font-extrabold text-sm">
                  {quizIsCorrect ? '¡Excelente! Correct answer (+15 XP)' : 'Incorrect'}
                </h4>
                {!quizIsCorrect && (
                  <p className="text-xs mt-0.5">Correct answer: <strong>{quiz.answer}</strong></p>
                )}
              </div>
            </div>
          )}

          {!quizSubmitted ? (
            <button
              onClick={handleCheckQuiz}
              disabled={!selectedOption}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-md disabled:opacity-50 transition-all"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuiz}
              className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-base shadow-md transition-all"
            >
              Next Number Challenge →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
