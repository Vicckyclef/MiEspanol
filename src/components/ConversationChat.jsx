import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Send, RotateCcw, CheckCircle2, Bot, User } from 'lucide-react';
import { useUser } from '../context/UserContext';

export const ConversationChat = ({ scenario, onComplete }) => {
  const { speakText, addXp } = useUser();
  const [currentStepId, setCurrentStepId] = useState(scenario.initialStepId);
  const [messages, setMessages] = useState([]);
  const [customInput, setCustomInput] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const chatBottomRef = useRef(null);

  // Initialize conversation with the first tutor message
  useEffect(() => {
    const initialStep = scenario.steps[scenario.initialStepId];
    if (initialStep) {
      setMessages([
        {
          id: 'msg-0',
          sender: 'bot',
          speaker: initialStep.speaker || 'AI Tutor',
          spanish: initialStep.spanish,
          english: initialStep.english,
        },
      ]);
      speakText(initialStep.spanish);
    }
  }, [scenario]);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectOption = (option) => {
    if (isFinished) return;

    // Add user message to chat
    const userMsg = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      speaker: 'You',
      spanish: option.text,
    };

    setMessages((prev) => [...prev, userMsg]);

    // Retrieve next step
    const nextStepId = option.nextStepId;
    const nextStep = scenario.steps[nextStepId];

    if (nextStep) {
      setTimeout(() => {
        const botMsg = {
          id: `msg-bot-${Date.now()}`,
          sender: 'bot',
          speaker: nextStep.speaker || 'AI Tutor',
          spanish: nextStep.spanish,
          english: nextStep.english,
        };
        setMessages((prev) => [...prev, botMsg]);
        speakText(nextStep.spanish);
        setCurrentStepId(nextStepId);

        if (nextStep.isEnd) {
          setIsFinished(true);
          addXp(30);
          if (onComplete) onComplete();
        }
      }, 600);
    }
  };

  const handleCustomSend = (e) => {
    e.preventDefault();
    if (!customInput.trim() || isFinished) return;

    const currentStep = scenario.steps[currentStepId];
    if (!currentStep || !currentStep.options) return;

    // Try to match typed text to closest option or default to first option
    const matchedOption =
      currentStep.options.find((opt) =>
        opt.text.toLowerCase().includes(customInput.trim().toLowerCase())
      ) || currentStep.options[0];

    const inputMsg = customInput;
    setCustomInput('');
    handleSelectOption({ text: inputMsg, nextStepId: matchedOption.nextStepId });
  };

  const handleRestart = () => {
    const initialStep = scenario.steps[scenario.initialStepId];
    setCurrentStepId(scenario.initialStepId);
    setIsFinished(false);
    if (initialStep) {
      setMessages([
        {
          id: 'msg-0',
          sender: 'bot',
          speaker: initialStep.speaker || 'AI Tutor',
          spanish: initialStep.spanish,
          english: initialStep.english,
        },
      ]);
      speakText(initialStep.spanish);
    }
  };

  const currentStep = scenario.steps[currentStepId];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-2xl mx-auto flex flex-col h-[600px]">
      {/* Scenario Header */}
      <div className="bg-gradient-to-r from-rose-500 to-amber-500 p-4 sm:p-6 text-white flex items-center justify-between shrink-0">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
            {scenario.level || 'Practice'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black mt-1">{scenario.title}</h2>
          <p className="text-xs text-white/90">{scenario.description}</p>
        </div>
        <button
          onClick={handleRestart}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          title="Restart Conversation"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-indigo-600 text-white shadow-xs'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[80%] rounded-2xl p-4 text-sm ${
                msg.sender === 'user'
                  ? 'bg-rose-600 text-white rounded-tr-xs shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between gap-4 mb-1">
                <span className="text-[11px] font-bold opacity-75">{msg.speaker}</span>
                {msg.sender === 'bot' && (
                  <button
                    onClick={() => speakText(msg.spanish)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="font-extrabold text-base tracking-tight">{msg.spanish}</p>
              {msg.english && (
                <p className="text-xs text-slate-500 italic mt-1 font-medium border-t border-slate-100 pt-1">
                  "{msg.english}"
                </p>
              )}
            </div>
          </div>
        ))}
        <div ref={chatBottomRef} />
      </div>

      {/* Reply Options / Input Footer */}
      <div className="p-4 bg-white border-t border-slate-200 shrink-0">
        {isFinished ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-emerald-800">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <div>
                <h4 className="font-extrabold text-sm">Conversation Completed!</h4>
                <p className="text-xs text-emerald-600 font-medium">You earned +30 XP</p>
              </div>
            </div>
            <button
              onClick={handleRestart}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors"
            >
              Practice Again
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Choose your response or type:
            </span>
            {currentStep?.options && (
              <div className="flex flex-col gap-2">
                {currentStep.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt)}
                    className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-rose-400 hover:bg-rose-50/50 font-bold text-slate-700 text-xs sm:text-sm transition-all shadow-2xs flex items-center justify-between group"
                  >
                    <span>{opt.text}</span>
                    <span className="text-xs font-bold text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      Send →
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Optional typed input */}
            <form onSubmit={handleCustomSend} className="flex gap-2 pt-1">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Or type custom response in Spanish..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:outline-hidden text-sm font-medium"
              />
              <button
                type="submit"
                disabled={!customInput.trim()}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-40 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
