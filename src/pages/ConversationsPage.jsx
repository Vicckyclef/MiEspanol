import React, { useState } from 'react';
import { CONVERSATION_SCENARIOS } from '../data/spanishData';
import { ConversationChat } from '../components/ConversationChat';
import { MessageSquare, Sparkles, UserPlus, Coffee, MapPin, Award } from 'lucide-react';

const ICON_MAP = {
  UserPlus: UserPlus,
  Coffee: Coffee,
  MapPin: MapPin,
  Award: Award,
};

export const ConversationsPage = () => {
  const [selectedScenario, setSelectedScenario] = useState(CONVERSATION_SCENARIOS[0]);

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 font-extrabold text-xs uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" /> Simulated Native Dialogues
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Spanish Conversation Practice
        </h1>
        <p className="text-slate-600 font-medium text-sm sm:text-base max-w-xl mx-auto">
          Practice real-life conversational scenarios with audio pronunciation, guided options, or custom Spanish text input.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        {/* Scenario Selection Sidebar */}
        <div className="space-y-3 lg:col-span-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1">
            Choose Scenario:
          </span>
          {CONVERSATION_SCENARIOS.map((scen) => {
            const Icon = ICON_MAP[scen.icon] || MessageSquare;
            const isSelected = selectedScenario.id === scen.id;

            return (
              <button
                key={scen.id}
                onClick={() => setSelectedScenario(scen)}
                className={`w-full text-left p-4 rounded-3xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                  isSelected
                    ? 'bg-rose-600 text-white border-rose-600 shadow-md scale-101'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-rose-50 text-rose-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h3 className="font-black text-sm truncate">{scen.title}</h3>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full shrink-0 ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {scen.level || 'Practice'}
                    </span>
                  </div>
                  <p
                    className={`text-xs font-medium line-clamp-2 ${
                      isSelected ? 'text-white/80' : 'text-slate-500'
                    }`}
                  >
                    {scen.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Conversation Simulator Window */}
        <div className="lg:col-span-2">
          <ConversationChat key={selectedScenario.id} scenario={selectedScenario} />
        </div>
      </div>
    </div>
  );
};
