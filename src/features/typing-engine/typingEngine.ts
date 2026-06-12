export interface TypingSnapshot {
  targetText: string;
  typedText: string;
  startedAt: number | null;
  endedAt: number | null;
  backspaceCount: number;
  correctedErrors: number;
}

export interface TypingMetrics {
  grossWpm: number;
  netWpm: number;
  rawWpm: number;
  accuracy: number;
  errors: number;
  correctCharacters: number;
  incorrectCharacters: number;
  extraCharacters: number;
  missedCharacters: number;
  backspaceCount: number;
  correctedErrors: number;
  uncorrectedErrors: number;
  charactersPerMinute: number;
  wordsCompleted: number;
  elapsedSeconds: number;
  consistency: number;
  longestCorrectStreak: number;
}

export const createSnapshot = (targetText: string): TypingSnapshot => ({
  targetText,
  typedText: "",
  startedAt: null,
  endedAt: null,
  backspaceCount: 0,
  correctedErrors: 0
});

export const applyCharacter = (
  snapshot: TypingSnapshot,
  character: string,
  timestamp: number
): TypingSnapshot => ({
  ...snapshot,
  typedText: `${snapshot.typedText}${character}`,
  startedAt: snapshot.startedAt ?? timestamp,
  endedAt: isComplete(snapshot.targetText, `${snapshot.typedText}${character}`) ? timestamp : null
});

export const applyBackspace = (snapshot: TypingSnapshot): TypingSnapshot => {
  if (snapshot.typedText.length === 0) {
    return snapshot;
  }

  const removedIndex = snapshot.typedText.length - 1;
  const removedCharacter = snapshot.typedText[removedIndex];
  const expectedCharacter = snapshot.targetText[removedIndex];
  const correctedErrors = removedCharacter !== expectedCharacter ? snapshot.correctedErrors + 1 : snapshot.correctedErrors;

  return {
    ...snapshot,
    typedText: snapshot.typedText.slice(0, -1),
    backspaceCount: snapshot.backspaceCount + 1,
    correctedErrors,
    endedAt: null
  };
};

export const isComplete = (targetText: string, typedText: string): boolean => typedText.length >= targetText.length;

export const calculateMetrics = (snapshot: TypingSnapshot, now: number): TypingMetrics => {
  const elapsedMs = Math.max(1000, (snapshot.endedAt ?? now) - (snapshot.startedAt ?? now - 1000));
  const elapsedMinutes = elapsedMs / 60000;
  const typedCharacters = snapshot.typedText.length;
  const comparison = compareText(snapshot.targetText, snapshot.typedText);
  const grossWpm = typedCharacters / 5 / elapsedMinutes;
  const errorPenalty = comparison.incorrectCharacters / elapsedMinutes / 5;
  const netWpm = Math.max(0, grossWpm - errorPenalty);
  const accuracy = typedCharacters === 0 ? 100 : (comparison.correctCharacters / typedCharacters) * 100;

  return {
    grossWpm: roundOne(grossWpm),
    netWpm: roundOne(netWpm),
    rawWpm: roundOne(grossWpm),
    accuracy: roundOne(accuracy),
    errors: comparison.incorrectCharacters + comparison.extraCharacters,
    correctCharacters: comparison.correctCharacters,
    incorrectCharacters: comparison.incorrectCharacters,
    extraCharacters: comparison.extraCharacters,
    missedCharacters: comparison.missedCharacters,
    backspaceCount: snapshot.backspaceCount,
    correctedErrors: snapshot.correctedErrors,
    uncorrectedErrors: comparison.incorrectCharacters,
    charactersPerMinute: roundOne(typedCharacters / elapsedMinutes),
    wordsCompleted: Math.floor(comparison.correctCharacters / 5),
    elapsedSeconds: roundOne(elapsedMs / 1000),
    consistency: calculateConsistency(snapshot.targetText, snapshot.typedText),
    longestCorrectStreak: comparison.longestCorrectStreak
  };
};

const compareText = (targetText: string, typedText: string) => {
  let correctCharacters = 0;
  let incorrectCharacters = 0;
  let longestCorrectStreak = 0;
  let currentCorrectStreak = 0;
  const sharedLength = Math.min(targetText.length, typedText.length);

  for (let index = 0; index < sharedLength; index += 1) {
    if (targetText[index] === typedText[index]) {
      correctCharacters += 1;
      currentCorrectStreak += 1;
      longestCorrectStreak = Math.max(longestCorrectStreak, currentCorrectStreak);
    } else {
      incorrectCharacters += 1;
      currentCorrectStreak = 0;
    }
  }

  return {
    correctCharacters,
    incorrectCharacters,
    extraCharacters: Math.max(0, typedText.length - targetText.length),
    missedCharacters: Math.max(0, targetText.length - typedText.length),
    longestCorrectStreak
  };
};

const calculateConsistency = (targetText: string, typedText: string): number => {
  if (typedText.length < 2) {
    return 100;
  }

  const chunks = typedText.match(/.{1,10}/g) ?? [];
  const chunkScores = chunks.map((chunk, chunkIndex) => {
    const offset = chunkIndex * 10;
    const correct = chunk.split("").filter((character, index) => targetText[offset + index] === character).length;
    return correct / chunk.length;
  });
  const average = chunkScores.reduce((sum, score) => sum + score, 0) / chunkScores.length;
  const variance = chunkScores.reduce((sum, score) => sum + Math.abs(score - average), 0) / chunkScores.length;

  return roundOne(Math.max(0, 100 - variance * 100));
};

const roundOne = (value: number): number => Math.round(value * 10) / 10;
