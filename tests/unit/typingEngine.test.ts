import { describe, expect, it } from "vitest";
import { applyBackspace, applyCharacter, calculateMetrics, createSnapshot } from "@/features/typing-engine/typingEngine";

describe("typingEngine", () => {
  it("calculates perfect accuracy and WPM for correct text", () => {
    let snapshot = createSnapshot("hello");
    snapshot = applyCharacter(snapshot, "h", 0);
    snapshot = applyCharacter(snapshot, "e", 1000);
    snapshot = applyCharacter(snapshot, "l", 2000);
    snapshot = applyCharacter(snapshot, "l", 3000);
    snapshot = applyCharacter(snapshot, "o", 60000);

    const metrics = calculateMetrics(snapshot, 60000);

    expect(metrics.accuracy).toBe(100);
    expect(metrics.correctCharacters).toBe(5);
    expect(metrics.netWpm).toBe(1);
  });

  it("tracks incorrect characters", () => {
    let snapshot = createSnapshot("home");
    snapshot = applyCharacter(snapshot, "h", 0);
    snapshot = applyCharacter(snapshot, "x", 1000);

    const metrics = calculateMetrics(snapshot, 2000);

    expect(metrics.correctCharacters).toBe(1);
    expect(metrics.incorrectCharacters).toBe(1);
    expect(metrics.errors).toBe(1);
    expect(metrics.accuracy).toBe(50);
  });

  it("tracks corrected errors with backspace", () => {
    let snapshot = createSnapshot("as");
    snapshot = applyCharacter(snapshot, "a", 0);
    snapshot = applyCharacter(snapshot, "d", 1000);
    snapshot = applyBackspace(snapshot);
    snapshot = applyCharacter(snapshot, "s", 2000);

    const metrics = calculateMetrics(snapshot, 3000);

    expect(metrics.correctedErrors).toBe(1);
    expect(metrics.backspaceCount).toBe(1);
    expect(metrics.accuracy).toBe(100);
  });

  it("counts extra characters", () => {
    let snapshot = createSnapshot("go");
    snapshot = applyCharacter(snapshot, "g", 0);
    snapshot = applyCharacter(snapshot, "o", 1000);
    snapshot = applyCharacter(snapshot, "!", 2000);

    const metrics = calculateMetrics(snapshot, 3000);

    expect(metrics.extraCharacters).toBe(1);
    expect(metrics.errors).toBe(1);
  });
});
