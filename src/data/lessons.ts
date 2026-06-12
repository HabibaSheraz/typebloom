import type { Course, Lesson } from "@/types/domain";

export const courses: Course[] = [
  {
    id: "keyboard-foundations",
    title: "Keyboard Foundations",
    description: "Posture, finger placement, home row awareness, and confident rhythm.",
    order: 1,
    progressPercent: 62,
    isUnlocked: true
  },
  {
    id: "home-row",
    title: "Home Row",
    description: "Build dependable control over A S D F and J K L ;.",
    order: 2,
    progressPercent: 28,
    isUnlocked: true
  },
  {
    id: "top-row",
    title: "Top Row",
    description: "Add Q W E R T and Y U I O P with short word patterns.",
    order: 3,
    progressPercent: 0,
    isUnlocked: true
  },
  {
    id: "code-typing",
    title: "Code Typing",
    description: "Practice punctuation, brackets, indentation, and programming snippets.",
    order: 13,
    progressPercent: 0,
    isUnlocked: true
  }
];

export const featuredLesson: Lesson = {
  id: "home-row-rhythm",
  courseId: "home-row",
  title: "Home Row Rhythm",
  level: 2,
  difficulty: "beginner",
  targetText: "sad lad fall; ask dad; jade flask; a lass adds salad; all fall as jade asks dad.",
  estimatedMinutes: 4
};

export const practiceText =
  "soft keys bloom as steady hands learn calm speed and bright accuracy.";
