import React, { useState } from 'react';
import { Volume2, CheckCircle2, Eye, Sparkles } from 'lucide-react';
import { useUser } from '../context/UserContext';

export const VocabularyCard = ({ vocab, onMarkLearned, isLearned }) => {
  const { speakText } = useUser();
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-all relative flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 rounded-full mb-2 border border-rose-100">
              {vocab.partOfSpeech || 'Spanish'}
            </span>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
              {vocab.spanish}
              <button
                onClick={() => speakText(vocab.spanish)}
                className="p-2 rounded-full bg-slate-100 hover:bg-rose-100 hover:text-rose-600 transition-all text-slate-600 shadow-2xs hover:scale-105 cursor-pointer"
                title="Listen pronunciation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </h3>
            {vocab.phonetic && (
              <p className="text-xs font-mono text-slate-400 mt-0.5">[{vocab.phonetic}]</p>
            )}
          </div>
          {isLearned && (
            <span className="flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" /> Mastered
            </span>
          )}
        </div>

        {/* Translation reveal block */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          {showTranslation ? (
            <div className="animate-fade-in space-y-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">English Meaning:</span>
                <p className="text-base font-extrabold text-slate-800">{vocab.english}</p>
              </div>
              {vocab.example && (
                <div className="bg-slate-50 p-3.5 rounded-2xl text-xs border border-slate-200/70 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Example:</span>
                  <p className="font-bold text-slate-800 italic">"{vocab.example}"</p>
                  {vocab.exampleEnglish && (
                    <p className="text-slate-500 text-[11px]">({vocab.exampleEnglish})</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowTranslation(true)}
              className="w-full py-3 bg-slate-50 hover:bg-slate-100/80 border border-dashed border-slate-300 rounded-2xl font-bold text-slate-600 text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              Reveal Meaning & Example
            </button>
          )}
        </div>
      </div>

      {!isLearned && onMarkLearned && (
        <div className="mt-6 pt-2">
          <button
            onClick={() => onMarkLearned(vocab.id)}
            className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-xl text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Mark as Mastered (+10 XP)
          </button>
        </div>
      )}
    </div>
  );
};
