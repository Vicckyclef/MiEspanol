import React, { useState } from 'react';
import { VOCABULARY } from '../data/spanishData';
import { Flashcard } from '../components/Flashcard';
import { WordMatchGame } from '../components/WordMatchGame';
import { SentenceBuilder } from '../components/SentenceBuilder';
import { NumbersMaster } from '../components/NumbersMaster';
import { PronunciationPractice } from '../components/PronunciationPractice';
import { DictionarySearch } from '../components/DictionarySearch';
import { useUser } from '../context/UserContext';
import {
  Layers,
  Gamepad2,
  ListOrdered,
  Calculator,
  Mic,
  Search,
  Sparkles
} from 'lucide-react';

export const PracticePage = () => {
  const { addXp } = useUser();
  const [practiceMode, setPracticeMode] = useState('flashcards'); // 'flashcards' | 'match' | 'sentence' | 'numbers' | 'speech' | 'dictionary'

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardLevel, setFlashcardLevel] = useState('all');

  const filteredVocab = flashcardLevel === 'all'
    ? VOCABULARY
    : VOCABULARY.filter(v => v.level === flashcardLevel);

  // Speech state
  const [speechIndex, setSpeechIndex] = useState(0);

  const handleSpeechSuccess = () => {
    addXp(15);
  };

  const practiceModes = [
    { id: 'flashcards', label: 'Flashcards', icon: Layers, color: 'text-rose-600' },
    { id: 'match', label: 'Word Match Game', icon: Gamepad2, color: 'text-amber-600' },
    { id: 'sentence', label: 'Sentence Builder', icon: ListOrdered, color: 'text-indigo-600' },
    { id: 'numbers', label: 'Numbers (0-1T+)', icon: Calculator, color: 'text-emerald-600' },
    { id: 'speech', label: 'Speech Practice', icon: Mic, color: 'text-purple-600' },
    { id: 'dictionary', label: 'Live Dictionary', icon: Search, color: 'text-cyan-600' },
  ];

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-extrabold text-xs uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Interactive Practice & Task Hub
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Strengthen Your Spanish Skills
        </h1>
        <p className="text-slate-600 font-medium text-sm sm:text-base max-w-xl mx-auto">
          Choose any workout below: interactive flashcards, tile matching, sentence construction, numbers to trillions, or live dictionary search.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/60 text-xs font-black">
        {practiceModes.map((mode) => {
          const Icon = mode.icon;
          const isActive = practiceMode === mode.id;

          return (
            <button
              key={mode.id}
              onClick={() => setPracticeMode(mode.id)}
              className={`py-3 px-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? mode.color : 'text-slate-400'}`} />
              <span className="truncate">{mode.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mode 1: Flashcards */}
      {practiceMode === 'flashcards' && (
        <div className="space-y-4">
          <div className="flex justify-center gap-2">
            {['all', 'beginner', 'intermediate', 'pro'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setFlashcardLevel(lvl);
                  setFlashcardIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                  flashcardLevel === lvl
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {lvl} ({lvl === 'all' ? VOCABULARY.length : VOCABULARY.filter(v => v.level === lvl).length})
              </button>
            ))}
          </div>

          <Flashcard
            flashcard={filteredVocab[flashcardIndex]}
            currentIndex={flashcardIndex}
            totalCards={filteredVocab.length}
            onNext={() => setFlashcardIndex((prev) => (prev + 1) % filteredVocab.length)}
            onPrev={() => setFlashcardIndex((prev) => (prev - 1 + filteredVocab.length) % filteredVocab.length)}
          />
        </div>
      )}

      {/* Mode 2: Word Match Game */}
      {practiceMode === 'match' && (
        <div className="py-2">
          <WordMatchGame />
        </div>
      )}

      {/* Mode 3: Sentence Builder */}
      {practiceMode === 'sentence' && (
        <div className="py-2">
          <SentenceBuilder />
        </div>
      )}

      {/* Mode 4: Numbers Master */}
      {practiceMode === 'numbers' && (
        <div className="py-2">
          <NumbersMaster />
        </div>
      )}

      {/* Mode 5: Speech & Pronunciation */}
      {practiceMode === 'speech' && (
        <div className="py-4 space-y-6">
          <PronunciationPractice
            phrase={VOCABULARY[speechIndex]}
            onSuccess={handleSpeechSuccess}
          />
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setSpeechIndex((prev) => (prev - 1 + VOCABULARY.length) % VOCABULARY.length)}
              className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-slate-700 text-xs shadow-xs cursor-pointer"
            >
              ← Previous Word
            </button>
            <button
              onClick={() => setSpeechIndex((prev) => (prev + 1) % VOCABULARY.length)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-xs cursor-pointer"
            >
              Next Word →
            </button>
          </div>
        </div>
      )}

      {/* Mode 6: Live Dictionary */}
      {practiceMode === 'dictionary' && (
        <div className="py-2">
          <DictionarySearch />
        </div>
      )}
    </div>
  );
};
