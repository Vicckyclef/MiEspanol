const STORAGE_KEY = 'vamonos_spanish_user_data_v1';

const DEFAULT_STATE = {
  name: 'Learner',
  xp: 120,
  streak: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  dailyGoalXp: 50,
  todayXp: 20,
  completedLessons: ['greetings-1', 'numbers-1'],
  learnedVocabIds: ['vocab-1', 'vocab-2', 'vocab-3', 'vocab-4', 'vocab-5'],
  quizScores: {
    'greetings-1': 100,
    'numbers-1': 80,
  },
  unlockedBadges: ['badge-streak-3', 'badge-first-word'],
  badgeUnlockDates: {
    'badge-streak-3': new Date().toISOString().split('T')[0],
    'badge-first-word': new Date().toISOString().split('T')[0],
  },
  settings: {
    ttsSpeed: 1,
    autoPlayAudio: true,
    soundEffects: true,
  }
};

export const loadUserData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return DEFAULT_STATE;
    const parsed = JSON.parse(data);

    // Check streak reset or update logic
    const today = new Date().toISOString().split('T')[0];
    const lastActive = parsed.lastActiveDate;

    if (lastActive) {
      const lastDate = new Date(lastActive);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 1) {
        // Streak broken if missed more than a day
        parsed.streak = 0;
      }
    }

    // Reset daily XP if today is a new day
    if (parsed.lastActiveDate !== today) {
      parsed.todayXp = 0;
      parsed.lastActiveDate = today;
    }

    return { ...DEFAULT_STATE, ...parsed };
  } catch (error) {
    console.error('Failed to load user data from localStorage', error);
    return DEFAULT_STATE;
  }
};

export const saveUserData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save user data to localStorage', error);
  }
};

export const resetUserData = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
    return DEFAULT_STATE;
  } catch (error) {
    console.error('Failed to reset user data', error);
    return DEFAULT_STATE;
  }
};
