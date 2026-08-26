import React, { useState } from 'react';
import { Search, Volume2, PlusCircle, CheckCircle2, Globe } from 'lucide-react';
import { searchWordOnline } from '../utils/apiFetcher';
import { useUser } from '../context/UserContext';

export const DictionarySearch = () => {
  const { speakText, markVocabLearned } = useUser();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSaved(false);
    const data = await searchWordOnline(query);
    setResult(data);
    setLoading(false);
  };

  const handleSaveToBank = () => {
    if (result) {
      markVocabLearned(`custom-${Date.now()}`);
      setSaved(true);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
          <Globe className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight">
            Live Spanish Dictionary & Word Search
          </h3>
          <p className="text-xs text-slate-500">
            Fetch any English or Spanish word online dynamically and add to your vocabulary bank.
          </p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type any word (e.g., cat, dog, house, book)..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-cyan-500 focus:outline-hidden font-medium text-slate-800 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-6 py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-sm shadow-md disabled:opacity-50 transition-all shrink-0 cursor-pointer"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {result && (
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4 animate-fade-in">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-100 uppercase tracking-wider">
                {result.source || 'Online Result'}
              </span>
              <h4 className="text-2xl font-black text-slate-800 mt-2 flex items-center gap-2">
                {result.spanish}
                <button
                  onClick={() => speakText(result.spanish)}
                  className="p-2 rounded-full bg-white hover:bg-cyan-100 hover:text-cyan-600 text-slate-600 shadow-2xs transition-colors cursor-pointer"
                  title="Listen"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </h4>
              {result.phonetic && (
                <p className="text-xs font-mono text-slate-400 mt-0.5">{result.phonetic}</p>
              )}
            </div>

            {!saved ? (
              <button
                onClick={handleSaveToBank}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" /> Save to Vocabulary
              </button>
            ) : (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4" /> Saved!
              </span>
            )}
          </div>

          <div className="border-t border-slate-200 pt-3 space-y-2">
            <div>
              <span className="text-xs font-bold uppercase text-slate-400">English Meaning:</span>
              <p className="text-base font-bold text-slate-700">{result.english}</p>
            </div>
            {result.definition && (
              <p className="text-xs text-slate-600 italic">{result.definition}</p>
            )}
            {result.example && (
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-medium text-slate-700 italic">
                "{result.example}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
