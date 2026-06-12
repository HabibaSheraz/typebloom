import { qwertyRows } from "@/data/keyboard";
import clsx from "clsx";

interface VirtualKeyboardProps {
  expectedCharacter: string | undefined;
  pressedKey: string | null;
}

const characterToCode = (character: string | undefined): string | null => {
  if (!character) {
    return null;
  }

  if (character === " ") {
    return "Space";
  }

  const upper = character.toUpperCase();
  const key = qwertyRows.flat().find((definition) => definition.label === upper || definition.label === character);
  return key?.code ?? null;
};

export function VirtualKeyboard({ expectedCharacter, pressedKey }: VirtualKeyboardProps) {
  const expectedCode = characterToCode(expectedCharacter);

  return (
    <div className="panel keyboard" aria-label="Virtual keyboard">
      {qwertyRows.map((row, rowIndex) => (
        <div className="key-row" key={rowIndex}>
          {row.map((key) => (
            <span
              key={key.code}
              className={clsx("key", expectedCode === key.code && "expected", pressedKey === key.code && "pressed")}
              style={{ minWidth: `${(key.width ?? 1) * 42}px` }}
              title={key.finger}
            >
              {key.label}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
