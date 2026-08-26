import React, { useState, useEffect } from 'react';
import { Trophy, RotateCcw, CheckCircle2, Zap, Timer } from 'lucide-react';
import { VOCABULARY } from '../data/spanishData';
import { useUser } from '../context/UserContext';
import confetti from 'canvas-confetti';

function createDeck(level) {
  const pool = level === 'all'
    ? VOCABULARY
    : VOCABULARY.filter(v => v.level === level);
  
  const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
  const selectedVocab = shuffledPool.slice(0, 6);

  const gameCards = [];
  selectedVocab.forEach((v) => {
    gameCards.push({
      uniqueId: `${v.id}-es`,
      matchId: v.id,
      text: v.spanish,
      lang: 'es',
      phonetic: v.phonetic,
    });
    gameCards.push({
      uniqueId: `${v.id}-en`,
      matchId: v.id,
      text: v.english,
      lang: 'en',
    });
  });

  return gameCards.sort(() => 0.5 - Math.random());
}

export const WordMatchGame = () => {
  const { addXp, speakText } = useUser();
  const [levelFilter, setLevelFilter] = useState('all');
  const [cards, setCards] = useState(() => createDeck('all'));
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);

  const handleLevelChange = (lvl) => {
    setLevelFilter(lvl);
    setCards(createDeck(lvl));
    setSelectedCards([]);
    setMatchedIds([]);
    setMoves(0);
    setScore(0);
    setIsGameOver(false);
    setSeconds(0);
    setTimerActive(true);
  };

  const handleRestart = () => {
    setCards(createDeck(levelFilter));
    setSelectedCards([]);
    setMatchedIds([]);
    setMoves(0);
    setScore(0);
    setIsGameOver(false);
    setSeconds(0);
    setTimerActive(true);
  };

  // Timer tick
  useEffect(() => {
    let interval = null;
    if (timerActive && !isGameOver) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, isGameOver]);

  const handleCardClick = (card) => {
    if (selectedCards.length === 2) return;
    if (matchedIds.includes(card.matchId)) return;
    if (selectedCards.some(c => c.uniqueId === card.uniqueId)) return;

    if (card.lang === 'es') {
      speakText(card.text);
    }

    const nextSelected = [...selectedCards, card];
    setSelectedCards(nextSelected);

    if (nextSelected.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = nextSelected;

      if (first.matchId === second.matchId && first.lang !== second.lang) {
        // MATCH!
        setTimeout(() => {
          const nextMatched = [...matchedIds, first.matchId];
          setMatchedIds(nextMatched);
          setScore(s => s + 20);
          setSelectedCards([]);

          if (nextMatched.length === 6) {
            setIsGameOver(true);
            setTimerActive(false);
            addXp(30);
            try {
              confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
            } catch {
              // ignore
            }
          }
        }, 400);
      } else {
        // NO MATCH
        setTimeout(() => {
          setSelectedCards([]);
        }, 900);
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Zap className="w-3.5 h-3.5" /> Word Match Challenge
          </div>
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">
            Match Spanish & English Pairs
          </h3>
          <p className="text-xs text-slate-500">
            Tap matching Spanish and English words to clear the board.
          </p>
        </div>

        {/* Level selection tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1 text-xs font-bold self-start sm:self-auto">
          {['all', 'beginner', 'intermediate', 'pro'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => handleLevelChange(lvl)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                levelFilter === lvl
                  ? 'bg-white text-rose-600 shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between text-xs font-extrabold text-slate-600 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-1.5 text-amber-700">
          <Trophy className="w-4 h-4 text-amber-500" /> Score: {score} pts
        </div>
        <div className="flex items-center gap-1.5 text-indigo-700">
          <Timer className="w-4 h-4 text-indigo-500" /> Time: {seconds}s
        </div>
        <div>
          Matched: {matchedIds.length} / 6 pairs
        </div>
        <button
          onClick={handleRestart}
          className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          title="Restart Game"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Card Grid (4 cols x 3 rows) */}
      {!isGameOver ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {cards.map((card) => {
            const isSelected = selectedCards.some(c => c.uniqueId === card.uniqueId);
            const isMatched = matchedIds.includes(card.matchId);

            let btnStyle = 'border-slate-200 bg-white hover:border-slate-300 text-slate-800 shadow-2xs hover:shadow-xs';

            if (isSelected) {
              btnStyle = 'border-rose-500 bg-rose-50 text-rose-700 ring-2 ring-rose-500/20 scale-98 font-black';
            }
            if (isMatched) {
              btnStyle = 'border-emerald-200 bg-emerald-50 text-emerald-700 opacity-60 pointer-events-none';
            }

            return (
              <button
                key={card.uniqueId}
                disabled={isMatched}
                onClick={() => handleCardClick(card)}
                className={`h-24 p-3 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer select-none ${btnStyle}`}
              >
                <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 mb-1">
                  {card.lang === 'es' ? '🇪🇸 Spanish' : '🇬🇧 English'}
                </span>
                <span className={`text-sm font-bold leading-tight ${card.lang === 'es' ? 'text-slate-900' : 'text-slate-700'}`}>
                  {card.text}
                </span>
                {isMatched && (
                  <span className="text-[10px] text-emerald-600 font-extrabold mt-1 flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Matched
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        /* Completion Screen */
        <div className="p-8 text-center bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border border-emerald-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-black text-emerald-900">¡Excelente Trabajo!</h4>
          <p className="text-sm font-medium text-emerald-700 max-w-sm mx-auto">
            You cleared all 6 word pairs in {seconds} seconds with {moves} moves (+30 XP)!
          </p>
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Play Another Round
          </button>
        </div>
      )}
    </div>
  );
};
