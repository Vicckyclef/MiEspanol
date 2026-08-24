import React, { useState } from 'react';
import { Volume2, CheckCircle2, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { useUser } from '../context/UserContext';

export const VocabularyCard = ({ vocab, onMarkLearned, isLearned }) => {
  const { speakText } = useUser();
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="inline-block px-2.5 py-0.5 text-xs font-semibold text-rose-600 bg-rose-50 rounded-full mb-2">
              Spanish
            </span>
            <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
              {vocab.spanish}
              <button
                onClick={() => speakText(vocab.spanish)}
                className="p-2 rounded-full bg-slate-100 hover:bg-rose-100 hover:text-rose-600 transition-colors text-slate-600"
                title="Listen pronunciation"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </h3>
            {vocab.phonetic && (
              <p className="text-xs font-mono text-slate-400 mt-0.5">[{vocab.phonetic}]</p>
            )}
          </div>
          {isLearned && (
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" /> Learned
            </span>
          )}
        </div>

        {/* Translation reveal block */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          {showTranslation ? (
            <div className="animate-fade-in space-y-2">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">English</span>
                <p className="text-lg font-bold text-slate-700">{vocab.english}</p>
              </div>
              {vocab.example && (
                <div className="bg-slate-50 p-3 rounded-xl text-sm border border-slate-100 mt-2">
                  <span className="text-xs font-bold text-slate-400 block mb-1">Example Sentence:</span>
                  <p className="font-semibold text-slate-700 italic">"{vocab.example}"</p>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowTranslation(true)}
              className="w-full py-3 bg-slate-50 hover:bg-slate-100 border border-dashed border-slate-300 rounded-xl font-bold text-slate-600 text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Eye className="w-4 h-4 text-slate-400" />
              Reveal Translation & Example
            </button>
          )}
        </div>
      </div>

      {!isLearned && onMarkLearned && (
        <div className="mt-6">
          <button
            onClick={() => onMarkLearned(vocab.id)}
            className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            Mark as Learned (+10 XP)
          </button>
        </div>
      )}
    </div>
  );
};
