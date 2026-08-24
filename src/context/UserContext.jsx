import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadUserData, saveUserData, resetUserData as resetStorage } from '../utils/storage';
import { BADGES } from '../data/spanishData';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState(loadUserData);

  useEffect(() => {
    saveUserData(userState);
  }, [userState]);

  // Calculate Level based on XP (e.g. 100 XP per level)
  const level = Math.floor(userState.xp / 100) + 1;
  const currentLevelXp = userState.xp % 100;
  const xpForNextLevel = 100;

  const addXp = (amount) => {
    setUserState((prev) => {
      const today = new Date().toISOString().split('T')[0];
      const newXp = prev.xp + amount;
      const newTodayXp = (prev.lastActiveDate === today ? prev.todayXp : 0) + amount;
      let newStreak = prev.streak;

      // Increment streak if not active today yet
      if (prev.lastActiveDate !== today || prev.streak === 0) {
        newStreak = (prev.streak || 0) + 1;
      }

      const updated = {
        ...prev,
        xp: newXp,
        todayXp: newTodayXp,
        streak: newStreak,
        lastActiveDate: today,
      };

      // Check badges trigger
      return checkBadges(updated);
    });
  };

  const completeLesson = (lessonId, quizScore = 100, vocabIds = []) => {
    setUserState((prev) => {
      const completedLessons = prev.completedLessons.includes(lessonId)
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId];

      const learnedVocabIds = Array.from(new Set([...prev.learnedVocabIds, ...vocabIds]));

      const quizScores = {
        ...prev.quizScores,
        [lessonId]: Math.max(prev.quizScores[lessonId] || 0, quizScore),
      };

      const updated = {
        ...prev,
        completedLessons,
        learnedVocabIds,
        quizScores,
      };

      return checkBadges(updated);
    });

    addXp(50); // Standard lesson reward
  };

  const markVocabLearned = (vocabId) => {
    setUserState((prev) => {
      if (prev.learnedVocabIds.includes(vocabId)) return prev;
      const updated = {
        ...prev,
        learnedVocabIds: [...prev.learnedVocabIds, vocabId],
      };
      return checkBadges(updated);
    });
  };

  const checkBadges = (state) => {
    const unlocked = [...state.unlockedBadges];
    const dates = { ...state.badgeUnlockDates };
    const today = new Date().toISOString().split('T')[0];

    BADGES.forEach((badge) => {
      if (!unlocked.includes(badge.id)) {
        if (badge.condition(state)) {
          unlocked.push(badge.id);
          dates[badge.id] = today;
        }
      }
    });

    return {
      ...state,
      unlockedBadges: unlocked,
      badgeUnlockDates: dates,
    };
  };

  const updateSettings = (newSettings) => {
    setUserState((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings },
    }));
  };

  const updateDailyGoal = (goalXp) => {
    setUserState((prev) => ({
      ...prev,
      dailyGoalXp: goalXp,
    }));
  };

  const resetProgress = () => {
    const fresh = resetStorage();
    setUserState(fresh);
  };

  const speakText = (text, lang = 'es-ES') => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel(); // Stop current speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = userState.settings?.ttsSpeed || 1;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <UserContext.Provider
      value={{
        user: userState,
        level,
        currentLevelXp,
        xpForNextLevel,
        addXp,
        completeLesson,
        markVocabLearned,
        updateSettings,
        updateDailyGoal,
        resetProgress,
        speakText,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
