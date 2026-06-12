export type KeyboardLayout = "qwerty" | "azerty" | "qwertz" | "dvorak" | "colemak";

export type ExperienceLevel = "complete-beginner" | "beginner" | "intermediate" | "advanced";

export type GoalType =
  | "learn-touch-typing"
  | "improve-speed"
  | "improve-accuracy"
  | "school-work"
  | "practice-coding"
  | "number-typing";

export interface Profile {
  id: string;
  displayName: string;
  avatarUrl?: string;
  timezone: string;
  keyboardLayout: KeyboardLayout;
  experienceLevel: ExperienceLevel;
  dailyGoalMinutes: number;
  targetWpm: number;
  targetAccuracy: number;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  order: number;
  progressPercent: number;
  isUnlocked: boolean;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  level: number;
  difficulty: "beginner" | "easy" | "medium" | "hard" | "expert";
  targetText: string;
  estimatedMinutes: number;
}

export interface TypingSessionResult {
  sessionId: string;
  sessionType: "lesson" | "test" | "practice" | "code" | "numbers" | "game";
  lessonId?: string;
  durationSeconds: number;
  grossWpm: number;
  netWpm: number;
  rawWpm: number;
  accuracy: number;
  consistency: number;
  totalCharacters: number;
  correctCharacters: number;
  incorrectCharacters: number;
  extraCharacters: number;
  missedCharacters: number;
  correctedErrors: number;
  uncorrectedErrors: number;
  backspaceCount: number;
  keyStats: KeyStatistic[];
  createdAt: string;
}

export interface KeyStatistic {
  key: string;
  attempts: number;
  correct: number;
  incorrect: number;
  accuracy: number;
}
