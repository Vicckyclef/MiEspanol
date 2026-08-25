# ¡Vámonos! - Modern Spanish Learning Web Application

**“Learn Spanish, One Conversation at a Time.”**

¡Vámonos! is a modern, highly interactive, and responsive web application designed for beginner and intermediate Spanish learners. Learning Spanish feels fun, engaging, and game-like through interactive flashcards, dynamic quizzes, Text-to-Speech audio pronunciation, simulated AI tutor dialogues, streak tracking, XP points, level progression, and achievement badges.

---

## 🚀 Getting Started

Follow these steps to run the application locally on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your system.

### 1. Install Dependencies

Open your terminal in the root directory of the project and run:

```bash
npm install
```

### 2. Run the Development Server

Start the Vite development server with hot module replacement (HMR):

```bash
npm run dev
```

Once started, open your browser and navigate to the local URL displayed in your terminal (typically `http://localhost:5173`).

---

## 🛠️ Build & Production Commands

- **Build for production:**
  ```bash
  npm run build
  ```
- **Preview production build locally:**
  ```bash
  npm run preview
  ```

---

## ✨ Core Features & Pages

- 🌟 **Landing Page:** Hero banner with slogan, feature highlights, interactive quick demo preview, and call-to-action buttons.
- 📊 **User Dashboard:** Tracks daily streaks, XP points, completed lessons, level rank, daily learning goals progress bar, and recommended next lessons.
- 📚 **8 Learning Categories:** Includes *Greetings & Introductions*, *Numbers & Time*, *Food & Drinks*, *Travel*, *Family & Friends*, *Daily Conversations*, *Grammar Basics*, and *Spanish Vocabulary*.
- 🃏 **3D Flashcards & Vocabulary Cards:** Interactive flip card animations with Browser Text-to-Speech (TTS) pronunciation audio and translation reveal buttons.
- ❓ **Interactive Quizzes:** Multiple-choice and fill-in-the-blank questions with instant feedback, explanations, and celebration confetti.
- 🗣️ **Pronunciation & Speech Practice:** Speech synthesis audio playback and browser Web Speech Recognition for live voice practice.
- 💬 **Simulated AI Conversations:** Interactive scenario-based dialogues (e.g., meeting a friend, ordering food at a café, asking for directions) with structured options or custom typed input.
- 🏆 **Gamification & Badges:** Unlocking trophies (e.g., 3-Day Streak, First 5 Words, Conversation Starter, Quiz Master, Rising Star) with progress saved automatically via `localStorage`.

---

## 💻 Tech Stack

- **Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router DOM v7
- **Icons:** Lucide React
- **Celebration Effects:** Canvas Confetti
