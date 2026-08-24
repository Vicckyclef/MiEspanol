import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Settings, Volume2, Flame, RotateCcw, CheckCircle2, AlertTriangle } from 'lucide-react';

export const SettingsPage = () => {
  const { user, updateSettings, updateDailyGoal, resetProgress } = useUser();
  const [dailyGoalInput, setDailyGoalInput] = useState(user.dailyGoalXp || 50);
  const [ttsSpeed, setTtsSpeed] = useState(user.settings?.ttsSpeed || 1);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateDailyGoal(Number(dailyGoalInput));
    updateSettings({ ttsSpeed: Number(ttsSpeed) });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    resetProgress();
    setConfirmReset(false);
    alert('Your learning progress has been reset to defaults.');
  };

  return (
    <div className="space-y-8 pb-12 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider mb-2">
          <Settings className="w-3.5 h-3.5 text-slate-500" /> Customization
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Account & Audio Settings
        </h1>
        <p className="text-slate-600 font-medium text-sm sm:text-base">
          Adjust your daily learning goals, speech rate, and account data.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Daily XP Goal */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold">
              <Flame className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-lg">Daily XP Goal</h3>
              <p className="text-xs text-slate-500">Set how many points you want to earn per day</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 pt-2">
            {[
              { label: 'Casual', xp: 30, desc: '5 mins / day' },
              { label: 'Regular', xp: 50, desc: '10 mins / day' },
              { label: 'Intense', xp: 100, desc: '20 mins / day' },
            ].map((goal) => (
              <button
                type="button"
                key={goal.xp}
                onClick={() => setDailyGoalInput(goal.xp)}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  Number(dailyGoalInput) === goal.xp
                    ? 'border-rose-500 bg-rose-50/50 text-rose-700 font-bold'
                    : 'border-slate-200 bg-white text-slate-700 font-medium hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">{goal.label}</span>
                  <span className="text-xs font-bold text-amber-600">{goal.xp} XP</span>
                </div>
                <span className="text-xs opacity-75">{goal.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Text-to-Speech Speed */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-lg">Pronunciation Speed</h3>
              <p className="text-xs text-slate-500">Adjust Text-to-Speech audio playback speed</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { label: 'Slow (0.75x)', speed: 0.75 },
              { label: 'Normal (1.0x)', speed: 1.0 },
              { label: 'Fast (1.25x)', speed: 1.25 },
            ].map((speedOpt) => (
              <button
                type="button"
                key={speedOpt.speed}
                onClick={() => setTtsSpeed(speedOpt.speed)}
                className={`p-3.5 rounded-2xl border-2 text-center text-xs sm:text-sm font-bold transition-all ${
                  Number(ttsSpeed) === speedOpt.speed
                    ? 'border-rose-500 bg-rose-50/50 text-rose-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                {speedOpt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Save Banner */}
        {savedSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center gap-3 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Settings saved successfully!
          </div>
        )}

        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-base shadow-md transition-all"
        >
          Save Changes
        </button>
      </form>

      {/* Danger Zone: Reset Data */}
      <div className="bg-red-50/50 rounded-3xl border border-red-200 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3 text-red-700">
          <AlertTriangle className="w-6 h-6" />
          <h3 className="font-extrabold text-lg">Reset Learning Progress</h3>
        </div>
        <p className="text-xs text-red-600 font-medium">
          Warning: Resetting will clear all your earned XP, streak, completed lessons, and unlocked badges.
        </p>

        {confirmReset ? (
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleReset}
              className="py-2.5 px-5 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-colors"
            >
              Yes, Reset Everything
            </button>
            <button
              onClick={() => setConfirmReset(false)}
              className="py-2.5 px-5 rounded-xl border border-slate-300 bg-white font-bold text-xs text-slate-700"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmReset(true)}
            className="py-2.5 px-5 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 font-extrabold text-xs transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Reset Progress Data
          </button>
        )}
      </div>
    </div>
  );
};
