import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { useUser } from '../context/UserContext';

export const QuizQuestion = ({ question, onAnswer, isLastQuestion, questionIndex, totalQuestions }) => {
  const { speakText } = useUser();
  const [selectedOption, setSelectedOption] = useState('');
  const [typedAnswer, setTypedAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleCheck = () => {
    let userAnswer = selectedOption;
    if (question.type === 'fill-in-blank') {
      userAnswer = typedAnswer.trim();
    }

    if (!userAnswer) return;

    const correct = userAnswer.toLowerCase() === question.answer.toLowerCase();
    setIsCorrect(correct);
    setSubmitted(true);

    if (correct && question.answer) {
      speakText(question.answer);
    }
  };

  const handleNext = () => {
    onAnswer(isCorrect);
    setSelectedOption('');
    setTypedAnswer('');
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-lg max-w-xl mx-auto">
      {/* Progress header */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Question {questionIndex + 1} of {totalQuestions}
        </span>
        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-rose-500 rounded-full transition-all duration-300"
            style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Heading */}
      <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight mb-6">
        {question.question}
      </h3>

      {/* Multiple Choice Options */}
      {question.type === 'multiple-choice' && (
        <div className="space-y-3 mb-6">
          {question.options.map((option, idx) => {
            let optionStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-700';

            if (selectedOption === option) {
              optionStyle = 'border-rose-500 bg-rose-50 text-rose-700 font-bold';
            }

            if (submitted) {
              if (option.toLowerCase() === question.answer.toLowerCase()) {
                optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold';
              } else if (selectedOption === option && !isCorrect) {
                optionStyle = 'border-red-500 bg-red-50 text-red-700 line-through';
              } else {
                optionStyle = 'opacity-50 border-slate-200 bg-slate-50 text-slate-400';
              }
            }

            return (
              <button
                key={idx}
                disabled={submitted}
                onClick={() => setSelectedOption(option)}
                className={`w-full text-left p-4 rounded-2xl border-2 font-medium transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
              >
                <span className="text-base">{option}</span>
                <span className="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold border-current opacity-70">
                  {String.fromCharCode(65 + idx)}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Fill in the blank option selection or typing */}
      {question.type === 'fill-in-blank' && (
        <div className="mb-6 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-lg font-bold text-center">
            {question.sentence ? (
              <span>{question.sentence}</span>
            ) : (
              <span>Fill in the missing word</span>
            )}
          </div>

          {question.options ? (
            <div className="grid grid-cols-2 gap-3">
              {question.options.map((opt, idx) => {
                let btnStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-700';

                if (typedAnswer === opt) {
                  btnStyle = 'border-rose-500 bg-rose-50 text-rose-700 font-bold';
                }

                if (submitted) {
                  if (opt.toLowerCase() === question.answer.toLowerCase()) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold';
                  } else if (typedAnswer === opt && !isCorrect) {
                    btnStyle = 'border-red-500 bg-red-50 text-red-700';
                  } else {
                    btnStyle = 'opacity-50 border-slate-200 bg-slate-50 text-slate-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={submitted}
                    onClick={() => setTypedAnswer(opt)}
                    className={`p-3 rounded-xl border-2 font-bold text-center transition-all cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          ) : (
            <input
              type="text"
              disabled={submitted}
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              placeholder="Type your answer..."
              className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-rose-500 focus:outline-hidden font-bold text-slate-800 text-center text-lg"
            />
          )}
        </div>
      )}

      {/* Submitted Feedback Banner */}
      {submitted && (
        <div
          className={`p-4 rounded-2xl mb-6 flex items-start gap-3 border ${
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
              {isCorrect ? '¡Excelente! Correct!' : 'Incorrect'}
            </h4>
            {!isCorrect && (
              <p className="text-sm font-medium">
                Correct answer: <strong className="underline">{question.answer}</strong>
              </p>
            )}
            {question.explanation && (
              <p className="text-xs opacity-90">{question.explanation}</p>
            )}
          </div>
        </div>
      )}

      {/* Action Button */}
      {!submitted ? (
        <button
          onClick={handleCheck}
          disabled={question.type === 'fill-in-blank' ? !typedAnswer : !selectedOption}
          className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-base shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          Check Answer
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLastQuestion ? 'Complete Lesson' : 'Continue'} <ArrowRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
