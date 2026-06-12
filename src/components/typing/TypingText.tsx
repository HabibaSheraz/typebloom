import clsx from "clsx";

interface TypingTextProps {
  targetText: string;
  typedText: string;
}

export function TypingText({ targetText, typedText }: TypingTextProps) {
  return (
    <div className="typing-text" aria-label="Typing exercise text">
      {targetText.split("").map((character, index) => {
        const typedCharacter = typedText[index];
        const state =
          typedCharacter === undefined ? (index === typedText.length ? "current" : "") : typedCharacter === character ? "correct" : "incorrect";
        return (
          <span key={`${character}-${index}`} className={clsx("char", state)} aria-current={state === "current" ? "true" : undefined}>
            {character}
          </span>
        );
      })}
      {typedText.length > targetText.length
        ? typedText
            .slice(targetText.length)
            .split("")
            .map((character, index) => (
              <span key={`extra-${character}-${index}`} className="char incorrect">
                {character}
              </span>
            ))
        : null}
    </div>
  );
}
