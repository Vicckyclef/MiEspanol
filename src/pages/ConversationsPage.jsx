import React, { useState } from 'react';
import { CONVERSATION_SCENARIOS } from '../data/spanishData';
import { ConversationChat } from '../components/ConversationChat';
import { MessageSquare, Sparkles, UserPlus, Coffee, MapPin } from 'lucide-react';

const ICON_MAP = {
  UserPlus: UserPlus,
  Coffee: Coffee,
  MapPin: MapPin,
};

export const ConversationsPage = () => {
  const [selectedScenario, setSelectedScenario] = useState(CONVERSATION_SCENARIOS[0]);

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 font-bold text-xs uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" /> Simulated AI Tutor Dialogues
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Spanish Conversation Practice
        </h1>
        <p className="text-slate-600 font-medium text-sm sm:text-base max-w-xl mx-auto">
          Practice real-life conversational scenarios with guided options or type custom Spanish responses.
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
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-rose-50 text-rose-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-extrabold text-sm">{scen.title}</h3>
                  </div>
                  <p
                    className={`text-xs mt-1 font-medium line-clamp-2 ${
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
