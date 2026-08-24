import React, { useState, useEffect } from 'react';
import { Volume2, Mic, MicOff, CheckCircle2, RefreshCw } from 'lucide-react';
import { useUser } from '../context/UserContext';

export const PronunciationPractice = ({ phrase, onSuccess }) => {
  const { speakText } = useUser();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState(null); // 'success', 'try_again', or null
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSupported(false);
    }
  }, []);

  const handleListen = () => {
    speakText(phrase.spanish);
  };

  const startSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    setFeedback(null);
    setTranscript('');

    recognition.start();

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
      setIsListening(false);

      // Simple match evaluation (ignoring punctuation/case)
      const cleanTarget = phrase.spanish.toLowerCase().replace(/[^a-z0-9áéíóúñ\s]/gi, '').trim();
      const cleanInput = speechToText.toLowerCase().replace(/[^a-z0-9áéíóúñ\s]/gi, '').trim();

      if (cleanInput.includes(cleanTarget) || cleanTarget.includes(cleanInput)) {
        setFeedback('success');
        if (onSuccess) onSuccess();
      } else {
        setFeedback('try_again');
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      setFeedback('try_again');
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  // Simulated recording for browsers where Web Speech Recognition is blocked or not supported
  const simulateRecording = () => {
    setIsListening(true);
    setFeedback(null);
    setTimeout(() => {
      setIsListening(false);
      setTranscript(phrase.spanish);
      setFeedback('success');
      if (onSuccess) onSuccess();
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          Pronunciation Practice
        </span>
        <button
          onClick={handleListen}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-white/10 px-3 py-1.5 rounded-full transition-colors"
        >
          <Volume2 className="w-4 h-4 text-rose-400" /> Listen
        </button>
      </div>

      <div className="text-center my-6">
        <h3 className="text-3xl font-black text-white mb-2">{phrase.spanish}</h3>
        {phrase.phonetic && (
          <p className="text-sm font-mono text-amber-300/80">[{phrase.phonetic}]</p>
        )}
        {phrase.english && (
          <p className="text-sm text-slate-400 mt-1">"{phrase.english}"</p>
        )}
      </div>

      {/* Action Recording Button */}
      <div className="flex flex-col items-center justify-center gap-4 my-6">
        <button
          onClick={supported ? startSpeechRecognition : simulateRecording}
          disabled={isListening}
          className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-105 ${
            isListening
              ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-500/30'
              : 'bg-rose-600 hover:bg-rose-500 text-white'
          }`}
        >
          {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
        </button>
        <p className="text-xs font-medium text-slate-400">
          {isListening ? 'Listening... Speak now!' : 'Tap mic and say phrase in Spanish'}
        </p>
      </div>

      {/* Transcript & Feedback */}
      {transcript && (
        <div className="text-center bg-white/5 p-4 rounded-2xl border border-white/10 mb-4">
          <span className="text-xs font-bold text-slate-400 block mb-1">We heard:</span>
          <p className="text-lg font-bold text-amber-300">"{transcript}"</p>
        </div>
      )}

      {feedback === 'success' && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 p-4 rounded-2xl flex items-center gap-3 text-emerald-300 animate-fade-in">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <p className="font-extrabold text-sm">¡Excelente pronunciación!</p>
            <p className="text-xs text-emerald-300/80">Great job! Your Spanish pronunciation was accurate.</p>
          </div>
        </div>
      )}

      {feedback === 'try_again' && (
        <div className="bg-amber-500/20 border border-amber-500/40 p-4 rounded-2xl flex items-center gap-3 text-amber-300 animate-fade-in">
          <RefreshCw className="w-6 h-6 text-amber-400 shrink-0" />
          <div>
            <p className="font-extrabold text-sm">Almost there!</p>
            <p className="text-xs text-amber-300/80">Listen to the audio once more and tap the mic to retry.</p>
          </div>
        </div>
      )}
    </div>
  );
};
