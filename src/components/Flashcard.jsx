import React, { useState } from 'react';
import { Volume2, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { useUser } from '../context/UserContext';

export const Flashcard = ({ flashcard, onNext, onPrev, currentIndex, totalCards }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { speakText } = useUser();

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="max-w-md mx-auto w-full">
      {/* Card count indicator */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
        <span>Flashcard Practice</span>
        <span>{currentIndex + 1} of {totalCards}</span>
      </div>

      {/* Flip Card Container */}
      <div
        onClick={handleCardClick}
        className="w-full h-80 cursor-pointer perspective-1000 group relative"
      >
        <div
          className={`w-full h-full duration-500 rounded-3xl transform-style-3d relative transition-transform shadow-xl ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Side (Spanish) */}
          <div className="absolute inset-0 w-full h-full bg-white border-2 border-slate-200 rounded-3xl p-8 flex flex-col justify-between items-center text-center backface-hidden select-none">
            <div className="w-full flex justify-between items-center">
              <span className="text-xs font-extrabold uppercase tracking-widest text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
                Spanish
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakText(flashcard.spanish);
                }}
                className="p-2.5 rounded-full bg-slate-100 hover:bg-rose-100 hover:text-rose-600 transition-colors text-slate-600"
                title="Listen"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="my-auto">
              <h2 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
                {flashcard.spanish}
              </h2>
              {flashcard.phonetic && (
                <p className="text-sm font-mono text-slate-400">[{flashcard.phonetic}]</p>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-rose-500 transition-colors">
              <RotateCw className="w-4 h-4" />
              <span>Tap card to flip</span>
            </div>
          </div>

          {/* Back Side (English) */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-rose-600 to-amber-600 rounded-3xl p-8 text-white flex flex-col justify-between items-center text-center rotate-y-180 backface-hidden select-none shadow-xl">
            <div className="w-full text-left">
              <span className="text-xs font-extrabold uppercase tracking-widest text-white/80 bg-white/20 px-3 py-1 rounded-full">
                English Translation
              </span>
            </div>

            <div className="my-auto">
              <h2 className="text-3xl font-extrabold tracking-tight mb-3">
                {flashcard.english}
              </h2>
              {flashcard.example && (
                <div className="bg-black/20 backdrop-blur-xs p-3.5 rounded-2xl text-sm font-medium border border-white/10 italic">
                  "{flashcard.example}"
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-white/80">
              <RotateCw className="w-4 h-4" />
              <span>Tap card to flip back</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 mt-6">
        <button
          onClick={() => {
            setIsFlipped(false);
            onPrev();
          }}
          disabled={currentIndex === 0}
          className="flex-1 py-3 px-4 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        <button
          onClick={() => {
            setIsFlipped(false);
            onNext();
          }}
          disabled={currentIndex === totalCards - 1}
          className="flex-1 py-3 px-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm shadow-xs"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
