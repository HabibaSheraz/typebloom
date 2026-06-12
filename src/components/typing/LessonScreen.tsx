"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { RotateCcw, Volume2 } from "lucide-react";
import { featuredLesson } from "@/data/lessons";
import { applyBackspace, applyCharacter, calculateMetrics, createSnapshot, isComplete } from "@/features/typing-engine/typingEngine";
import type { TypingSnapshot } from "@/features/typing-engine/typingEngine";
import { Button } from "@/components/common/Button";
import { LiveStats } from "@/components/typing/LiveStats";
import { TypingText } from "@/components/typing/TypingText";
import { VirtualKeyboard } from "@/components/typing/VirtualKeyboard";

export function LessonScreen() {
  const [snapshot, setSnapshot] = useState<TypingSnapshot>(() => createSnapshot(featuredLesson.targetText));
  const [now, setNow] = useState(Date.now());
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const metrics = useMemo(() => calculateMetrics(snapshot, now), [snapshot, now]);
  const complete = isComplete(snapshot.targetText, snapshot.typedText);
  const expectedCharacter = snapshot.targetText[snapshot.typedText.length];

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 300);
    return () => window.clearInterval(timer);
  }, []);

  const focusInput = () => inputRef.current?.focus();

  const restart = () => {
    setSnapshot(createSnapshot(featuredLesson.targetText));
    setPressedKey(null);
    window.setTimeout(focusInput, 0);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.metaKey || event.ctrlKey || event.altKey) {
      return;
    }

    if (event.key === "Backspace") {
      event.preventDefault();
      setSnapshot((current) => applyBackspace(current));
      setPressedKey(event.code);
      return;
    }

    if (event.key.length !== 1 || complete) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    setSnapshot((current) => applyCharacter(current, event.key, Date.now()));
    setPressedKey(event.code);
  };

  useEffect(() => {
    if (!pressedKey) {
      return;
    }

    const timeout = window.setTimeout(() => setPressedKey(null), 140);
    return () => window.clearTimeout(timeout);
  }, [pressedKey]);

  return (
    <section className="grid gap-5" onClick={focusInput}>
      <div className="panel p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-bloom-muted">{featuredLesson.courseId.replace("-", " ")} · Level {featuredLesson.level}</p>
            <h1 className="text-2xl font-bold">{featuredLesson.title}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" type="button" aria-label="Sound is muted">
              <Volume2 size={17} aria-hidden="true" />
              Muted
            </Button>
            <Button variant="secondary" type="button" onClick={restart}>
              <RotateCcw size={17} aria-hidden="true" />
              Restart
            </Button>
          </div>
        </div>
        <div className="mt-5 progress-track" aria-label="Lesson progress">
          <div className="progress-fill" style={{ width: `${Math.min(100, (snapshot.typedText.length / snapshot.targetText.length) * 100)}%` }} />
        </div>
      </div>

      <div className="lesson-layout">
        <div className="grid gap-5">
          <div className="panel p-5">
            <input
              ref={inputRef}
              className="typing-input"
              aria-label="Type the lesson text"
              autoFocus
              onKeyDown={handleKeyDown}
              onPaste={(event) => event.preventDefault()}
            />
            <TypingText targetText={snapshot.targetText} typedText={snapshot.typedText} />
            <p className="mt-4 text-sm text-bloom-muted">
              Click this panel and type. Paste is blocked, modifier-only keys are ignored, and backspace is tracked.
            </p>
          </div>
          <VirtualKeyboard expectedCharacter={expectedCharacter} pressedKey={pressedKey} />
        </div>
        <div className="grid content-start gap-5">
          <LiveStats metrics={metrics} />
          {complete ? (
            <div className="panel p-5">
              <p className="text-sm text-bloom-muted">Lesson complete</p>
              <h2 className="mt-1 text-2xl font-bold text-bloom-blush">Beautiful rhythm.</h2>
              <p className="mt-3 text-sm leading-6 text-bloom-lavender">
                You finished at {metrics.netWpm.toFixed(1)} WPM with {metrics.accuracy.toFixed(1)}% accuracy.
              </p>
              <Button className="mt-4 w-full" type="button" onClick={restart}>
                Try Again
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
