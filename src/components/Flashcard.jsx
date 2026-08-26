import React, { useState } from 'react';
import { Volume2, RotateCw, ChevronLeft, ChevronRight, Bookmark, Snail } from 'lucide-react';
import { useUser } from '../context/UserContext';

export const Flashcard = ({ flashcard, onNext, onPrev, currentIndex, totalCards }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSlowAudio, setIsSlowAudio] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { speakText } = useUser();

  if (!flashcard) return null;

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAudio = (e) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(flashcard.spanish);
      utterance.lang = 'es-ES';
      utterance.rate = isSlowAudio ? 0.65 : 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      speakText(flashcard.spanish);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full space-y-4">
      {/* Card count indicator & controls */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <span>Card {currentIndex + 1} of {totalCards}</span>
          {flashcard.level && (
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-extrabold text-[10px]">
              {flashcard.level}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Slow audio toggle */}
          <button
            onClick={() => setIsSlowAudio(!isSlowAudio)}
            className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
              isSlowAudio
                ? 'border-amber-400 bg-amber-50 text-amber-700'
                : 'border-slate-200 bg-white text-slate-500 hover:text-slate-800'
            }`}
            title="Toggle Slow Pronunciation"
          >
            <Snail className="w-3.5 h-3.5" />
            <span className="text-[10px]">Slow</span>
          </button>

          {/* Bookmark toggle */}
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              isBookmarked
                ? 'border-amber-400 bg-amber-50 text-amber-600'
                : 'border-slate-200 bg-white text-slate-400 hover:text-slate-600'
            }`}
            title="Star / Bookmark word"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Flip Card Container */}
      <div
        onClick={handleCardClick}
        className="w-full h-88 cursor-pointer perspective-1000 group relative select-none"
      >
        <div
          className={`w-full h-full duration-500 rounded-3xl transform-style-3d relative transition-transform shadow-xl ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Side (Spanish) */}
          <div className="absolute inset-0 w-full h-full bg-white border-2 border-slate-200 rounded-3xl p-8 flex flex-col justify-between items-center text-center backface-hidden shadow-xs hover:border-rose-300 transition-colors">
            <div className="w-full flex justify-between items-center">
              <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                {flashcard.partOfSpeech || 'Spanish'}
              </span>
              <button
                onClick={handleAudio}
                className="p-3 rounded-full bg-slate-100 hover:bg-rose-100 hover:text-rose-600 transition-all text-slate-600 shadow-2xs hover:scale-105 cursor-pointer"
                title="Listen to pronunciation"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="my-auto space-y-2">
              <h2 className="text-4xl font-black text-slate-800 tracking-tight">
                {flashcard.spanish}
              </h2>
              {flashcard.phonetic && (
                <p className="text-sm font-mono text-slate-400">[{flashcard.phonetic}]</p>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-rose-600 transition-colors">
              <RotateCw className="w-4 h-4" />
              <span>Tap to reveal English translation</span>
            </div>
          </div>

          {/* Back Side (English Translation & Context) */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-rose-600 via-rose-500 to-amber-600 rounded-3xl p-8 text-white flex flex-col justify-between items-center text-center rotate-y-180 backface-hidden shadow-xl">
            <div className="w-full text-left">
              <span className="text-xs font-extrabold uppercase tracking-widest text-white/90 bg-white/20 px-3 py-1 rounded-full">
                English Meaning
              </span>
            </div>

            <div className="my-auto space-y-4">
              <h2 className="text-3xl font-extrabold tracking-tight">
                {flashcard.english}
              </h2>
              {flashcard.example && (
                <div className="bg-black/25 backdrop-blur-xs p-3.5 rounded-2xl text-xs sm:text-sm font-medium border border-white/15 text-left space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-300 block">Example in context:</span>
                  <p className="italic font-bold text-white">"{flashcard.example}"</p>
                  {flashcard.exampleEnglish && (
                    <p className="text-white/80 text-xs">({flashcard.exampleEnglish})</p>
                  )}
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
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          onClick={() => {
            setIsFlipped(false);
            onPrev();
          }}
          disabled={currentIndex === 0}
          className="flex-1 py-3 px-4 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm shadow-xs cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        <button
          onClick={() => {
            setIsFlipped(false);
            onNext();
          }}
          disabled={currentIndex === totalCards - 1}
          className="flex-1 py-3 px-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm shadow-xs cursor-pointer"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
